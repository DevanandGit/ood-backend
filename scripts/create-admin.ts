import { PrismaClient, Role } from "@prisma/client";
import * as readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = (question: string) =>
    new Promise<string>((resolve) => rl.question(question, resolve));

async function main() {
    try {
        const email = await ask("Admin Email: ");

        const admin = await prisma.user.create({
            data: {
                email,
                role: Role.ADMIN,
                is_verified: true,
                AdminProfile: { create: {} },
            },
        });

        console.log("\n✔ Admin user created successfully");
        console.log(admin);
    } catch (err: any) {
        console.error("\n❌ Error creating admin:", err.message);
    } finally {
        rl.close();
        await prisma.$disconnect();
    }
}

main();
