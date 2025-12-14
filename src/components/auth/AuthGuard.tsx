"use client";

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className='text-muted-foreground'>Authenticating...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
