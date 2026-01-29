"use client";
import { useEffect } from "react";
import { THEME_COLOR, Icon } from "@/components/Shared";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-500">
      <div className="bg-red-50 p-6 rounded-full mb-4 text-red-500">
        <Icon name="error_outline" size={48} />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">System Error</h2>
      <p className="text-sm mb-6 max-w-xs text-center text-slate-400">
        An unexpected error occurred. The system has logged this event.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 rounded-lg text-white font-bold text-sm transition-opacity hover:opacity-90 shadow-sm"
        style={{ backgroundColor: THEME_COLOR }}
      >
        Reload Module
      </button>
    </div>
  );
}