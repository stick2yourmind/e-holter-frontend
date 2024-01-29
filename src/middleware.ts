import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const auhtPath = ['/signin', '/signup'];
export const allowedRoutes = ['^(/_next|api|favicon.ico).*'];
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log('🚀 ~ file: middleware.ts:8 ~ middleware ~ pathname:', pathname);
  const isAllowed = allowedRoutes.some((route) => {
    const regex = new RegExp(route);
    return regex.test(pathname);
  });
  const isAuthPath = auhtPath.some((route) => route === pathname);
  console.log('🚀 ~ file: middleware.ts:12 ~ isAllowed ~ isAllowed:', isAllowed);
  let cookie = request.cookies.get('userToken');
  console.log('🚀 ~ file: middleware.ts:14 ~ middleware ~ cookie:', cookie);
  if (!isAuthPath && !cookie && !isAllowed) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/signin', request.url), {
      status: 303,
    });
  }

  const response = NextResponse.next();
  return response;
}
