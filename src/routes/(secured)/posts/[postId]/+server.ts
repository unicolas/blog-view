import type { RequestHandler } from './$types';
import { fromApi, withToken } from '$lib/server/api';

export const GET = (async ({ fetch, locals, params }) => {
  const post = await (
    await fetch(fromApi(`posts/${params.postId}`), withToken(locals.token))
  ).json();
  const getUsername = async (userId: string) => {
    const user = await (
      await fetch(fromApi(`users/${userId}`), withToken(locals.token))
    ).json();
    return user.username as string;
  };
  return new Response(
    JSON.stringify({
      ...post,
      username: await getUsername(post.authorId)
    })
  );
}) satisfies RequestHandler;

export const DELETE = (async ({ fetch, locals, params }) => {
  return fetch(
    fromApi(`posts/${params.postId}`),
    withToken(locals.token, { method: 'DELETE' })
  );
}) satisfies RequestHandler;
