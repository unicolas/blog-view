<script lang="ts">
  import {
    Column,
    Grid,
    Row,
    Tag,
    ClickableTile
  } from 'carbon-components-svelte';

  export let id = '';
  export let title = '';
  export let content = '';
  export let tags: String[] = [];
  export let date = '';

  const url = `/posts/${id}`;
  const formatDate = (date: string) => new Date(date).toLocaleString();
</script>

<ClickableTile href={url}>
  <Grid>
    <Row>
      <Column>
        <h3>{title}</h3>
      </Column>
    </Row>
    <Row>
      <Column>
        <p>{content}</p>
      </Column>
    </Row>
    <Row>
      <Column>
        {#each tags as tag}
          <Tag>{tag}</Tag>
        {/each}
      </Column>
    </Row>
    <Row>
      <Column>
        <span># comments</span>
      </Column>
      <Column>
        <div class="text-align--right">{formatDate(date)}</div>
      </Column>
    </Row>
  </Grid>
</ClickableTile>

<style>
  .text-align--right {
    text-align: right;
  }
</style>
