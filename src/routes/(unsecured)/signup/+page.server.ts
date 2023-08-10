import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const username = cookies.get('Username') ?? '';
  return { username };
}) satisfies PageServerLoad;

export const actions = {
  signUp: async ({ request, fetch }) => {
    const data = await request.formData();
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const email = data.get('email') as string;
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status !== 200) {
      return fail(response.status, { username, email, success: false });
    }
    throw redirect(303, '/login');
  }
} satisfies Actions;
