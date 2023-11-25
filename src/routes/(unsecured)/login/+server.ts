import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fromApi } from '$lib/server/api';
import { setAccessCookie, setRefreshCookie } from '$lib/server/cookies';

export const POST = (async ({ request, fetch, cookies }) => {
  const { username, password } = await request.json();
  const response = await fetch(fromApi('login'), {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    const { access, refresh } = await response.json();
    setAccessCookie(cookies, access);
    setRefreshCookie(cookies, refresh);
    return new Response();
  }
  throw error(401);
}) satisfies RequestHandler;
