self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/images/icon.png',
      badge: '/images/icon.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url, // <-- aquí adentro
        dateOfArrival: Date.now(),
        primaryKey: '2',
      }
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
 
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  let url = 'https://supermercadosanjulian.vercel.app';
  if (event.notification.data && event.notification.data.url) {
    const dataUrl = event.notification.data.url;
    url = url + dataUrl;
  }
  event.waitUntil(clients.openWindow(url))
})