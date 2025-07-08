import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { Item } from '@/app/lib/types';
import prisma from '../lib/prisma';
import { fetchUser } from '../lib/data';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
const preference = new Preference(client);

export async function createPreference(items: Item[]) {
  try {
    const user = await fetchUser();

    const metadata: { user_id: number, items: Item[] } = {
      user_id: user!.id,
      items: items
    };

    const response = await preference.create({
      body: {
        items,
        metadata: metadata, // Guardamos el ID del usuario que inicia la compra, y datos de los items comprados
        back_urls: {
          success: 'https://supermercadosanjulian.vercel.app/',
          failure: 'https://supermercadosanjulian.vercel.app/',
          pending: 'https://supermercadosanjulian.vercel.app/'
        },
        auto_return: 'approved',
        notification_url: process.env.NOTIFICATION_URL_MP, // URL para recibir notificaciones
      }
    });
    return response.init_point;
  } catch (error) {
    console.error("Error creating preference:", error);
    throw new Error("Failed to create payment preference");
  }
}

export async function addPurchase(id: string) {
  try{
    const purchase = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
    }
  }).then(res => res.json());

  const metadata: { user_id: number, items: Item[] } = purchase.metadata;
  const description = `${metadata.items.map(({ title, quantity, unit_price }) => 
    `Producto: ${title}, Cantidad: ${quantity.toString()}, Precio: ${unit_price.toFixed(2)} ARS`
  ).join(`\n`)}`;

  await prisma.purchase.create({
    data: {
      total: purchase.transaction_amount!*100, // Convertimos a centavos
      description,
      status: purchase.status,
      mercadoPagoId: purchase.id,
      user: { connect: { id: metadata.user_id } }
    }
  });

  }catch (error) {
    console.error("Error adding payment:", error);
    throw new Error("Failed to add payment");
  }
}
