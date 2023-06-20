<script lang="ts">
  import { goto } from '$app/navigation';
  import { Card, DateCaption, DeleteButton } from '$lib/components';
  import { userStore } from '$lib/stores';
  import type { PostDto } from '$lib/types';
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Column,
    Grid,
    Row,
    Tag
  } from 'carbon-components-svelte';
  import { Chat } from 'carbon-icons-svelte';
  import {
    addNotification,
    notificationsStore
  } from '$lib/stores/notification';

  export let data: { post: PostDto & { username: string } };

  let active = false;
  const {
    postId: id,
    title,
    content,
    tags,
    createdAt: date,
    authorId,
    username
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
  const user = userStore();
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
      <Card heading={title} eyebrow={username} body={content}>
        <svelte:fragment slot="heading-action">
          <svelte:component
            this={authorId === $user.id ? DeleteButton : undefined}
            {id}
            disabled={active}
            on:delete={handleDeletePost}
          />
        </svelte:fragment>
        <svelte:fragment slot="actions">
          <Button kind="ghost" href={`/posts/${id}/#`} icon={Chat}>#</Button>
          <DateCaption {date} />
        </svelte:fragment>
        <svelte:fragment slot="tag-group">
          {#each tags as tag}
            <Tag interactive>{tag}</Tag>
          {/each}
        </svelte:fragment>
      </Card>
    </Column>
  </Row>
</Grid>
