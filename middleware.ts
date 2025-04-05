import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  await supabase.auth.getSession();

  // Protected routes
  const protectedPaths = ['/admin', '/favoritos', '/meu-perfil'];
  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Check admin routes
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      session.user.user_metadata.role !== 'admin'
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}
