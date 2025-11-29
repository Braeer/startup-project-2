import { NextRequest, NextResponse } from 'next/server';
import { isPageAllowed, redirectToLogin } from './lib';

export function middleware(req: Request) {
  // const {  } = req.url;
  const url = new URL(req.url);
  const { pathname } = url;

  if (isPageAllowed(pathname)) {
    return NextResponse.next();
  }

  const token = req.headers.get('cookie')?.match(/authToken=([^;]+)/)?.[1] || null;

  if (!token) {
    return redirectToLogin(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
