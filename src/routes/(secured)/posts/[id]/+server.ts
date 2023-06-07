import type { RequestHandler } from './$types';
import { fromApi, withToken } from '$lib/server/api';

export const GET = (async ({ params, fetch, locals }) => {
  return fetch(fromApi(`posts/${params.id}`), withToken(locals.token));
}) satisfies RequestHandler;
