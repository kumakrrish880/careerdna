import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
