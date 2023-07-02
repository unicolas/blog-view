<script lang="ts">
  import 'carbon-components-svelte/css/g90.css';
  import {
    Grid,
    Row,
    Column,
    Header,
    SkipToContent,
    HeaderUtilities,
    Content,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelLink,
    HeaderNav,
    HeaderNavItem,
    HeaderPanelDivider
  } from 'carbon-components-svelte';
  import { UserAvatarFilledAlt } from 'carbon-icons-svelte';
  import type { LayoutData } from './$types';
  import { notifications, user } from '$lib/stores';
  import { NotificationArea } from '$lib/components';

  export let data: LayoutData;

  user.init({ name: data.username, id: data.id });
  const closeNotification = (e: CustomEvent<number>) =>
    notifications.remove(e.detail);
  let isOpen = false;
</script>

<Header platformName="Pilot">
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href="/" text="Home" />
    <HeaderNavItem href="/posts" text="Posts" />
    <HeaderNavItem href="/posts/new" text="New" />
  </HeaderNav>
  <HeaderUtilities>
    <HeaderAction
      bind:isOpen
      icon={UserAvatarFilledAlt}
      closeIcon={UserAvatarFilledAlt}
    >
      <HeaderPanelLinks>
        <div data-sveltekit-preload-data="off">
          <HeaderPanelDivider>{$user.name}</HeaderPanelDivider>
          <HeaderPanelLink href="/logout">Log out</HeaderPanelLink>
        </div>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>
<NotificationArea notifications={$notifications} on:close={closeNotification} />
<Content>
  <Grid noGutter>
    <Row>
      <Column sm={0} md={1} lg={4} />
      <Column sm={4} md={6} lg={8}>
        <slot />
      </Column>
      <Column sm={0} md={1} lg={4} />
    </Row>
  </Grid>
</Content>
