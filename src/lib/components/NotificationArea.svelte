<script lang="ts">
  import { ToastNotification } from 'carbon-components-svelte';
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  type Notification = {
    key: number;
    kind: 'error' | 'info' | 'success' | 'warning';
    title: string;
    subtitle?: string;
    caption: string;
  };

  export let notifications: Notification[] = [];
  export let timeout = 7000;
  export let lowContrast = false;

  const dispatch = createEventDispatcher();
</script>

<div class="notifications-container">
  {#each notifications as notification (notification.key)}
    <div class="toast" transition:slide={{ axis: 'x' }}>
      <ToastNotification
        {timeout}
        {lowContrast}
        {...notification}
        on:close={() => dispatch('close', notification.key)}
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
