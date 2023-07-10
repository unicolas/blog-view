import { fromApi, withToken } from '$lib/server/api';
import type { RequestHandler } from '@sveltejs/kit';

export const DELETE = (async ({ fetch, locals, params }) => {
  return fetch(
    fromApi(`comments/${params.commentId}`),
    withToken(locals.token, { method: 'DELETE' })
  );
}) satisfies RequestHandler;
