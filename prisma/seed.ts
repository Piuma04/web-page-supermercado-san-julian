const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🌱 Ejecutando seed')
  // Crear categorías de supermercado
  
  const frutas = await prisma.category.create({
    data: { name: 'Frutas y Verduras' },
  });

  const carnes = await prisma.category.create({
    data: { name: 'Carnes y Aves' },
  });

  const pescados = await prisma.category.create({
    data: { name: 'Pescados y Mariscos' },
  });

  const lacteos = await prisma.category.create({
    data: { name: 'Lácteos y Huevos' },
  });

  const panaderia = await prisma.category.create({
    data: { name: 'Panadería y Pastelería' },
  });

  const bebidas = await prisma.category.create({
    data: { name: 'Bebidas' },
  });

  const despensa = await prisma.category.create({
    data: { name: 'Despensa' },
  });

  const congelados = await prisma.category.create({
    data: { name: 'Congelados' },
  });

  const snacks = await prisma.category.create({
    data: { name: 'Snacks y Golosinas' },
  });

  const limpieza = await prisma.category.create({
    data: { name: 'Limpieza del Hogar' },
  });

  const higiene = await prisma.category.create({
    data: { name: 'Higiene Personal' },
  });

  const bebe = await prisma.category.create({
    data: { name: 'Bebé y Infantil' },
  });

  const mascotas = await prisma.category.create({
    data: { name: 'Mascotas' },
  });

  const hogar = await prisma.category.create({
    data: { name: 'Hogar y Jardín' },
  });

  const hashedPassword = await bcrypt.hash('admin', 10); //hash password

  const user = await prisma.user.create({
    data: {
      email: 'admin@mail.com',
      passwd: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Crear productos
  const manzana = await prisma.product.create({
    data: {
      name: 'Manzana Roja x Kg',
      price: 120,
      imageUrl: null,
      categoryId: frutas.id,
    },
  });

  const banana = await prisma.product.create({
    data: {
      name: 'Banana x Kg',
      price: 100,
      imageUrl: null,
      categoryId: frutas.id,
    },
  });

  const tomate = await prisma.product.create({
    data: {
      name: 'Tomate Perita x Kg',
      price: 180,
      imageUrl: null,
      categoryId: frutas.id,
    },
  });

  const coca = await prisma.product.create({
    data: {
      name: 'Coca-Cola 1.5L',
      price: 600,
      imageUrl: null,
      categoryId: bebidas.id,
    },
  });

  const agua = await prisma.product.create({
    data: {
      name: 'Agua Mineral Villavicencio 2L',
      price: 300,
      imageUrl: null,
      categoryId: bebidas.id,
    },
  });

  const carne = await prisma.product.create({
    data: {
      name: 'Bife de Chorizo x Kg',
      price: 2500,
      imageUrl: null,
      categoryId: carnes.id,
    },
  });

  const pollo = await prisma.product.create({
    data: {
      name: 'Pechuga de Pollo x Kg',
      price: 1200,
      imageUrl: null,
      categoryId: carnes.id,
    },
  });

  const leche = await prisma.product.create({
    data: {
      name: 'Leche Entera La Serenísima 1L',
      price: 450,
      imageUrl: null,
      categoryId: lacteos.id,
    },
  });

  const yogur = await prisma.product.create({
    data: {
      name: 'Yogur Natural Sancor 900g',
      price: 380,
      imageUrl: null,
      categoryId: lacteos.id,
    },
  });

  const pan = await prisma.product.create({
    data: {
      name: 'Pan Francés x Unidad',
      price: 80,
      imageUrl: null,
      categoryId: panaderia.id,
    },
  });

  const arroz = await prisma.product.create({
    data: {
      name: 'Arroz Gallo Oro 1Kg',
      price: 520,
      imageUrl: null,
      categoryId: despensa.id,
    },
  });

  const fideos = await prisma.product.create({
    data: {
      name: 'Fideos Moñitos Matarazzo 500g',
      price: 350,
      imageUrl: null,
      categoryId: despensa.id,
    },
  });

  const helado = await prisma.product.create({
    data: {
      name: 'Helado Freddo Dulce de Leche 1L',
      price: 1800,
      imageUrl: null,
      categoryId: congelados.id,
    },
  });

  const papas = await prisma.product.create({
    data: {
      name: 'Papas Fritas Lays 150g',
      price: 420,
      imageUrl: null,
      categoryId: snacks.id,
    },
  });

  const detergente = await prisma.product.create({
    data: {
      name: 'Detergente Ala Ultra 3L',
      price: 950,
      imageUrl: null,
      categoryId: limpieza.id,
    },
  });

  await prisma.cart.create({
  data: {
    userId: user.id,
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