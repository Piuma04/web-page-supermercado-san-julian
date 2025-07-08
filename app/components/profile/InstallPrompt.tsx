"use client";
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
 
  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )
 
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [])
  
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Mostrar el prompt de instalación
    deferredPrompt.prompt();
    
    // Esperar a que el usuario responda
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    
    // Limpiar el prompt guardado
    setDeferredPrompt(null);
  };
 
  if (isStandalone) {
    return null; // No mostrar si ya está instalada
  }
 
  return (
    <>
      {deferredPrompt && (
        <Button
          variant="ghost"
          onClick={handleInstallClick}
          className="w-full flex justify-start items-start px-3 py-2 text-sm rounded-md hover:bg-blue-50 transition-colors"
        >
          <Download className="mr-2 h-4 w-4 text-blue-600" />
          <span>Instalar aplicación</span>
        </Button>
      )}
      
      {isIOS && !deferredPrompt && (
        <div className="w-full px-3 py-2">
          <Button variant="ghost"
            className="w-full flex justify-start items-start px-3 py-2 text-sm rounded-md hover:bg-gray-50 transition-colors">
            <Download className="mr-2 h-4 w-4" />
            <span>Instalar aplicación</span>
          </Button>
          <p className="text-xs text-gray-500">
            Toca el botón "Compartir" y luego "Añadir a pantalla de inicio"
          </p>
        </div>
      )}
    </>
  )
}