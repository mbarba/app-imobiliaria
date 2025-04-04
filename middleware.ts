import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.delete({ name, ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protege rotas administrativas
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (user?.role !== 'admin' && user?.role !== 'realtor') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protege rotas da API para modificações
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (request.method !== 'GET' && !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verifica permissões específicas
    if (request.method !== 'GET' && session) {
      const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();

      const isAdmin = user?.role === 'admin';
      const isRealtor = user?.role === 'realtor';

      // Restrições por rota
      if (request.nextUrl.pathname.startsWith('/api/properties')) {
        if (!isAdmin && !isRealtor) {
          return NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 }
          );
        }
      }

      if (request.nextUrl.pathname.startsWith('/api/realtors')) {
        if (!isAdmin) {
          return NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 }
          );
        }
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
};
