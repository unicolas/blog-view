import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
  const response = await fetch('/posts');
  return response.json();
}) satisfies PageServerLoad;
