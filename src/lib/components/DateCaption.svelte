<script lang="ts">
  export let date: string;

  $: date = new Date(date).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short'
  });
</script>

<div class="caption">{date}</div>

<style lang="scss">
  @use '@carbon/type' as type;
  .caption {
    @include type.type-style('caption-01');
  }
</style>
