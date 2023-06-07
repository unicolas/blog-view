import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  const response = await fetch(`/posts/${params.id}`);
  return response.json();
}) satisfies PageServerLoad;
