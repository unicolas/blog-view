import type { RequestHandler } from './$types';
import { fromApi, withToken } from '$lib/server/api';
import type { PageDto, PostDto } from '$lib/types';

export const GET = (async ({ url, fetch, locals }) => {
  const response = await fetch(
    fromApi('posts', {
      after: url.searchParams.get('after'),
      pageSize: 3
    }),
    withToken(locals.token)
  );
  const page = (await response.json()) as PageDto<PostDto>;
  const getUsername = async (userId: string) => {
    const user = await (
      await fetch(fromApi(`users/${userId}`), withToken(locals.token))
    ).json();
    return user.username as string;
  };
  const users: { [id: string]: string } = page.content.reduce(
    (acc, { authorId }) => ({ ...acc, [authorId]: undefined }),
    {}
  );
  await Promise.all(
    Object.keys(users).map(
      async (authorId) => (users[authorId] = await getUsername(authorId))
    )
  );
  const content = page.content.map((post) => ({
    ...post,
    username: users[post.authorId]
  }));
  return new Response(
    JSON.stringify({
      ...page,
      content
    })
  );
}) satisfies RequestHandler;

export const POST = (async ({ request, fetch, locals }) => {
  const { title, content, tags } = await request.json();
  return fetch(
    fromApi('posts'),
    withToken(locals.token, {
      method: 'POST',
      body: JSON.stringify({ title, content, tags }),
      headers: { 'Content-Type': 'application/json' }
    })
  );
}) satisfies RequestHandler;
