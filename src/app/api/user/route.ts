import { getOrCreateUser } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma';

export async function GET() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newUser = await getOrCreateUser(
      user.email!,
      user.user_metadata.full_name || null,
      user.user_metadata.avatar_url || null,
    );

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await prisma.task.deleteMany({
      where: {
        userEmail: user.email,
      },
    });

    await prisma.user.delete({
      where: {
        email: user.email,
      },
    });

    return NextResponse.json({
      message: 'User and related tasks deleted successfully.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
