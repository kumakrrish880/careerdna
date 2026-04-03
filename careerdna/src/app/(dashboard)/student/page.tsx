import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';

export default async function StudentPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  return <StudentDashboard userName={user.firstName || 'Student'} />;
}
