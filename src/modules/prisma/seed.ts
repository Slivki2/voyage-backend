import { PrismaClient } from "@prisma/client"
// import { readFileSync } from 'fs';

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // DO SOME SEEDING HERE
  // E.G.
  // const users = JSON.parse(readFileSync('src/prisma/seeds/users.json', 'utf-8'));

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async e => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
