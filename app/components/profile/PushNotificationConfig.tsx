"use client";

import { useEffect, useState } from 'react'
import { subscribeUser, unsubscribeUser } from '../../lib/actions';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PushNotificationConfig() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    async function init() {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        setIsSupported(false);
        return;
      }
      
      setIsSupported(true);
      
      try {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
      } catch (error) {
        console.error('Error al verificar suscripción:', error);
      }
    }
    
    init();
  }, [])
 
 
  async function toggleSubscription() {
    setLoading(true)
    try {
      if (subscription) {
        await unsubscribeFromPush()
      } else {
        await subscribeToPush()
      }
    } catch (error) {
      console.error('Error toggling subscription:', error)
    } finally {
      setLoading(false)
    }
  }
 
  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        return;
      }
      
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      
      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
    } catch (error) {
      console.error('Error al suscribirse:', error);
    }
  }
 
  async function unsubscribeFromPush() {
    if (!subscription) return;
    
    const endpoint = subscription.endpoint;
    
    await subscription.unsubscribe();
    setSubscription(null);
    
    // Pasar el endpoint específico para eliminar solo esta suscripción
    await unsubscribeUser(endpoint);
  }
 
  if (!isSupported) {
    return null;
  }
 
  return (
    <Button
      onClick={toggleSubscription}
      disabled={loading}
      variant="ghost"
      className="w-full justify-start px-3 py-2 items-start text-sm rounded-md hover:bg-green-50 transition-colors"
      title={subscription ? "Desactivar notificaciones" : "Activar notificaciones"}
    >
      {subscription ? (
        <>
          <Bell className="mr-2 h-4 w-4 text-green-600" />
          <span>Notificaciones activadas</span>
        </>
      ) : (
        <>
          <BellOff className="mr-2 h-4 w-4 text-gray-500" />
          <span>Activar notificaciones</span>
        </>
      )}
    </Button>
  )
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
 
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}