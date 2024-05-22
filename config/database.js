const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDatabaseConnection(){
    try {
        await prisma.$connect();
        console.log('Connected to database')
    }
    catch (error) {
        console.log('Cant Connect to database', error)
    }
}
checkDatabaseConnection();

module.exports = prisma;