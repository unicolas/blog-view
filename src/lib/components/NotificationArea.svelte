<script lang="ts">
  import {
    notificationsStore,
    removeNotification
  } from '$lib/stores/notification';
  import { ToastNotification } from 'carbon-components-svelte';
  import { slide } from 'svelte/transition';

  export let timeout = 7000;

  const notifications = notificationsStore();
  const close = (key: number) => removeNotification(notifications, key);
</script>

<div class="notifications-container">
  {#each $notifications as { key, kind, title, subtitle, caption } (key)}
    <div class="toast" transition:slide={{ axis: 'x' }}>
      <ToastNotification
        {timeout}
        {kind}
        {title}
        {subtitle}
        {caption}
        on:close={() => close(key)}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  @use '@carbon/layout' as *;

  .notifications-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    margin-top: 3rem;
    margin-right: $spacing-03;
    justify-content: center;
    flex-direction: column;
    align-items: self-end;
    z-index: 1000;
    pointer-events: none;
  }
  .toast {
    pointer-events: all;
  }
</style>
