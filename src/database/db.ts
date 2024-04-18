const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const db = prisma;
export default db;