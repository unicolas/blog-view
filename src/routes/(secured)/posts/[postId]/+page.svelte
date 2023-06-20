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
  import {
    addNotification,
    notificationsStore
  } from '$lib/stores/notification';

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
      addNotification(notifications, {
        kind: 'success',
        title: 'Post deleted'
      });
      goto('/posts');
    } else {
      addNotification(notifications, {
        kind: 'error',
        title: 'Failed to delete post'
      });
      active = false;
    }
  };
  const notifications = notificationsStore();
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
