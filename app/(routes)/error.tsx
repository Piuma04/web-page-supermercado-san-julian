'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Ocurrió un error! :", error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center bg-white">
      <h2
        className="text-center text-2xl font-bold text-red-600"
        role="alert"
      >
        Ocurrió un error! : {error?.message || "Error desconocido"}
      </h2>
      {error?.digest && (
        <p className="mt-2 text-xs text-gray-500">Código de error: {error.digest}</p>
      )}
      <div className="mt-4 flex gap-2">
        <button
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-500 shadow"
          onClick={reset}
        >
          Reintentar
        </button>
        <button
          className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-300 shadow"
          onClick={() => router.push("/")}
        >
          Ir al inicio
        </button>
      </div>
    </main>
  );
}
