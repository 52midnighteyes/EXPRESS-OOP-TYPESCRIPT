import { PrismaClient } from "../../../generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
class PrismaConfig {
    prisma;
    constructor() {
        const adapter = new PrismaNeon({
            connectionString: process.env.DATABASE_URL,
        });
        this.prisma = new PrismaClient({ adapter });
    }
    async connect() {
        await this.prisma.$connect();
    }
    async disconnect() {
        await this.prisma.$disconnect();
    }
}
const prismaClient = new PrismaConfig();
export const prisma = prismaClient.prisma;
//# sourceMappingURL=prisma.lib.js.map