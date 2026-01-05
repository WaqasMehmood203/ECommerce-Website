/**
 * Test script to create a sample notification for a user
 * Run this with: node server/tests/create-test-notification.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestNotification() {
    try {
        console.log('🔍 Looking for admin user...');

        // Find an admin user
        const adminUser = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        });

        if (!adminUser) {
            console.log('❌ No admin user found. Please create an admin user first.');
            return;
        }

        console.log(`✅ Found admin user: ${adminUser.email} (ID: ${adminUser.id})`);

        // Check if user already has notifications
        const existingCount = await prisma.notification.count({
            where: { userId: adminUser.id }
        });

        console.log(`📊 User currently has ${existingCount} notifications`);

        // Create a test notification
        const notification = await prisma.notification.create({
            data: {
                userId: adminUser.id,
                title: 'Welcome to UniCart!',
                message: 'Your notification system is now working correctly. You can manage all your notifications from the notification center.',
                type: 'SYSTEM_ALERT',
                priority: 'NORMAL',
                isRead: false,
                metadata: {
                    test: true,
                    createdBy: 'test-script'
                }
            }
        });

        console.log('✅ Test notification created successfully!');
        console.log('Notification ID:', notification.id);
        console.log('Title:', notification.title);
        console.log('Type:', notification.type);
        console.log('');
        console.log('👉 Refresh your browser to see the notification badge!');

    } catch (error) {
        console.error('❌ Error creating test notification:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestNotification();
