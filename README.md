# CareerDNA 🧬

> 🚀 **Live Demo:** [careerdna1.netlify.app](https://careerdna1.netlify.app)  
> *Production build — all features are live and testable*



TECH STACK....

## 🛠️ Tech Stack

### Frontend Stack

| Technology | Explanation |
|------------|-------------|
| Next.js 14 (App Router) | React framework with SSR, routing, optimizations |
| Tailwind CSS | Utility-first CSS framework |
| Framer Motion | Animation library for React |
| Three.js + react-three/fiber | 3D graphics with React |
| React Hot Toast | Toast notifications |
| Clerk | Authentication system |

### Backend Stack

| Technology | Explanation |
|------------|-------------|
| Next.js API Routes | Backend endpoints within App Router |
| BullMQ | Job queue system |
| Upstash Redis | Caching & queue DB |
| Node.js Runtime | Server-side execution |

### Database & AI Stack

| Technology | Explanation |
|------------|-------------|
| PostgreSQL + Prisma | Database with ORM |
| Pinecone | Vector database for career matching |
| OpenAI GPT-4o | AI recommendations & simulations |


## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/student
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/student

# Supabase Database
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-0.ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.xxxxx:password@aws-0.ap-southeast-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx

# Pinecone Vector Database
PINECONE_API_KEY=pcsk_xxxxx
PINECONE_ENVIRONMENT=gcp-starter
PINECONE_INDEX=careerdna

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxx

# Upstash Redis
REDIS_URL=https://xxxxx.upstash.io
REDIS_TOKEN=xxxxx

# Razorpay (Payment - Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx










