import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()
const transactionsFilePath = process.cwd() + '/prisma/data/transactions.json'
const productsFilePath = process.cwd() + '/prisma/data/products.json'

async function seedDatabase() {
  try {
    const data = fs.readFileSync(transactionsFilePath, 'utf-8')
    const transactions = JSON.parse(data)

    await prisma.transaction.createMany({
      data: transactions,
    })

    const products = fs.readFileSync(productsFilePath, 'utf-8')
    const productData = JSON.parse(products)

    await prisma.product.createMany({
      data: productData,
    })

    console.log('Transactions added successfully')
  } catch (error) {
    console.error('Error adding transactions:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()
