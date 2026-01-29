import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. In the future, check for a session token here
  const isAuthenticated = true; // Hardcoded for now

  // 2. If trying to access protected routes without auth, redirect
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/')) {
     return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Add security headers (Best Practice)
  const headers = new Headers(request.headers);
  headers.set('x-frame-options', 'DENY'); // Prevent Clickjacking
  headers.set('x-content-type-options', 'nosniff');

  return NextResponse.next({
    request: { headers },
  });
}

// Only run on specific paths (ignore images, static files)
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};