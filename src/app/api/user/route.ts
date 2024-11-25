import { getOrCreateUser } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

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
    console.error('Error in user route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
