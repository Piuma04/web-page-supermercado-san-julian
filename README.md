# 🛒 Supermercado San Julián

Bienvenido a **Supermercado San Julián**, tu tienda online para hacer las compras del súper de forma fácil, rápida y segura.

¡Empezá a comprar online en San Julián y disfrutá de una experiencia moderna y segura!



Consideraciones a tener en cuenta y notas de los desarrolladores:

Cuenta del administrador:
email: admin@supermercado.com
contraseña: admin123

Es posible ingresar con cualquier cuenta de google.

Relacionado a mercado pago:
cuenta de comprador:
nombre de usuario:TESTUSER1289921401
contraseña:HC7F9fWzKD

cuenta de vendedor:
nombre de usuario:TESTUSER807889431
contraseña:AQfRg2UvFB

Se utilizaron las credenciales de produccion del vendedor para configurar los pagos.
Intentamos utilizar el modo sandbox pero daba errores a la hora del pago, rechazaba todos los pagos a pesar de usar las tarjetas de prueba y generar la preferencia correctamente.
Se cuenta con saldo en la cuenta para hacer varias pruebas.

Notificaciones Push:
Cada vez que un producto nuevo es agregado se envia una notificacion a los usuarios registrados. Esta opcion se puede deshabilitar al registrar el nuevo producto.
Al presionar la notificacion, el usuario es dirigido a la pagina del producto en cuestion.

Decisiones de diseño adoptadas:
Si una categoría tiene productos no puede ser eliminada.
Si un producto es eliminado, todos los ítems de carrito que lo contengan también lo serán.
Los ítems vendidos en una venta serán guardados en un string en el ítem producto por simplicidad (como si fuera un ticket que dan en el supermercado).
Hay registro de usuarios únicamente con google, los usuarios que ingresan por mail y contraseña no son registrados.
Los banners no pueden ser modificados, solo creados, eliminados o puestos dentro/fuera de circulación. 
La api de gemini podría no funcionar en ciertos momentos por saturación.

Aclaración con respecto al inicio de sesión:

Primero, tratamos de hacerlo con getToken (poniendo la request y secret), y funcionaba en dev y haciendo build y start, pero al momento de desplegarlo en vercel no funcionaba, no recuperaba el token. Tratamos de solucionarlo de diversas maneras, pero no funcionó. 
Después, probamos con await auth(), lo cual funcionaba. No obstante, investigamos que, al correr middleware en el edge, a muchos usuarios les traía problemas poner ese auth() dentro del middleware. No obstante, a nosotros nos funcionó, y no hubo problemas en ningún momento del deploy. Hay una manera de desactivar el hecho de que el middleware corra en el edge, pero nosotros no lo hicimos. 

No obstante, en caso de que hubiesen problemas, lo que habría que hacer es verificar la sesión en el layout (o en la page en el caso de cart y profile), y si hay sesión, deja entrar normalmente buscando el carrito (o accediendo al perfil), sino redirige a login. En el caso de admin, habría que verificar en layout dos cosas: si hay sesión, y si el rol es de admin. 