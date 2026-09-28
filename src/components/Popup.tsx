import type { DeletePopupProps } from "../Types";


const DeletePopup = ({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onClose,
  onConfirm,
}: DeletePopupProps) => {
  if (!open) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-800/20 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">

        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-8.82 15a2 2 0 001.72 3h17.62a2 2 0 001.72-3l-8.82-15a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;