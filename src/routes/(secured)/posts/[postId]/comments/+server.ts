import { fromApi, withToken } from '$lib/server/api';
import type { CommentDto, PageDto } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ fetch, locals, params, url }) => {
  const response = await fetch(
    fromApi(`posts/${params.postId}/comments`, {
      after: url.searchParams.get('after'),
      pageSize: 3
    }),
    withToken(locals.token)
  );
  const page = (await response.json()) as PageDto<CommentDto>;
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
  const content = page.content.map((comment) => ({
    ...comment,
    username: users[comment.authorId]
  }));
  return new Response(
    JSON.stringify({
      ...page,
      content
    })
  );
}) satisfies RequestHandler;

export const POST = (async ({ request, fetch, locals, params }) => {
  const { title, content } = await request.json();
  return fetch(
    fromApi(`posts/${params.postId}/comments`),
    withToken(locals.token, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
    })
  );
}) satisfies RequestHandler;
