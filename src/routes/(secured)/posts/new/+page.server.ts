import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions = {
  addPost: async ({ request, fetch }) => {
    const data = await request.formData();
    const title = data.get('title') as string;
    const content = data.get('content') as string;
    const tags = JSON.parse(data.get('tags') as string) as string[];
    if (!title) {
      return fail(400, {
        title,
        content,
        tags,
        invalidTitle: 'Title is required'
      });
    }
    if (!content) {
      return fail(400, {
        title,
        content,
        tags,
        invalidTitle: 'Title is required'
      });
    }
    const response = await fetch(`/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content, tags }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status !== 200) {
      return fail(400, { title, content, tags, success: false });
    }
    await response.json();
    throw redirect(303, '/posts');
  }
} satisfies Actions;
