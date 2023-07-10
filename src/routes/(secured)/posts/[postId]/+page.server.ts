import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  const post = await (await fetch(`/posts/${params.postId}`)).json();
  const comments = await (
    await fetch(`/posts/${params.postId}/comments`)
  ).json();
  return { post, comments };
}) satisfies PageServerLoad;
