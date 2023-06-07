<script lang="ts">
  import {
    Button,
    Column,
    FluidForm,
    Grid,
    InlineNotification,
    PasswordInput,
    Row,
    TextInput
  } from 'carbon-components-svelte';
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<div class="center-container">
  <div class="login-container">
    <Grid noGutter>
      <Row padding>
        <Column>
          <Grid condensed>
            <Row>
              <Column>
                <h2>Log in</h2>
              </Column>
            </Row>
            {#if form?.success === false}
              <Row>
                <Column>
                  <InlineNotification
                    kind="error"
                    title="Incorrect username or password."
                    subtitle="Try again"
                    hideCloseButton
                  />
                </Column>
              </Row>
            {/if}
          </Grid>
        </Column>
      </Row>
      <Row>
        <Column>
          <FluidForm>
            <form method="POST">
              <TextInput
                name="username"
                labelText="User name"
                placeholder="username"
                required
                value={form?.username ?? ''}
              />
              <PasswordInput
                name="password"
                required
                type="password"
                labelText="Password"
                placeholder="password"
              />
              <Button
                class="float--right width--full"
                expressive
                size="lg"
                type="submit"
              >
                Log in
              </Button>
            </form>
          </FluidForm>
        </Column>
      </Row>
    </Grid>
  </div>
</div>

<style lang="scss">
  @use '@carbon/themes/scss/themes' as *;
  @use '@carbon/themes' as * with (
    $theme: $g90
  );
  :global(.float--right) {
    float: right;
  }
  :global(.width--full) {
    width: 100%;
  }
  .login-container {
    background: $layer-01;
    display: block;
    width: 100%;
  }
  .center-container {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
