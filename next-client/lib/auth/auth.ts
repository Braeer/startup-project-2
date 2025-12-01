import { allowedPages, authPage } from '@/constant';
import { NextResponse, NextRequest } from 'next/server';
import { storage } from './tokenStorage';
import { setAuthCookies } from './tokenCokies';

export function isPageAllowed(pathname: string): boolean {
  if (pathname === '/') return true;
  // return allowedPages.includes(pathname);

  return allowedPages.some((page) => page !== '/' && pathname.startsWith(page));
}

export function redirectToLogin(req: Request) {
  const url = new URL(authPage, req.url);

  return NextResponse.redirect(url);
}
// export function getTokenFromRequest(req: NextRequest): string | null {
//   const authHeader = req.headers.get('authorization');

//   if (!authHeader) return null;

//   const [type, token] = authHeader.split(' ');
//   if (type !== 'Bearer') return null;

//   return token || null;
// }

// function saveToken

interface AuthPayload {
  email: string;
  password: string;
}

export async function authRequest(url: string, payload: AuthPayload): Promise<boolean> {
  try {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (!data.access_token) {
      return false;
    }

    storage.setToken(data.access_token);
    setAuthCookies(data.access_token);

    window.location.href = '/dashboard';

    return true;
  } catch (error) {
    console.error('Authentication request failed:', error);
    storage.clearToken();
    return false;
  }
}

interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

export async function registerRequest(url: string, payload: RegisterPayload): Promise<boolean> {
  try {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (!data.access_token) {
      return false;
    }

    storage.setToken(data.access_token);
    setAuthCookies(data.access_token);

    window.location.href = '/dashboard';

    return true;
  } catch (error) {
    console.error('Authentication request failed:', error);
    storage.clearToken();
    return false;
  }
}

export async function logoutRequest() {
  try {
    storage.clearToken();
    setAuthCookies('');

    window.location.href = '/auth/login';
  } catch (error) {
    console.error();
  }
}
