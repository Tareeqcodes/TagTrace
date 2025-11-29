'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/config/appwrite';
import { useAuth } from '@/context/Authcontext';

export default function Confirm() {
  const router = useRouter();
  const { checkSession } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (processed.current) return;

    const verifySession = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const secret = urlParams.get('secret');

      

      if (!userId || !secret) {
        console.warn('Missing credentials from URL');
        router.push('/login');
        return;
      }

      try {
        processed.current = true;
        let sessionExists = false;

        // Check if session already exists
        try {
          const currentSession = await account.getSession('current');
          if (currentSession) {
            sessionExists = true;
            console.log('Session already exists');
          }
        } catch (e) {
          console.log('No active session found');
        }

        // Create session only if it doesn't exist
        if (!sessionExists) {
          const session = await account.updateMagicURLSession(userId, secret);
          console.log('Session created:', session);
        }

        await checkSession();
        router.push('/dashboard');
      } catch (error) {
        console.error('Verification failed:', error.message);
        processed.current = false; 
        router.push('/login');
      }
    };

    verifySession();
  }, [router, checkSession]);

  return (
    <div className='h-screen text-sm text-green-400 p-20 text-center items-center justify-center'>
      Verifying please wait...
    </div>
  );
}