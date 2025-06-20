import { add } from '@/app/api/mercadopago';

// verificar mas cosas de la respuesta, clave secreta
export async function POST(request: Request) {
  try {
    const body: {data: {id:string}} = await request.json();

    await add(body.data.id);

    return new Response( null, {
      status: 200,})
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create payment preference' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}