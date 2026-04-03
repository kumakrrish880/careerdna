import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerDNA — Discover Your Career Blueprint',
  description: 'AI-powered career guidance platform with real-time job data, mentor matching, and interactive career simulations.',
  keywords: 'career guidance, AI career, career assessment, job recommendations, career mentorship',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen mesh-gradient antialiased">
          <div className="noise-overlay" />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                fontFamily: 'DM Sans, sans-serif',
              },
              success: { iconTheme: { primary: '#00d2ff', secondary: '#0f172a' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#0f172a' } },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
