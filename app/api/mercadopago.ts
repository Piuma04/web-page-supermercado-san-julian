import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { Item } from '@/app/lib/types';
import prisma from '../lib/prisma';
import { fetchUser } from '../lib/data';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
const preference = new Preference(client);

export async function createPreference(items: Item[]) {
  try {
    const user = await fetchUser();

    const response = await preference.create({
      body: {
        items,
        external_reference: String(user!.id), // Guardamos el ID del usuario que inicia la compra
        back_urls: {
          success: 'https://es.wikipedia.org/wiki/Wikipedia:Recurso_del_d%C3%ADa',
          failure: 'https://es.wikipedia.org/wiki/Wikipedia:Recurso_del_d%C3%ADa',
          pending: 'https://es.wikipedia.org/wiki/Wikipedia:Recurso_del_d%C3%ADa'
        },
        auto_return: 'approved',
      }
    });
    return response.init_point;
  } catch (error) {
    console.error("Error creating preference:", error);
    throw new Error("Failed to create payment preference");
  }
}

export async function add(id: string) {
  try{
    const purchase = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
    }
  }).then(res => res.json());

  await prisma.purchase.create({
    data: {
      total: purchase.transaction_amount!,
      description: purchase.description!,
      status: purchase.status,
      mercadoPagoId: purchase.id,
      user: { connect: { id: Number(purchase.external_reference) } }
    }
  });

  }catch (error) {
    console.error("Error adding payment:", error);
    throw new Error("Failed to add payment");
  }
}
