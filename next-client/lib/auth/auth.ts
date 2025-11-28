import { allowedPages, authPage } from '@/constant';
import { NextResponse, NextRequest } from 'next/server';

export function isPageAllowed(pathname: string): boolean {
  return allowedPages.includes(pathname);
}

export function redirectToLogin() {
  return NextResponse.redirect(authPage);
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) return null;

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return null;

  return token || null;
}
