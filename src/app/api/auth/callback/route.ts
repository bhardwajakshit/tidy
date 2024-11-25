import { createClient } from '@/utils/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';
import { ROUTE } from '@/utils/constants';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(ROUTE.HOME, requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/auth-code-error', requestUrl.origin));
}
