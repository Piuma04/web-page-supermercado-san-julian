
'use client'

import { useEffect } from "react";



export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error("Ocurrió un error! :", error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center bg-white">
      <h2 className="text-center text-2xl font-bold text-red-600">
        Ocurrió un error! : {error?.message || "Error desconocido"}
      </h2>
      <button
        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-500 shadow"
        onClick={() => reset()}
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
