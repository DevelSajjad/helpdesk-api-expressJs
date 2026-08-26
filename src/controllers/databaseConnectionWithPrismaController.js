const prisma = require('../config/prisma');

const testPrismaDatabase = async (req, res, next) => {
    try {
        const rows = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
        const results = rows.map((row) => ({
            result: Number(row.result),
        }));

        res.json({
            success: true,
            database: "Connected",
            results,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = testPrismaDatabase;