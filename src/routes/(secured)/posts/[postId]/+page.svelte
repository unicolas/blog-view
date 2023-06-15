<script lang="ts">
  import { goto } from '$app/navigation';
  import { Post } from '$lib/components';
  import type { PostDto } from '$lib/types';
  import {
    Breadcrumb,
    BreadcrumbItem,
    Column,
    Grid,
    Row
  } from 'carbon-components-svelte';

  export let data: { post: PostDto };

  let active = false;
  const {
    postId: id,
    title,
    content,
    tags,
    createdAt: date,
    authorId
  } = data.post;
  const url = `/posts/${id}`;
  const handleDeletePost = async (event: CustomEvent<string>) => {
    const postId = event.detail;
    active = true;
    const response = await fetch(`/posts/${postId}`, { method: 'DELETE' });
    if (response.status === 200) {
      goto('/posts');
    } else {
      active = false;
    }
  };
</script>

<Grid narrow>
  <Row>
    <Column>
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem href="/posts">Posts</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage href={url}>{title}</BreadcrumbItem>
      </Breadcrumb>
    </Column>
  </Row>
  <Row padding>
    <Column>
      <Post
        {id}
        {title}
        {content}
        {tags}
        {date}
        {authorId}
        {active}
        on:delete={handleDeletePost}
      />
    </Column>
  </Row>
</Grid>
