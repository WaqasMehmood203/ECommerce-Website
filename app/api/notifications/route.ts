import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, title, message, type, priority, metadata } = body;

        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type,
                priority: priority || 'NORMAL',
                metadata,
            },
        });

        return NextResponse.json(notification);
    } catch (error) {
        console.error('Error creating notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
