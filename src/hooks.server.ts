import { fromApi, withToken } from '$lib/server/api';
import { setAccessCookie } from '$lib/server/cookies';
import { type Handle, redirect } from '@sveltejs/kit';

const isSecured = (path: string) => !['/login', '/signup'].includes(path);

export const handle = (async ({ event, resolve }) => {
  const path = event.url.pathname;

  if (isSecured(path)) {
    const access = event.cookies.get('JWT-Cookie-Access');
    if (!access) {
      const refresh = event.cookies.get('JWT-Cookie-Refresh');
      if (refresh) {
        const response = await fetch(
          fromApi('refresh'),
          withToken(refresh, { method: 'POST' })
        );
        if (response.ok) {
          const { access } = await response.json();
          setAccessCookie(event.cookies, access);
          event.locals.token = access;
          return resolve(event);
        }
      }
      throw redirect(302, `/login`);
    }
    event.locals.token = access;
  }
  return resolve(event);
}) satisfies Handle;
