<script lang="ts">
  import {
    Button,
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

  let submitted = false;
  let username = form?.username ?? '';
  let password = '';
  let email = form?.email ?? '';
  $: submittable = validUsername && validEmail && validPassword;
  $: validUsername = username.match(/^[\w-]{4,}$/);
  $: validEmail = email.match(/^.{2,}@.{2,}\..{2,}$/);
  $: validPassword = password.match(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x21-\x7E]{6,}$/
  );
  const usernameHelpText =
    'Your username must be at least 4 characters long and contain letters,\
     numbers, \u{201C}_\u{201D} or \u{201C}-\u{201D}.';
  const passwordHelpText =
    'Your password must be at least 6 characters long and contain at least\
     one letter, one number and one special character.';
</script>

<div class="center-container">
  <Tile>
    <Loading active={submitted} />
    <div class="tile-content">
      <Layout orientation="vertical" gap={6}>
        <h2>Sign up</h2>
        {#if form?.success === false}
          <InlineNotification
            kind="error"
            title="There was a problem creating you user."
            subtitle="Try again"
            hideCloseButton
          />
        {/if}
        <Form
          method="POST"
          action="?/signUp"
          on:submit={() => (submitted = true)}
        >
          <Layout orientation="vertical" gap={6}>
            <TextInput
              light
              name="username"
              labelText="Username"
              placeholder="e.g. user_89"
              required
              helperText={usernameHelpText}
              invalid={!!username && !validUsername}
              invalidText={usernameHelpText}
              bind:value={username}
            />
            <TextInput
              light
              name="email"
              labelText="Email"
              placeholder="e.g. user@mail.com"
              required
              invalid={!!email && !validEmail}
              invalidText="Please enter a valid email"
              bind:value={email}
            />
            <PasswordInput
              light
              name="password"
              required
              type="password"
              labelText="Password"
              placeholder=""
              helperText={passwordHelpText}
              invalid={!!password && !validPassword}
              invalidText={passwordHelpText}
              bind:value={password}
            />
            <div class="button-container">
              <Button
                disabled={!submittable || submitted}
                icon={ArrowRight}
                expressive
                type="submit">Sign up</Button
              >
              <Button href="login" kind="ghost">Have an account? Log in</Button>
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
    display: inline-flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
</style>
