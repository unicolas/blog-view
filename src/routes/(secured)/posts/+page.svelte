<script lang="ts">
  import { DateCaption, DeleteButton, Card, Layout } from '$lib/components';
  import { user, notifications } from '$lib/stores';
  import type { PageDto, PostDto } from '$lib/types';
  import {
    Button,
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    Tag
  } from 'carbon-components-svelte';
  import CommentsButton from './CommentsButton.svelte';

  export let data: PageDto<PostDto & { username: string }>;

  let { content: posts, nextCursor, hasNextPage } = data;
  let active: { [key: string]: boolean } = {};

  const fetchNext = async () => {
    const response = await fetch(`/posts?after=${nextCursor}`);
    const data = (await response.json()) as PageDto<
      PostDto & { username: string }
    >;
    posts = [...posts, ...data.content];
    nextCursor = data.nextCursor;
    hasNextPage = data.hasNextPage;
  };
  const handleDeletePost = async (event: CustomEvent<string>) => {
    const postId = event.detail;
    active = { ...active, [postId]: true };
    const response = await fetch(`/posts/${postId}`, { method: 'DELETE' });
    if (response.status === 200) {
      posts = posts.filter(({ postId: id }) => id !== postId);
      notifications.add({ kind: 'success', title: 'Post deleted' });
    } else {
      active = { ...active, [postId]: false };
      notifications.add({ kind: 'error', title: 'Failed to delete post' });
    }
  };
</script>

<Grid narrow>
  <Row>
    <Column>
      <Layout gap={5}>
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem isCurrentPage href="/posts">Posts</BreadcrumbItem>
        </Breadcrumb>
        {#each posts as { title, content, tags, createdAt, postId, authorId, username } (postId)}
          <Card heading={title} eyebrow={username} body={content} lineClamp={8}>
            <svelte:fragment slot="heading-action">
              <svelte:component
                this={authorId === $user.id ? DeleteButton : undefined}
                id={postId}
                disabled={active[postId] ?? false}
                on:delete={handleDeletePost}
              />
            </svelte:fragment>
            <svelte:fragment slot="actions">
              <CommentsButton id={postId} />
              <DateCaption date={createdAt} />
            </svelte:fragment>
            <svelte:fragment slot="tag-group">
              {#each tags as tag}
                <Tag interactive>{tag}</Tag>
              {/each}
            </svelte:fragment>
          </Card>
        {/each}
        <Button on:click={fetchNext} disabled={!hasNextPage}>more posts</Button>
      </Layout>
    </Column>
  </Row>
</Grid>
