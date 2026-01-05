const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COMMON_CATEGORIES = [
    'Electronics',
    'Laptops',
    'Audio',
    'Televisions',
    'Cameras',
    'Home Appliances',
    'Kitchen Appliances',
    'Mobile Phones',
    'Tablets',
    'Wearables',
    'Gaming',
    'Accessories',
    'Smart Home',
    'Computers',
    'Monitors'
];

async function addMissingCategories() {
    try {
        console.log('📋 Checking existing categories...\n');

        // Get all existing categories
        const existingCategories = await prisma.category.findMany({
            select: { name: true }
        });

        const existingNames = new Set(
            existingCategories.map(c => c.name.toLowerCase())
        );

        console.log(`✅ Found ${existingCategories.length} existing categories:`);
        existingCategories.forEach(c => console.log(`   - ${c.name}`));
        console.log();

        // Find missing categories
        const missingCategories = COMMON_CATEGORIES.filter(
            cat => !existingNames.has(cat.toLowerCase())
        );

        if (missingCategories.length === 0) {
            console.log('✅ All common categories already exist!');
            return;
        }

        console.log(`📦 Adding ${missingCategories.length} missing categories...\n`);

        // Add missing categories
        for (const categoryName of missingCategories) {
            const created = await prisma.category.create({
                data: { name: categoryName }
            });
            console.log(`✅ Created: ${created.name} (${created.id})`);
        }

        console.log('\n🎉 Successfully added all missing categories!');

        // Show final count
        const finalCount = await prisma.category.count();
        console.log(`\n📊 Total categories in database: ${finalCount}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

addMissingCategories();
