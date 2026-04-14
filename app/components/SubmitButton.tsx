'use client';

export default function SubmitButton({ label }: { label: string }) {
  return (
    <button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-bold transition-colors"
    >
      {label}
    </button>
  );
}