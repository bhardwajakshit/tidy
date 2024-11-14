'use client';

import { AnimatePresence } from 'framer-motion';
import { QueryProvider } from '@/utils/providers/query-provider';
import { SupabaseProvider } from '@/utils/providers/auth-provider';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AnimatePresence>
          <QueryProvider>
            <SupabaseProvider>{children}</SupabaseProvider>
          </QueryProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
