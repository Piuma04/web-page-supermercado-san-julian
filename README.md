# 🛒 Supermercado San Julián

Bienvenido a **Supermercado San Julián**, tu tienda online para hacer las compras del súper de forma fácil, rápida y segura.

¡Empezá a comprar online en San Julián y disfrutá de una experiencia moderna y segura!

Link al deployment: https://supermercadosanjulian.vercel.app/

## 👤 Acceso al sistema

### Administrador
- **Email:** admin@supermercado.com
- **Contraseña:** admin123

### Usuarios
- Es posible ingresar con cualquier cuenta de Google
- La unica cuenta registrada que puede acceder por mail y contraseña es la cuenta del admin


## 💳 Integración con Mercado Pago
### Notas sobre pagos
Al principio, utilizamos credenciales de producción de cuentas de prueba porque la pagina de mercado pago da la opcion de checkout pro como recomendada y facil de implementar, y no nos dimos cuenta que no estabamos usando sandbox.
El último dia tratamos de implementarlo, y lo logramos. Lo que había que hacer era cambiar la KEY del .env por las credenciales de prueba, pero en el momento daba un error de CORS. Aparentemente, ese es un error que a veces sucede en algunos dispositivos, y en la computadora que teniamos ocurrió. Cambiamos de computadora y funciono bien, al igual que en el deploy. Por lo que en caso de no funcionar, probablemente el CORS o el dispositivo usado este relacionado.


## 📱 Notificaciones Push
- Cada vez que se agrega un nuevo producto, se envía una notificación a los usuarios registrados
- Esta opción se puede deshabilitar al registrar un nuevo producto
- Al presionar la notificación, el usuario es dirigido a la página del producto correspondiente

## 🔧 Decisiones de diseño
- Una categoría con productos asociados no puede ser eliminada
- Al eliminar un producto, todos los ítems de carrito que lo contengan también serán eliminados
- El recibo de la compra se guarda como un string (similar a un ticket de compra)
- Los banners solo pueden ser creados, eliminados o cambiados de circulación, no modificados
- La API de Gemini podría no estar disponible en ciertos momentos debido a alta demanda
- Las compras aprobadas o autorizadas borran los items del carrito, el resto de compras no, esto le permite al usuario reintentar la compra.

## 🔐 Implementación del inicio de sesión

Inicialmente implementamos la autenticación con `getToken`, lo cual funcionaba en desarrollo local (perfecto andaba)pero fallaba al desplegarlo en Vercel. Es decir, al entrar al middleware nunca se obtenia el token.

Posteriormente, implementamos `await auth()`. El problema es que, en muchos casos, hay problema con ejecutar esta función en middleware, porque este corre en el edge. No obstante, nos anduvo perfecto (inclusive en producción).

En caso de experimentar problemas, la alternativa sería:

1. Verificar la sesión en el layout (o en la page para cart y profile)
2. Si hay sesión activa, permitir el acceso normal
3. Si no hay sesión, redirigir a login
4. Para el área de administración, verificar tanto la sesión como el rol (que sea 'ADMIN')




## 🤖 Inteligencia Artificial
La aplicación utiliza la API de Google Gemini para generar descripciones de productos automáticamente:

Funcionalidad: El administrador puede sugerir descripciones para productos basándose en el nombre y categoría
Implementación: Integración mediante API endpoint /api/gemini/generateDescription
Interfaz: Implementada a través del componente DescriptionIA con un diálogo modal
Consideraciones: La disponibilidad del servicio puede variar debido a limitaciones de la API de Google Gemini durante periodos de alta demanda


## 🖼️ Gestión de Imágenes
La aplicación utiliza Cloudinary como servicio de almacenamiento y gestión de imágenes:

Seguridad: Implementación de firmas de autenticación mediante el endpoint /api/cloudinary-signature
Upload Presets: Configuraciones específicas para diferentes tipos de contenido:
upload_products_secure: Para imágenes de productos
upload_banners_secure: Para banners promocionales
Optimización: Integración con el componente Image de Next.js para carga optimizada y responsiva
Fallbacks: Imágenes por defecto para productos sin imagen asignada


## 🔌 Integración de APIs
El proyecto implementa varias integraciones de APIs para extender su funcionalidad:

Cloudinary: Gestión segura de imágenes mediante endpoints firmados para prevenir cargas no autorizadas
Google Gemini: Generación de descripciones de productos con IA
Mercado Pago: Procesamiento seguro de pagos con manejo de preferencias y notificaciones
Web Push: Notificaciones push para informar sobre nuevos productos
Todas las integraciones están implementadas con un enfoque en la seguridad, utilizando variables de entorno para almacenar claves de API y tokens de acceso, asegurando que ninguna credencial sensible esté expuesta en el código del frontend.

