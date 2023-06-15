<script lang="ts">
  import {
    Button,
    Column,
    Grid,
    Row,
    Tag,
    Tile
  } from 'carbon-components-svelte';
  import { userStore } from '../stores';
  import { DeleteButton } from '$lib/components';

  export let id = '';
  export let title = '';
  export let content = '';
  export let tags: String[] = [];
  export let date = '';
  export let authorId = '';
  export let active = false;

  const formatDate = (date: string) =>
    new Date(date).toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short'
    });
  const user = userStore();
</script>

<Tile>
  <Grid>
    <Row>
      <Column>
        <h3>{title}</h3>
      </Column>
      {#if authorId === $user.id}
        <Column sm={1} md={1} lg={1}>
          <DeleteButton {id} disabled={active} on:delete />
        </Column>
      {/if}
    </Row>
    <Row>
      <Column>
        <p>{content}</p>
      </Column>
    </Row>
    <Row>
      <Column>
        {#each tags as tag}
          <Tag interactive>{tag}</Tag>
        {/each}
      </Column>
    </Row>
    <Row>
      <Column>
        <Button size="field" kind="ghost" href={`/posts/${id}`}>
          # comments
        </Button>
      </Column>
      <Column>
        <div class="date">{formatDate(date)}</div>
      </Column>
    </Row>
  </Grid>
</Tile>

<style>
  .date {
    align-items: center;
    display: flex;
    height: 100%;
    flex-direction: row-reverse;
  }
</style>
