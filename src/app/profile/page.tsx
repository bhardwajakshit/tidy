'use client';

import { Header } from '@/components/common/Header';
import { useSupabase } from '@/utils/providers/auth-provider';
import Image from 'next/image';

export default function Profile() {
  const { user } = useSupabase();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between">
      <Header />

      <div>
        <div className="mb-6 flex justify-center">
          <Image
            src={user?.image || ''}
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-200"
          />
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-medium text-gray-800">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div></div>
    </div>
  );
}
