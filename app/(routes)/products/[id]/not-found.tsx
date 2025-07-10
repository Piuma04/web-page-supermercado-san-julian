


import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-red-700 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertTriangle className="w-16 h-16 text-red-600" />
        <h1 className="text-4xl font-bold">¡Producto no encontrado!</h1>
        <p className="text-lg max-w-md">
          Lo siento, esta producto no se encuentra disponible
        </p>
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
