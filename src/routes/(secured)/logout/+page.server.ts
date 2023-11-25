import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  cookies.delete('JWT-Cookie-Access');
  cookies.delete('JWT-Cookie-Refresh');
  throw redirect(303, '/login');
}) satisfies PageServerLoad;
