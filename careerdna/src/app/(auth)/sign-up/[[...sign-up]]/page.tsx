import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl',
          headerTitle: 'text-white font-display font-bold text-2xl',
          headerSubtitle: 'text-white/50',
          socialButtonsBlockButton: 'border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all',
          dividerLine: 'bg-white/10',
          dividerText: 'text-white/30',
          formFieldLabel: 'text-white/70',
          formFieldInput: 'bg-white/5 border-white/10 text-white focus:border-cyan-500/50',
          formButtonPrimary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-display',
          footerActionLink: 'text-cyan-400 hover:text-cyan-300',
        },
      }}
    />
  );
}
