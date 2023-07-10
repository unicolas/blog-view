<script lang="ts">
  import { Tile } from 'carbon-components-svelte';

  export let heading: string;
  export let eyebrow: string | undefined = undefined;
  export let body = '';
  export let lineClamp: number | 'none' = 'none';
</script>

<Tile {...$$restProps}>
  <div class="heading-wrapper">
    {#if eyebrow}
      <div class="eyebrow">{eyebrow}</div>
    {/if}
    <div class="heading">{heading}</div>
    <div class="heading-action-wrapper">
      {#if $$slots['heading-action']}
        <slot name="heading-action" />
      {/if}
    </div>
  </div>
  <div class="body-wrapper">
    <p class="body line-clamp" style:-webkit-line-clamp={lineClamp}>{body}</p>
    <div class="tag-group">
      {#if $$slots['tag-group']}
        <slot name="tag-group" />
      {/if}
    </div>
  </div>
  <div class="footer-wrapper">
    <slot name="actions" />
  </div>
</Tile>

<style lang="scss">
  @use '@carbon/type' as type;
  @use '@carbon/layout' as layout;
  .heading {
    @include type.type-style('productive-heading-04');
  }
  .eyebrow {
    @include type.type-style('caption-01');
  }
  .body {
    @include type.type-style('body-long-02');
    white-space: pre-wrap;
  }
  .line-clamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .footer-wrapper {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: layout.$spacing-05;
  }
  .body-wrapper {
    padding: 0 layout.$spacing-05;
  }
  .tag-group {
    padding-top: layout.$spacing-05;
  }
  .tag-group:empty {
    padding-top: 0;
  }
  .heading-wrapper {
    position: relative;
    padding: layout.$spacing-05;
  }
  .heading-action-wrapper {
    position: absolute;
    z-index: 10;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>
