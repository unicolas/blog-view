import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  const post = await (await fetch(`/posts/${params.postId}`)).json();
  const comments = await (
    await fetch(`/posts/${params.postId}/comments`)
  ).json();
  return { post, comments };
}) satisfies PageServerLoad;

export const actions = {
  addComment: async ({ request, fetch, params }) => {
    const data = await request.formData();
    const title = data.get('title') as string;
    const content = data.get('content') as string;
    if (!title) {
      return fail(400, { content, success: false });
    }
    if (!content) {
      return fail(400, { content, invalidTitle: 'Content is required' });
    }
    const response = await fetch(`/posts/${params.postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status !== 200) {
      return fail(400, { content, success: false });
    }
    await response.json();
    return { success: true };
  }
} satisfies Actions;
