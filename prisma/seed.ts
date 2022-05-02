import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const loyalData: Prisma.LoyalCreateInput[] = [
  {
    email: "test@toto.com",
  },
];

const ownerData: Prisma.OwnerCreateInput = {
  secret: process.env.PASSWORD,
};

async function main() {
  console.log(`Start seeding ...`);

  for (const l of loyalData) {
    const loyal = await prisma.loyal.create({
      data: l,
    });
    console.log(`Created loyal with id: ${loyal.id}`);
  }

  const owner = await prisma.owner.create({ data: ownerData });

  console.log(`Created owner secret with id: ${owner.id}`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
