<script lang="ts">
  export let orientation: 'vertical' | 'horizontal' = 'vertical';
  export let gap: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 = 2;
</script>

<div
  {...$$restProps}
  class="layout-wrapper-{orientation} layout-wrapper-gap-{gap}"
>
  <slot />
</div>

<style lang="scss">
  @use '@carbon/layout' as layout;

  .layout-wrapper-vertical {
    display: grid;
    grid-auto-flow: row;
  }
  .layout-wrapper-horizontal {
    display: grid;
    grid-auto-flow: column;
  }

  $gap: 1;
  @each $spacing, $value in layout.$spacing {
    .layout-wrapper-gap-#{$gap} {
      gap: $value;
    }
    $gap: $gap + 1;
  }
</style>
