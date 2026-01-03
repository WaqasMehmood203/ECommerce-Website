import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch products marked as featured
        // Include the category for the frontend label
        const products = await prisma.product.findMany({
            where: {
                isFeatured: true,
            },
            include: {
                category: true,
            },
            orderBy: {
                price: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error in /api/products:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
