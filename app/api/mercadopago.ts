import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { Item } from '@/app/lib/types';
import prisma from '../lib/prisma';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
const preference = new Preference(client);

export async function createPreference(items: Item[]) {
  try {
    const response = await preference.create({
      body: {
        items,
        back_urls: {
          success: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1',
          failure: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1',
          pending: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1'
        },
        auto_return: 'approved'
      }
    });
    return response.init_point;
  } catch (error) {
    throw error;
  }
}

export async function add(id: string) {
  const purchase = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
    }
  }).then(res => res.json());
  if (purchase.status === 'approved') {
    const user = await prisma.user.findUnique({
      where: { email: purchase.payer?.email }
    });
    await prisma.purchase.create({
      data: {
        total: purchase.transaction_amount!,
        description: purchase.description!,
        address: '', // TODO: Replace with actual address
        addressNumber: 111, // TODO: Replace with actual address number
        user: { connect: { id: user?.id } }
      }
    });
  } else {
    throw new Error('Payment not approved');
  }
}
