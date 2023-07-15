<script lang="ts">
  import { Card, DateCaption, DeleteButton, Layout } from '$lib/components';
  import { notifications, user } from '$lib/stores';
  import type { CommentDto, PageDto } from '$lib/types';
  import { Button } from 'carbon-components-svelte';
  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let data: PageDto<CommentDto & { username: string }>;

  let { content: comments, nextCursor, hasNextPage } = data;
  let active: { [key: string]: boolean } = {};
  let isLoading = false;
  const dispatch = createEventDispatcher();
  const fetchNext = async () => {
    isLoading = true;
    const response = await fetch(`/posts/${id}/comments?after=${nextCursor}`);
    const data = (await response.json()) as PageDto<
      CommentDto & { username: string }
    >;
    comments = [...comments, ...data.content];
    nextCursor = data.nextCursor;
    hasNextPage = data.hasNextPage;
    isLoading = false;
  };
  const handleDeleteComment = async ({
    detail: commentId
  }: CustomEvent<string>) => {
    active = { ...active, [commentId]: true };
    const response = await fetch(`/posts/${id}/comments/${commentId}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      comments = comments.filter(({ commentId: id }) => id !== commentId);
      dispatch('delete', commentId);
      notifications.add({ kind: 'success', title: 'Comment deleted' });
    } else {
      active = { ...active, [commentId]: false };
      notifications.add({ kind: 'error', title: 'Failed to delete comment' });
    }
  };
</script>

<Layout gap={5}>
  {#each comments as { title, content, createdAt, commentId, authorId, username } (commentId)}
    <Card light heading={title} eyebrow={username} body={content}>
      <svelte:fragment slot="heading-action">
        <svelte:component
          this={authorId === $user.id ? DeleteButton : undefined}
          id={commentId}
          disabled={active[commentId] ?? false}
          on:delete={handleDeleteComment}
        />
      </svelte:fragment>
      <svelte:fragment slot="actions">
        <DateCaption date={createdAt} />
      </svelte:fragment>
    </Card>
  {/each}
  {#if hasNextPage || comments.length > 1}
    <Button on:click={fetchNext} disabled={!hasNextPage || isLoading}
      >more comments</Button
    >
  {/if}
</Layout>
