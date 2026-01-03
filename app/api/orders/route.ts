import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            lastname,
            phone,
            email,
            company,
            adress,
            apartment,
            postalCode,
            status,
            total,
            city,
            country,
            orderNotice,
        } = body;

        // Create the order in the database
        const order = await prisma.customer_order.create({
            data: {
                name,
                lastname,
                phone,
                email,
                company,
                adress,
                apartment,
                postalCode,
                status: status || "pending",
                total: Math.round(total), // Ensure it's an integer for DB if needed
                city,
                country,
                orderNotice,
            },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
