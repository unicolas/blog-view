<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Column,
    Grid,
    Row
  } from 'carbon-components-svelte';
  import type { ActionData } from './$types';
  import AddPostForm from './AddPostForm.svelte';

  export let form: ActionData;
</script>

<Grid narrow>
  <Row>
    <Column>
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem href="/posts">Posts</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage href="/posts/new">New</BreadcrumbItem>
      </Breadcrumb>
    </Column>
  </Row>
  <Row padding>
    <Column>
      <AddPostForm {form} />
    </Column>
  </Row>
</Grid>
