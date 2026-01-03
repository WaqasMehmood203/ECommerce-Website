const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
    try {
        console.log('🔍 Checking database connection and tables...\n');

        // Test connection
        await prisma.$connect();
        console.log('✅ Database connection successful!\n');

        // Check each table
        const tables = [
            { name: 'Product', model: prisma.product },
            { name: 'Category', model: prisma.category },
            { name: 'User', model: prisma.user },
            { name: 'Merchant', model: prisma.merchant },
            { name: 'Customer_order', model: prisma.customer_order },
            { name: 'Wishlist', model: prisma.wishlist },
            { name: 'Notification', model: prisma.notification },
            { name: 'Image', model: prisma.image },
        ];

        console.log('📊 Table Statistics:\n');
        console.log('═══════════════════════════════════════');

        for (const table of tables) {
            try {
                const count = await table.model.count();
                console.log(`${table.name.padEnd(20)} | ${count} records`);
            } catch (error) {
                console.log(`${table.name.padEnd(20)} | ❌ ERROR: ${error.message}`);
            }
        }

        console.log('═══════════════════════════════════════\n');

        // Get sample data
        console.log('📦 Sample Products:\n');
        const products = await prisma.product.findMany({
            take: 5,
            include: {
                category: true,
                merchant: true
            }
        });

        if (products.length > 0) {
            products.forEach((product, index) => {
                console.log(`${index + 1}. ${product.title}`);
                console.log(`   Price: $${product.price}`);
                console.log(`   Category: ${product.category.name}`);
                console.log(`   Merchant: ${product.merchant.name}`);
                console.log(`   In Stock: ${product.inStock}`);
                console.log('');
            });
        } else {
            console.log('⚠️  No products found in database!\n');
        }

        // Check categories
        console.log('📁 Categories:\n');
        const categories = await prisma.category.findMany();
        if (categories.length > 0) {
            categories.forEach((cat, index) => {
                console.log(`${index + 1}. ${cat.name} (ID: ${cat.id})`);
            });
        } else {
            console.log('⚠️  No categories found in database!\n');
        }

        console.log('\n✅ Database check complete!');

    } catch (error) {
        console.error('❌ Database Error:', error.message);
        console.error('\nFull error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();
