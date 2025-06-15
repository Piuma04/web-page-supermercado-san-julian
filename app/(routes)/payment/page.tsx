'use client';
import { checkout } from "@/app/lib/actions";
import { Item } from "@/app/lib/types";
import { redirect } from 'next/navigation';

const items: Item[] = [
    {
        id: 'item-1234',
        title: 'Producto de prueba',
        quantity: 1,
        unit_price: 100.00,
    },
    {
        id: 'item-5678',
        title: 'Lápiz',
        quantity: 3,
        unit_price: 25,
    },
    {
        id: 'item-9012',
        title: 'Goma de borrar',
        quantity: 2,
        unit_price: 15,
    },
    {
        id: 'item-3456',
        title: 'Caramelo',
        quantity: 10,
        unit_price: 5,
    }
];

export default function Page () {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Botón de Pago</h1>
      <p>Haz clic en el botón para realizar el pago.</p>
      {/* Renderiza el botón de pago */}
    <button
      onClick={async () => {
        const preferenceUrl = await checkout(items);
        redirect(preferenceUrl);
      }}
    >
      Pagar
    </button>
    </div>
  );
};
