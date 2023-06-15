<script lang="ts">
  import { Button } from 'carbon-components-svelte';
  import { TrashCan } from 'carbon-icons-svelte';
  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let disabled = false;

  const dispatch = createEventDispatcher();
</script>

<Button
  kind="ghost"
  size="small"
  iconDescription="Delete"
  icon={TrashCan}
  on:click={() => dispatch('delete', id)}
  {disabled}
/>
