# 🛒 Supermercado San Julián

Bienvenido a **Supermercado San Julián**, tu tienda online para hacer las compras del súper de forma fácil, rápida y segura.

¡Empezá a comprar online en San Julián y disfrutá de una experiencia moderna y segura!

Link al deployment: https://supermercadosanjulian.vercel.app/


### Usuarios
- Es posible ingresar con cualquier cuenta de Google
- La unica cuenta registrada que puede acceder por mail y contraseña es la cuenta del admin


## 💳 Integración con Mercado Pago
Se ha utilizado la opcion SandBox, de tal manera se pueden probar facilmente los pagos


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


## 🤖 Inteligencia Artificial
La aplicación utiliza la API de Google Gemini para generar descripciones de productos automáticamente:

Funcionalidad: El administrador puede sugerir descripciones para productos basándose en el nombre y categoría
Implementación: Integración mediante API endpoint /api/gemini/generateDescription
Interfaz: Implementada a través del componente DescriptionIA con un diálogo modal
Consideraciones: La disponibilidad del servicio puede variar debido a limitaciones de la API de Google Gemini durante periodos de alta demanda


## 🖼️ Gestión de Imágenes
La aplicación utiliza Cloudinary como servicio de almacenamiento y gestión de imágenes:

Seguridad: Implementación de firmas de autenticación mediante el endpoint /api/cloudinary-signature
Upload Presets: Configuraciones específicas para diferentes tipos de contenido
Optimización: Integración con el componente Image de Next.js para carga optimizada y responsiva
Fallbacks: Imágenes por defecto para productos sin imagen asignada


## 🔌 Integración de APIs
El proyecto implementa varias integraciones de APIs para extender su funcionalidad:

Cloudinary: Gestión segura de imágenes mediante endpoints firmados para prevenir cargas no autorizadas
Google Gemini: Generación de descripciones de productos con IA
Mercado Pago: Procesamiento seguro de pagos con manejo de preferencias y notificaciones
Web Push: Notificaciones push para informar sobre nuevos productos
Todas las integraciones están implementadas con un enfoque en la seguridad, utilizando variables de entorno para almacenar claves de API y tokens de acceso, asegurando que ninguna credencial sensible esté expuesta en el código del frontend.

