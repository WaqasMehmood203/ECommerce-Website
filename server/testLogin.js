// Test admin login
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testLogin() {
    try {
        const email = "admin@unicart.com";
        const password = "Admin@123";

        console.log("🔍 Testing login for:", email);
        console.log("─".repeat(50));

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            console.log("❌ User not found!");
            return;
        }

        console.log("✅ User found in database");
        console.log("   Email:", user.email);
        console.log("   Role:", user.role);
        console.log("   Has password:", !!user.password);

        if (!user.password) {
            console.log("❌ User has no password set!");
            return;
        }

        console.log("   Password hash (first 20 chars):", user.password.substring(0, 20) + "...");
        console.log("");
        console.log("🔐 Testing password match...");

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            console.log("✅ Password matches! Login should work.");
        } else {
            console.log("❌ Password does NOT match!");
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testLogin();
