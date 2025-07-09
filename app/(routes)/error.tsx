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
    <main className="flex h-full flex-col items-center justify-center bg-white mb-5">
      <h2
        className="text-center text-2xl font-bold text-red-600"
        role="alert"
      >
        Ups! Ocurrió un error 
      </h2>
      {/* Friendly info message for customers */}
      <div className="mt-4 max-w-md text-center text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm">
        <p className="mb-2 font-semibold text-yellow-800">
          ¡Lo sentimos! Algo no salió como esperábamos.
        </p>
        <p>
          Si el error persiste, te recomendamos volver al inicio o intentar nuevamente en unos minutos.
        </p>
        <p className="mt-2">
          ¿Necesitás ayuda? Podés contactarnos por Instagram en{" "}
          <a
            href="https://www.instagram.com/sanjuliansupermercado/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-red-700 underline"
          >
            @sanjuliansupermercado
          </a>{" "}
          o acercarte a nuestro local.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          ¡Gracias por tu paciencia y por confiar en nosotros!
        </p>
      </div>
      
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
