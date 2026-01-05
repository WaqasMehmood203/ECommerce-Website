const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get all wishlist items (Admin only)
 */
async function getAllWishlist(req, res) {
    try {
        const wishlist = await prisma.wishlist.findMany({
            include: {
                product: true,
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        });

        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error fetching all wishlist items:", error);
        res.status(500).json({ error: "Failed to fetch wishlist items" });
    }
}

/**
 * Get all wishlist items for a specific user
 */
async function getAllWishlistByUserId(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const wishlist = await prisma.wishlist.findMany({
            where: {
                userId: userId
            },
            include: {
                product: true
            }
        });

        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error fetching user wishlist:", error);
        res.status(500).json({ error: "Failed to fetch user wishlist" });
    }
}

/**
 * Create a new wishlist item
 */
async function createWishItem(req, res) {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                error: "User ID and Product ID are required"
            });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if item already exists in wishlist
        const existingItem = await prisma.wishlist.findFirst({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (existingItem) {
            return res.status(409).json({
                error: "Product already in wishlist",
                wishlistItem: existingItem
            });
        }

        // Create wishlist item
        const wishlistItem = await prisma.wishlist.create({
            data: {
                userId: userId,
                productId: productId
            },
            include: {
                product: true
            }
        });

        console.log(`✅ Product ${productId} added to wishlist for user ${userId}`);
        res.status(201).json(wishlistItem);
    } catch (error) {
        console.error("Error creating wishlist item:", error);
        res.status(500).json({ error: "Failed to add item to wishlist" });
    }
}

/**
 * Delete a wishlist item
 */
async function deleteWishItem(req, res) {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                error: "User ID and Product ID are required"
            });
        }

        // Find the wishlist item
        const wishlistItem = await prisma.wishlist.findFirst({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (!wishlistItem) {
            return res.status(404).json({ error: "Wishlist item not found" });
        }

        // Delete the wishlist item
        await prisma.wishlist.delete({
            where: {
                id: wishlistItem.id
            }
        });

        console.log(`✅ Product ${productId} removed from wishlist for user ${userId}`);
        res.status(200).json({
            message: "Item removed from wishlist successfully"
        });
    } catch (error) {
        console.error("Error deleting wishlist item:", error);
        res.status(500).json({ error: "Failed to remove item from wishlist" });
    }
}

/**
 * Check if a specific product is in user's wishlist
 */
async function getSingleProductFromWishlist(req, res) {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                error: "User ID and Product ID are required"
            });
        }

        const wishlistItem = await prisma.wishlist.findFirst({
            where: {
                userId: userId,
                productId: productId
            },
            include: {
                product: true
            }
        });

        if (!wishlistItem) {
            return res.status(404).json({
                inWishlist: false,
                message: "Product not in wishlist"
            });
        }

        res.status(200).json({
            inWishlist: true,
            wishlistItem: wishlistItem
        });
    } catch (error) {
        console.error("Error checking wishlist item:", error);
        res.status(500).json({ error: "Failed to check wishlist status" });
    }
}

module.exports = {
    getAllWishlist,
    getAllWishlistByUserId,
    createWishItem,
    deleteWishItem,
    getSingleProductFromWishlist
};
