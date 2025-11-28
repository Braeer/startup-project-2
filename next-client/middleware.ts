import { NextRequest, NextResponse } from 'next/server';
import {
  getTokenFromRequest,
  isPageAllowed,
  redirectToLogin,
  removeInvalidToken,
  validateToken,
} from './lib';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPageAllowed(pathname)) {
    return NextResponse.next();
  }

  const token = getTokenFromRequest(req);

  if (!token) {
    return redirectToLogin(req);
  }

  const valid = validateToken(token);

  if (!valid) {
    return removeInvalidToken();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
