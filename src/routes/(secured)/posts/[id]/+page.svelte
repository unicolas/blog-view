<script lang="ts">
  import { Post } from '$lib';
  import type { PostDto } from '$lib/types';
  import {
    Breadcrumb,
    BreadcrumbItem,
    Column,
    Grid,
    Row
  } from 'carbon-components-svelte';

  export let data: PostDto;

  const { postId: id, title, content, tags, createdAt: date } = data;
  const url = `/posts/${id}`;
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
      <Post {id} {title} {content} {tags} {date} />
    </Column>
  </Row>
</Grid>
