import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const colorSchemes = [
    {
      cardColor: 'bg-[#222222]',
      textColor: 'text-white',
    },
    {
      cardColor: 'bg-[#c9c9c0]',
      textColor: 'text-black',
    },
    {
      cardColor: 'bg-[#967e76]',
      textColor: 'text-white',
    },
    {
      cardColor: 'bg-[#99a98e]',
      textColor: 'text-black',
    },
  ];

  for (const scheme of colorSchemes) {
    const existingScheme = await prisma.colorScheme.findFirst({
      where: {
        cardColor: scheme.cardColor,
        textColor: scheme.textColor,
      },
    });

    if (!existingScheme) {
      await prisma.colorScheme.create({
        data: scheme,
      });
    }
  }
}

main()
  .then(() => console.log('Database seeded with color schemes!'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
