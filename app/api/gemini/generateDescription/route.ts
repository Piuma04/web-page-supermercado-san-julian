
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server'; // Importa NextResponse para respuestas JSON

export async function POST(request:NextResponse) {
  try {
    // Obtenemos los datos del cuerpo de la solicitud
    const { productName, category } = await request.json();

    // Validamos que al menos el nombre del producto esté presente
    if (!productName) {
      return NextResponse.json(
        { message: 'Product name is required.' },
        { status: 400 }
      );
    }

    // Accedemos a la clave de API desde las variables de entorno
    const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { message: 'API key not configured.' },
        { status: 500 }
      );
    }

    // Inicializamos el cliente de Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    // Seleccionamos el modelo 'gemini-pro'
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Construimos el prompt
    let prompt = `Genera una descripción de producto atractiva y concisa para el siguiente artículo:\n\n`;
    prompt += `Nombre del producto: ${productName}`;

    if (category) {
      prompt += `\nCategoría: ${category}`;
    }

    prompt += `\n\nLa descripción debe ser ideal para una tienda online, destacando sus beneficios clave.`;

    // Hacemos la solicitud a la API de Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    // Enviamos la descripción generada de vuelta
    return NextResponse.json({ description: generatedText }, { status: 200 });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    return NextResponse.json(
      { message: 'Error generating description.', error: errorMessage },
      { status: 500 }
    );
  }
}

// Puedes añadir otros métodos HTTP si los necesitas (GET, PUT, DELETE, etc.)
// export async function GET(request) { ... }