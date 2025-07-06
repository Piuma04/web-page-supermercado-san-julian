import { addPurchase } from '@/app/api/mercadopago';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // Obtener headers necesarios
    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    // Si falta la firma, rechazar
    if (!xSignature || !xRequestId) {
      return new Response(JSON.stringify({ error: 'Missing signature or request id' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Separar la firma en partes y extraer ts y v1
    let ts = '';
    let hash = '';
    xSignature.split(',').forEach(part => {
      const [key, value] = part.split('=').map(s => s.trim());
      if (key === 'ts') ts = value;
      if (key === 'v1') hash = value;
    });

    // Leer body como texto para poder parsear y usar en el manifest
    const body = await request.text().then(text => JSON.parse(text));

    if (body.action !== 'payment.created') {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Construir el manifest según la documentación de Mercado Pago
    const manifest = `id:${body.data.id};request-id:${xRequestId};ts:${ts};`;

    // Generar el HMAC usando tu clave secreta
    const secret = process.env.SECRET_KEY_MP!;
    const hmac = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

    // Validar la firma
    if (hmac !== hash) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Procesar el pago
    await addPurchase(body.data.id);

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to register Payment"}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}