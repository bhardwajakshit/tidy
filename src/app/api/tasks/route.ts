import { prisma } from '../../../../prisma/prisma';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: { userEmail: user.email },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, priority, cardColor, textColor } =
      await request.json();

    if (!title || !cardColor || !textColor) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userEmail: user.email,
        priority,
        cardColor,
        textColor,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing task ID' }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing task ID' }, { status: 400 });
    }

    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json(deletedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 },
    );
  }
}
