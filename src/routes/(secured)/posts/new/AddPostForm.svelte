<script lang="ts">
  import { beforeNavigate, goto } from '$app/navigation';
  import { TagInput } from '$lib/components';
  import type { NavigationTarget } from '@sveltejs/kit';
  import {
    Button,
    ButtonSet,
    Form,
    FormGroup,
    Modal,
    TextArea,
    TextInput
  } from 'carbon-components-svelte';

  export let form: {
    title?: string;
    invalidTitle?: string;
    content?: string;
    invalidContent?: string;
    success?: boolean;
    tags?: string[];
  } | null;

  let tags = form?.tags ?? [];
  let title = form?.title ?? '';
  let content = form?.content ?? '';
  let intercepted: NavigationTarget | null = null;
  $: submissible = !!title && !!content;
  $: blank = !title && !content && tags.length === 0;

  beforeNavigate(({ to, cancel }) => {
    if (blank || intercepted) {
      return;
    }
    cancel();
    if (to) {
      intercepted = to;
    }
  });
</script>

<Form method="POST" action="?/addPost">
  <FormGroup>
    <TextInput
      invalid={!!form?.invalidTitle}
      invalidText={form?.invalidTitle}
      name="title"
      labelText="Title"
      placeholder="Summarise your post in a few words"
      required
      bind:value={title}
    />
  </FormGroup>
  <FormGroup>
    <TextArea
      invalid={!!form?.invalidContent}
      invalidText={form?.invalidContent}
      name="content"
      labelText="Content"
      placeholder="Elaborate your post here"
      required
      bind:value={content}
      maxCount={5000}
      rows={7}
    />
  </FormGroup>
  <TagInput
    labelText="Tags (optional)"
    placeholder="Type to select or create a tag"
    bind:tags
    suggestions={[{ id: 'new', text: 'new' }]}
  />
  <ButtonSet>
    <Button kind="secondary">Cancel</Button>
    <Button type="submit" disabled={!submissible}>Create post</Button>
  </ButtonSet>
</Form>

<Modal
  size="sm"
  open={intercepted !== null}
  modalHeading="Leave page"
  primaryButtonText="Discard changes"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (intercepted = null)}
  on:open
  on:close={() => (intercepted = null)}
  on:submit={() => intercepted?.url && goto(intercepted.url)}
>
  <p>You have unsaved changes</p>
</Modal>
