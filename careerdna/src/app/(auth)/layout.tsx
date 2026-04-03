export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[100px]" />
        <div className="w-[300px] h-[300px] rounded-full bg-violet-500/8 blur-[80px] translate-x-40 -translate-y-20" />
      </div>
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="font-display font-bold text-2xl">Career<span className="text-gradient">DNA</span></span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
