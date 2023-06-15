import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  const post = await (await fetch(`/posts/${params.postId}`)).json();
  return { post };
}) satisfies PageServerLoad;
