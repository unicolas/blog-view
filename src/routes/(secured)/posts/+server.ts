import type { RequestHandler } from './$types';
import { fromApi, withToken } from '$lib/server/api';

export const GET = (async ({ url, fetch, locals }) => {
  const response = await fetch(fromApi('posts', {
    after: url.searchParams.get('after'),
    pageSize: 3
  }), withToken(locals.token));
  return response;
}) satisfies RequestHandler;
