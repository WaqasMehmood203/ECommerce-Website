import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const images = await prisma.image.findMany({
            where: {
                productID: id,
            },
        });

        return NextResponse.json(images);
    } catch (error) {
        console.error("Error fetching images for product:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
