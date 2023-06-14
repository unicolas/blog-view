import { fromApi, withToken } from '$lib/server/api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
  const response = await fetch(fromApi('users/current'), withToken(locals.token));
  const user = await response.json();
  return { username: user.username, id: user.userId };
}) satisfies LayoutServerLoad;
