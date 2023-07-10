<script lang="ts">
  import { SkeletonPlaceholder } from 'carbon-components-svelte';

  export let id: string;
  export let comments: number;

  const countComments = async () => {
    const response = await fetch(`/posts/${id}/comments/count`);
    const { count } = (await response.json()) as { count: number };
    comments = count ?? 0;
    return comments;
  };

  let count = countComments();

  const heading = (count: number) =>
    `${count === 0 ? 'No' : count} ${count === 1 ? 'comment' : 'comments'}`;
</script>

{#await count}
  <SkeletonPlaceholder style="height: 1.75rem; width: 10rem;" />
{:then}
  <h3>{heading(comments)}</h3>
{/await}
