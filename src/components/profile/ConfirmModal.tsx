'use client';

export function ConfirmModal({
  onConfirm,
  onCancel,
  loading = false,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="text-lg font-semibold">Delete Account</h2>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete your account?
          </p>
        </div>
        <div className="flex w-full space-x-4">
          <button
            className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <button
            className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
