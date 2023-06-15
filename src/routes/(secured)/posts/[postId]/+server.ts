import type { RequestHandler } from './$types';
import { fromApi, withToken } from '$lib/server/api';

export const GET = (async ({ fetch, locals, params }) => {
  return fetch(fromApi(`posts/${params.postId}`), withToken(locals.token));
}) satisfies RequestHandler;

export const DELETE = (async ({ fetch, locals, params }) => {
  return fetch(
    fromApi(`posts/${params.postId}`),
    withToken(locals.token, { method: 'DELETE' })
  );
}) satisfies RequestHandler;
