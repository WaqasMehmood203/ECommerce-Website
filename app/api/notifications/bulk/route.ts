import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { notificationIds, userId } = body;

        await prisma.notification.deleteMany({
            where: {
                id: { in: notificationIds },
                userId: userId,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error bulk deleting notifications:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
