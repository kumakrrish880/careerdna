import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";

interface ClerkUserEvent {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string; id: string }[];
    first_name?: string;
    last_name?: string;
    image_url?: string;
    created_at: number;
    updated_at: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    // Verify Svix signature
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
    }

    const payload = await req.text();
    const wh = new Webhook(webhookSecret);
    let event: ClerkUserEvent;

    try {
      event = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as ClerkUserEvent;
    } catch {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const { type, data } = event;
    const email = data.email_addresses[0]?.email_address;
    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

    switch (type) {
      case "user.created": {
        // Create user in Prisma
        const user = await prisma.user.upsert({
          where: { clerkId: data.id },
          create: {
            clerkId: data.id,
            email: email!,
            name,
            role: "STUDENT",
          },
          update: { email: email!, name },
        });

        // Create student record automatically
        await prisma.student.upsert({
          where: { userId: user.id },
          create: { userId: user.id },
          update: {},
        });

        // Sync to Supabase
        await supabaseAdmin.from("users").upsert({
          id: user.id,
          clerk_id: data.id,
          email,
          name,
          role: "STUDENT",
          created_at: new Date(data.created_at).toISOString(),
        });

        console.log(`User created: ${email}`);
        break;
      }

      case "user.updated": {
        await prisma.user.updateMany({
          where: { clerkId: data.id },
          data: { email: email!, name },
        });

        await supabaseAdmin
          .from("users")
          .update({ email, name, updated_at: new Date().toISOString() })
          .eq("clerk_id", data.id);

        console.log(`User updated: ${email}`);
        break;
      }

      case "user.deleted": {
        const user = await prisma.user.findUnique({ where: { clerkId: data.id } });
        if (user) {
          // Soft delete — mark inactive rather than hard delete
          await supabaseAdmin
            .from("users")
            .update({ deleted_at: new Date().toISOString() })
            .eq("clerk_id", data.id);
        }
        console.log(`User deleted: ${data.id}`);
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${type}`);
    }

    return NextResponse.json({ received: true, type });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed", details: String(error) },
      { status: 500 }
    );
  }
}
