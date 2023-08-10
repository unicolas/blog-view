import type { RequestHandler } from './$types';
import { fromApi } from '$lib/server/api';

export const POST = (async ({ request, fetch }) => {
  const { username, password, email } = await request.json();
  return fetch(fromApi('signup'), {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
    headers: { 'Content-Type': 'application/json' }
  });
}) satisfies RequestHandler;
