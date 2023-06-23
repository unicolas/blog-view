import { fromApi, withToken } from '$lib/server/api';
import type { RequestHandler } from './$types';

export const GET = (async ({ fetch, locals, params }) => {
  return await fetch(
    fromApi(`posts/${params.postId}/comments/count`),
    withToken(locals.token)
  );
}) satisfies RequestHandler;
