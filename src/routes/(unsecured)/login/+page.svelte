<script lang="ts">
  import {
    Button,
    Checkbox,
    Form,
    InlineNotification,
    Loading,
    PasswordInput,
    TextInput,
    Tile
  } from 'carbon-components-svelte';
  import type { ActionData } from './$types';
  import { Layout } from '$lib/components';
  import { ArrowRight } from 'carbon-icons-svelte';

  export let form: ActionData;
  export let data: { username: string | null };

  let submitted = false;
  let username = form?.username ?? data.username ?? '';
  let password = '';
  let remember = data.username !== '';
  $: submittable = !!username && !!password;
</script>

<div class="center-container">
  <Tile>
    <Loading active={submitted} />
    <div class="tile-content">
      <Layout orientation="vertical" gap={6}>
        <h2>Log in</h2>
        {#if form?.success === false}
          <InlineNotification
            kind="error"
            title="Incorrect username or password."
            subtitle="Try again"
            hideCloseButton
          />
        {/if}
        <Form
          method="POST"
          action="?/logIn"
          on:submit={() => (submitted = true)}
        >
          <Layout orientation="vertical" gap={6}>
            <TextInput
              light
              name="username"
              labelText="Username"
              placeholder=""
              required
              bind:value={username}
            />
            <PasswordInput
              light
              name="password"
              required
              type="password"
              labelText="Password"
              placeholder=""
              bind:value={password}
            />
            <Checkbox
              name="remember"
              labelText="Remember username"
              bind:checked={remember}
              value={remember}
            />
            <div class="button-container">
              <Button
                disabled={!submittable || submitted}
                icon={ArrowRight}
                expressive
                type="submit">Log in</Button
              >
            </div>
          </Layout>
        </Form>
      </Layout>
    </div>
  </Tile>
</div>

<style lang="scss">
  @use '@carbon/layout' as layout;
  .center-container {
    display: grid;
    grid-template-rows: 80vh;
    justify-content: stretch;
    align-items: center;
    width: 100%;
  }
  .tile-content {
    padding: layout.$spacing-05;
  }
  .button-container {
    display: grid;
    grid-auto-flow: row;
    justify-content: end;
  }
</style>
