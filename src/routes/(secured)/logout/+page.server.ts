import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  cookies.delete('JWT-Cookie');
  throw redirect(303, '/login');
}) satisfies PageServerLoad;
