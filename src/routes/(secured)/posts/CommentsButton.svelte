<script lang="ts">
  import { Button } from 'carbon-components-svelte';
  import { Chat } from 'carbon-icons-svelte';

  export let id: string;

  const countComments = async () => {
    const response = await fetch(`/posts/${id}/comments/count`);
    const { count } = await response.json();
    return count ?? 0;
  };

  let count = countComments();
</script>

{#await count}
  <Button kind="ghost" skeleton />
{:then count}
  <Button kind="ghost" href={`/posts/${id}`} icon={Chat}>{count}</Button>
{/await}
