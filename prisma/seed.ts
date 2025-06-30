const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  // Crear categorías
  const cat1 = await prisma.category.create({ data: { name: 'Bebidas' } });
  const cat2 = await prisma.category.create({ data: { name: 'Snacks' } });
  const cat3 = await prisma.category.create({ data: { name: 'Limpieza' } });

  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        name: 'Agua Mineral',
        description: 'Agua sin gas 500ml',
        price: 50,
        categoryId: cat1.id,
      },
      {
        name: 'Papas Fritas',
        description: 'Bolsa 150g',
        price: 120,
        categoryId: cat2.id,
      },
      {
        name: 'Detergente Líquido',
        description: '1 litro para ropa',
        price: 350,
        categoryId: cat3.id,
      },
    ],
  });

  // Crear usuario admin con password hasheada
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser  = await prisma.user.create({
    data: {
      email: 'admin@supermercado.com',
      passwd: hashedPassword,
      role: 'ADMIN',
    },
  });


  await prisma.cart.create({
    data: {
      userId: adminUser.id,
      // items: []  // vacío al inicio, opcional ponerlo
    },
  });

  console.log('Seed completada');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });