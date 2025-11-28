import { NextResponse } from 'next/server';
import { authPage } from '@/constant';

export function removeInvalidToken() {
  const res = NextResponse.redirect(authPage);

  res.cookies.set('token', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });

  return res;
}
