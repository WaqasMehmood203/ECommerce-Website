const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchProducts(request, response) {
    try {
        const { query } = request.query;
        if (!query) {
            return response.status(400).json({ error: "Query parameter is required" });
        }

        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive' // Case-insensitive search
                        }
                    },
                    {
                        description: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        manufacturer: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        category: {
                            name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            include: {
                category: true // Include category data in results
            }
        });

        return response.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        return response.status(500).json({ error: "Error searching products" });
    }
}

module.exports = { searchProducts };