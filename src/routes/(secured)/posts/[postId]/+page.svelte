<script lang="ts">
  import { goto } from '$app/navigation';
  import { Card, DateCaption, DeleteButton, Layout } from '$lib/components';
  import { user, notifications } from '$lib/stores';
  import type { CommentDto, PageDto, PostDto } from '$lib/types';
  import {
    Breadcrumb,
    BreadcrumbItem,
    Column,
    Grid,
    Row,
    Tag
  } from 'carbon-components-svelte';
  import CommentCount from './CommentCount.svelte';
  import CommentList from './CommentList.svelte';
  import AddCommentForm from './AddCommentForm.svelte';
  import type { ActionData } from './$types';

  export let data: {
    post: PostDto & { username: string };
    comments: PageDto<CommentDto & { username: string }>;
  };
  export let form: ActionData;

  let active = false;
  let commentCount = 0;
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
  const handleDeletePost = async ({ detail: id }: CustomEvent<string>) => {
    active = true;
    const response = await fetch(`/posts/${id}`, { method: 'DELETE' });
    if (response.status === 200) {
      notifications.add({ kind: 'success', title: 'Post deleted' });
      goto('/posts');
    } else {
      notifications.add({ kind: 'error', title: 'Failed to delete post' });
      active = false;
    }
  };
  const handleCommentDelete = () => void --commentCount;
</script>

<Grid narrow>
  <Row>
    <Column>
      <Layout gap={5}>
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="/posts">Posts</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage href={url}>{title}</BreadcrumbItem>
        </Breadcrumb>
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
            <DateCaption {date} />
          </svelte:fragment>
          <svelte:fragment slot="tag-group">
            {#each tags as tag}
              <Tag interactive>{tag}</Tag>
            {/each}
          </svelte:fragment>
        </Card>
        <CommentCount {id} bind:comments={commentCount} />
        <AddCommentForm {form} />
        <CommentList
          {id}
          data={data.comments}
          on:delete={handleCommentDelete}
        />
      </Layout>
    </Column>
  </Row>
</Grid>
