<script lang="ts">
  import { Post } from '$lib';
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
  let nextPosts = [] as PostDto[];

  $: posts = [...posts, ...nextPosts];

  const fetchNext = async () => {
    const response = await fetch(`/posts?after=${nextCursor}`);
    const data = (await response.json()) as PageDto<PostDto>;
    nextCursor = data.nextCursor;
    nextPosts = data.content;
    hasNextPage = data.hasNextPage;
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
  {#each posts as { title, content, tags, createdAt: date, postId: id }}
    <Row padding>
      <Column>
        <Post {id} {title} {content} {tags} {date} />
      </Column>
    </Row>
  {/each}
  <Row>
    <Column>
      <Button on:click={fetchNext} disabled={!hasNextPage}>more</Button>
    </Column>
  </Row>
</Grid>
