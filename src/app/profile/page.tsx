'use client';

import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { useSupabase } from '@/utils/providers/auth-provider';
import Image from 'next/image';
import axios from 'axios';
import { ConfirmModal } from '@/components/profile/ConfirmModal';

export default function Profile() {
  const { user, signOut } = useSupabase();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await axios.delete('/api/user');
      signOut();
    } catch (error) {
      setIsDeleting(false);
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between">
      <Header />

      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex justify-center">
          <Image
            src={user?.image || ''}
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-200"
          />
        </div>

        <div className="flex flex-col space-y-3 text-center">
          <h1 className="text-2xl font-medium text-gray-800">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <div>
          <button
            className="rounded-lg bg-red-500 px-6 py-2 text-sm font-normal text-white transition-colors duration-300 hover:bg-red-600"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      <div></div>

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
          loading={isDeleting}
        />
      )}
    </div>
  );
}
