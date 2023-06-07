import { parse } from 'cookie';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fromApi } from '$lib/server/api';

export const POST = (async ({ request, fetch, cookies }) => {
  const { username, password } = await request.json();
  const response = await fetch(fromApi('login'), {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  });
  const cookie = response.headers.get('set-cookie');
  if (cookie !== null) {
    const cookieContent = parse(cookie);
    cookies.set('JWT-Cookie', cookieContent['JWT-Cookie'],
      {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24
      }
    );
    return new Response();
  }
  throw error(401);
}) satisfies RequestHandler;
