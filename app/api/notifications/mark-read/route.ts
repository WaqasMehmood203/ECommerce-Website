import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { notificationIds, userId } = body;

        await prisma.notification.updateMany({
            where: {
                id: { in: notificationIds },
                userId: userId,
            },
            data: { isRead: true },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error bulk marking read:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
