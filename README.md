# 🛒 Supermercado San Julián

Bienvenido a **Supermercado San Julián**, tu tienda online para hacer las compras del súper de forma fácil, rápida y segura.

¡Empezá a comprar online en San Julián y disfrutá de una experiencia moderna y segura!

## 👤 Acceso al sistema

### Administrador
- **Email:** admin@supermercado.com
- **Contraseña:** admin123

### Usuarios
- Es posible ingresar con cualquier cuenta de Google
- Los usuarios que ingresan por email y contraseña no son registrados en el sistema


## 💳 Integración con Mercado Pago
### Notas sobre pagos
Al principio, utilizamos credenciales de producción (las que estan abajo) porque la pagina de mercado pago da esa
como recomendada, y no vimos que en el README decía que se usaba sandbox.
El último dia tratamos de implementarlo, y PUDIMOS. Lo que había que hacer era cambiar la KEY del .env,
pero en el momento daba un error de CORS. Aparentemente, ese es un error que a veces sucede en algunos dispositivos,
y justo en la compu que teniamos ocurrió. Cambiamos de compu y funciono bien, al igual que en el deploy.
Igualmente, dejamos las credenciales aqui abajo, como recuerdo: 


### Cuentas de prueba
**Comprador:**
- Nombre de usuario: TESTUSER1289921401
- Contraseña: HC7F9fWzKD

**Vendedor:**
- Nombre de usuario: TESTUSER807889431
- Contraseña: AQfRg2UvFB


## 📱 Notificaciones Push
- Cada vez que se agrega un nuevo producto, se envía una notificación a los usuarios registrados
- Esta opción se puede deshabilitar al registrar un nuevo producto
- Al presionar la notificación, el usuario es dirigido a la página del producto correspondiente

## 🔧 Decisiones de diseño
- Una categoría con productos asociados no puede ser eliminada
- Al eliminar un producto, todos los ítems de carrito que lo contengan también serán eliminados
- Los productos vendidos se guardan como un string en el ítem producto (similar a un ticket de compra)
- Los banners solo pueden ser creados, eliminados o cambiados de circulación, no modificados
- La API de Gemini podría no estar disponible en ciertos momentos debido a saturación

## 🔐 Implementación del inicio de sesión

Inicialmente implementamos la autenticación con `getToken`, lo cual funcionaba en desarrollo local (perfecto andaba)pero fallaba al desplegarlo en Vercel. Es decir, al entrar al middleware nunca se obtenia el token.

Posteriormente, implementamos `await auth()`. El problema es que, en muchos casos, hay problema con ejecutar esta función en middleware, porque este corre en el edge. No obstante, nos anduvo perfecto (inclusive en producción).

En caso de experimentar problemas, la alternativa sería:

1. Verificar la sesión en el layout (o en la page para cart y profile)
2. Si hay sesión activa, permitir el acceso normal
3. Si no hay sesión, redirigir a login
4. Para el área de administración, verificar tanto la sesión como el rol (que sea 'ADMIN')