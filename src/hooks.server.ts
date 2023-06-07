import { type Handle, redirect } from '@sveltejs/kit';

const isSecured = (path: string) => !['/login'].includes(path);

export const handle = (async ({ event, resolve }) => {
  if (isSecured(event.url.pathname)) {
    const jwt = event.cookies.get('JWT-Cookie');
    if (!jwt) {
      throw redirect(303, `/login?redirectTo=${event.url.pathname}`);
    }
    event.locals.token = jwt;
  }
  return await resolve(event);
}) satisfies Handle;
