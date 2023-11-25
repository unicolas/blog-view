import type { Cookies } from '@sveltejs/kit';

export const setAccessCookie = (cookies: Cookies, token: string) =>
  cookies.set('JWT-Cookie-Access', token, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: 14 * 60
  });

export const setRefreshCookie = (cookies: Cookies, token: string) =>
  cookies.set('JWT-Cookie-Refresh', token, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: 59 * 60 * 24
  });
