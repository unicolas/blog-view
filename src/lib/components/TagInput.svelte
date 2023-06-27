<script lang="ts">
  import { ComboBox, FormGroup, Tag } from 'carbon-components-svelte';
  import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';

  export let labelText = '';
  export let placeholder = '';
  export let tags: string[] = [];
  export let suggestions: ComboBoxItem[] = [];

  let value = '';
  let ref: ComboBox;
  $: items = [
    ...(value.length >= 3 ? [{ id: value, text: value }] : []),
    ...suggestions.filter((each) => each.id !== value)
  ];
  $: formValue = JSON.stringify(tags);
  const removeTag = (term: string) =>
    (tags = tags.filter((each) => each !== term));
  const selectTag = (e: { detail: { selectedId: string } }) => {
    const term = e.detail.selectedId;
    if (!tags.find((each) => each === term)) {
      tags = [...tags, term];
    }
    ref.clear();
  };
  const shouldFilterItem = (item: { text: string }, value: string) =>
    !value || item.text.toLowerCase().includes(value.toLowerCase());
</script>

<FormGroup legendText={labelText}>
  <div class="tag-group">
    {#each tags as tag (tag)}
      <Tag filter on:close={() => removeTag(tag)}>{tag}</Tag>
    {/each}
  </div>
  <ComboBox
    {items}
    {placeholder}
    bind:value
    bind:this={ref}
    {shouldFilterItem}
    on:select={selectTag}
  />
  <input type="hidden" aria-hidden name="tags" value={formValue} />
</FormGroup>

<style lang="scss">
  @use '@carbon/layout' as layout;

  .tag-group {
    padding-bottom: layout.$spacing-03;
  }
  .tag-group:empty {
    padding-bottom: 0;
  }
</style>
