'use client';

interface DeleteButtonProps {
  id: number;
  onDelete: (id: number) => Promise<void>;
}

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  return (
    <button
      onClick={async () => {
        if (confirm('Are you sure you want to delete this unit?')) {
          try {
            await onDelete(id);
          } catch (err) {
            alert("Failed to delete. It might be linked to a Medical Test!");
          }
        }
      }}
      className="text-red-600 hover:text-red-900 font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
    >
      Delete
    </button>
  );
}