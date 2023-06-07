import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request, fetch, url }) => {
    const data = await request.formData();
    const username = data.get('username') as string;
    const password = data.get('password') as string;
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
