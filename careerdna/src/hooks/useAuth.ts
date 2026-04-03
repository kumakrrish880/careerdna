import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const role = (user?.publicMetadata?.role as string) || 'student';

  return {
    user,
    isLoaded,
    isSignedIn,
    role,
    signOut: handleSignOut,
    displayName: user?.fullName || user?.firstName || 'Student',
    email: user?.primaryEmailAddress?.emailAddress || '',
    avatar: user?.imageUrl || '',
  };
}
