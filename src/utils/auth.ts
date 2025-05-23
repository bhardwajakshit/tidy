import { prisma } from '../../prisma/prisma';

export async function getOrCreateUser(
  email: string,
  name: string | null,
  image: string | null,
) {
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        image,
      },
    });
  }

  return user;
}
