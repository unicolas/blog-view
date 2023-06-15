<script lang="ts">
  import { Post } from '$lib/components';
  import type { PageDto, PostDto } from '$lib/types';
  import {
    Button,
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem
  } from 'carbon-components-svelte';

  export let data: PageDto<PostDto>;

  let { content: posts, nextCursor, hasNextPage } = data;
  let active: { [key: string]: boolean } = {};

  const fetchNext = async () => {
    const response = await fetch(`/posts?after=${nextCursor}`);
    const data = (await response.json()) as PageDto<PostDto>;
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
    } else {
      active = { ...active, [postId]: false };
    }
  };
</script>

<Grid narrow>
  <Row>
    <Column>
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem isCurrentPage href="/posts">Posts</BreadcrumbItem>
      </Breadcrumb>
    </Column>
  </Row>
  {#each posts as { title, content, tags, createdAt: date, postId: id, authorId }}
    <Row padding>
      <Column>
        <Post
          {id}
          {title}
          {content}
          {tags}
          {date}
          {authorId}
          active={active[id] ?? false}
          on:delete={handleDeletePost}
        />
      </Column>
    </Row>
  {/each}
  <Row>
    <Column>
      <Button on:click={fetchNext} disabled={!hasNextPage}>more</Button>
    </Column>
  </Row>
</Grid>
