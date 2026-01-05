import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  // 1. Create Admin User
  const adminEmail = 'admin@unicart.com'
  const adminPassword = 'Admin@123'

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      }
    })
    console.log('✅ Admin user created')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log(`   Role: admin`)
  } else {
    console.log('ℹ️  Admin user already exists')
    // Update password in case it was forgotten
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        password: hashedPassword,
        role: 'admin'
      }
    })
    console.log('✅ Admin user password reset')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
  }

  // 2. Create a Merchant
  const merchant = await prisma.merchant.upsert({
    where: { id: 'default-merchant-id' },
    update: {},
    create: {
      id: 'default-merchant-id',
      name: 'Global Electronics',
      email: 'contact@globalelectronics.com',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Merchant created/verified')

  // 3. Create Categories
  const categories = [
    { id: 'cat-smartphones', name: 'Smartphones' },
    { id: 'cat-laptops', name: 'Laptops' },
    { id: 'cat-audio', name: 'Audio' },
    { id: 'cat-watches', name: 'Watches' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    })
  }
  console.log('✅ Categories created/verified')

  // 4. Create Products
  const products = [
    {
      title: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      price: 999,
      description: 'The latest iPhone with Pro camera system.',
      manufacturer: 'Apple',
      mainImage: 'smart phone 1.png',
      categoryId: 'cat-smartphones',
      isFeatured: true,
      inStock: 10,
    },
    {
      title: 'MacBook Air M2',
      slug: 'macbook-air-m2',
      price: 1199,
      description: 'Supercharged by M2 chip.',
      manufacturer: 'Apple',
      mainImage: 'laptop 1.webp',
      categoryId: 'cat-laptops',
      isFeatured: true,
      inStock: 5,
    },
    {
      title: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      price: 349,
      description: 'The best noise canceling headphones.',
      manufacturer: 'Sony',
      mainImage: 'headphones 1.png',
      categoryId: 'cat-audio',
      isFeatured: true,
      inStock: 15,
    },
    {
      title: 'Samsung Galaxy S23 Ultra',
      slug: 'samsung-s23-ultra',
      price: 1199,
      description: 'The ultimate Android phone.',
      manufacturer: 'Samsung',
      mainImage: 'smart phone 2.png',
      categoryId: 'cat-smartphones',
      isFeatured: true,
      inStock: 8,
    },
    {
      title: 'Dell XPS 13',
      slug: 'dell-xps-13',
      price: 999,
      description: 'Smallest 13-inch laptop.',
      manufacturer: 'Dell',
      mainImage: 'laptop 2.webp',
      categoryId: 'cat-laptops',
      isFeatured: false,
      inStock: 3,
    },
    {
      title: 'Apple Watch Series 9',
      slug: 'apple-watch-s9',
      price: 399,
      description: 'Smarter, brighter, mightier.',
      manufacturer: 'Apple',
      mainImage: 'smart watch 1.png',
      categoryId: 'cat-watches',
      isFeatured: true,
      inStock: 12,
    },
    {
      title: 'Bose QuietComfort 45',
      slug: 'bose-qc45',
      price: 329,
      description: 'Iconic quiet. Comfort. And sound.',
      manufacturer: 'Bose',
      mainImage: 'headphones 2.png',
      categoryId: 'cat-audio',
      isFeatured: true,
      inStock: 7,
    },
    {
      title: 'Logitech MX Master 3S',
      slug: 'logitech-mx3s',
      price: 99,
      description: 'An icon. Remastered.',
      manufacturer: 'Logitech',
      mainImage: 'mouse 1.png',
      categoryId: 'cat-audio', // Using audio as generic tech for now
      isFeatured: true,
      inStock: 20,
    },
    {
      title: 'iPad Pro M2',
      slug: 'ipad-pro-m2',
      price: 799,
      description: 'Astonishing performance.',
      manufacturer: 'Apple',
      mainImage: 'tablet 1 1.png',
      categoryId: 'cat-laptops',
      isFeatured: true,
      inStock: 6,
    },
    {
      title: 'AirPods Pro 2',
      slug: 'airpods-pro-2',
      price: 249,
      description: 'Rebuilt from the sound up.',
      manufacturer: 'Apple',
      mainImage: 'earbuds 1.png',
      categoryId: 'cat-audio',
      isFeatured: true,
      inStock: 25,
    }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        isFeatured: product.isFeatured,
        price: product.price,
        inStock: product.inStock,
      },
      create: {
        ...product,
        merchantId: 'default-merchant-id',
      },
    })
  }

  console.log('✅ Products seeded successfully')
  console.log('🌱 Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
