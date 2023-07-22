import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const username = cookies.get('Username') ?? '';
  return { username };
}) satisfies PageServerLoad;

export const actions = {
  logIn: async ({ request, fetch, url, cookies }) => {
    const data = await request.formData();
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    data.has('remember')
      ? cookies.set('Username', username)
      : cookies.delete('Username');
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status !== 200) {
      return fail(401, { username, success: false });
    }
    throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
  }
} satisfies Actions;
