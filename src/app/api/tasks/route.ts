import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.tasks.findMany();

    if (!data) {
      throw new Error("No tasks found");
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await prisma.tasks.create({
      data: {
        ...body,
      },
    });

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const data = await prisma.tasks.update({
      where: {
        id: body.id,
      },
      data: {
        ...body,
      },
    });

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const data = await prisma.tasks.delete({
      where: {
        id: body.id,
      },
    });

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}
