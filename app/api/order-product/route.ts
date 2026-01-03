import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerOrderId, productId, quantity } = body;

        if (!customerOrderId || !productId || !quantity) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const orderProduct = await prisma.customer_order_product.create({
            data: {
                customerOrderId,
                productId,
                quantity: Number(quantity),
            },
        });

        return NextResponse.json(orderProduct);
    } catch (error) {
        console.error("Error creating order product:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
