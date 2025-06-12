const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🌱 Ejecutando seed')
  // Crear categorías
  const frutas = await prisma.category.create({
    data: { name: 'Frutas' },
  });

  const bebidas = await prisma.category.create({
    data: { name: 'Bebidas' },
  });

  const hashedPassword = await bcrypt.hash('123456', 10); //hash password

  const user = await prisma.user.create({
    data: {
      email: '9KX0T@example.com',
      passwd: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Crear productos
  const manzana = await prisma.product.create({
    data: {
      name: 'Manzana Roja',
      price: 120,
      imageUrl: '/images/manzana.jpg',
      categoryId: frutas.id,
    },
  });

  const banana = await prisma.product.create({
    data: {
      name: 'Banana',
      price: 100,
      imageUrl: 'https://media.istockphoto.com/id/157375066/es/foto/banana-clipping-path-borde-de-corte.jpg?s=2048x2048&w=is&k=20&c=TTgKUl9UT_q6JlnIJprhtRNH3p0PUKBioZa_pEyNdTI=',
      categoryId: frutas.id,
    },
  });

  const coca = await prisma.product.create({
    data: {
      name: 'Coca-Cola 1.5L',
      price: 600,
      imageUrl: '/images/coca.jpg',
      categoryId: bebidas.id,
    },
  });

  await prisma.cart.create({
  data: {
    userId: user.id,
    items: {
      create: [
        {
          product: { connect: { id: coca.id } },
          quantity: 2,
        },
        {
          product: { connect: { id: manzana.id } },
          quantity: 1,
        },
      ],
    },
  },
});

}


main()
  .then(() => {
    console.log('✅ Seed ejecutada correctamente');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });