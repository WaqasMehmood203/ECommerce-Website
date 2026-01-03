import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { NotificationType, NotificationPriority } from '@prisma/client';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        const { searchParams } = new URL(request.url);

        const type = searchParams.get('type') as NotificationType | null;
        const isRead = searchParams.get('isRead') === 'true' ? true :
            searchParams.get('isRead') === 'false' ? false : undefined;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

        const where: any = { userId };
        if (type) where.type = type;
        if (isRead !== undefined) where.isRead = isRead;

        const [notifications, total, unreadCount] = await Promise.all([
            prisma.notification.findMany({
                where,
                orderBy: { [sortBy]: sortOrder },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.notification.count({ where }),
            prisma.notification.count({ where: { userId, isRead: false } }),
        ]);

        return NextResponse.json({
            notifications,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            unreadCount,
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
