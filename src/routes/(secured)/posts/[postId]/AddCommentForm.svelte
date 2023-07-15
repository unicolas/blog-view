<script lang="ts">
  import { Button, Form, TextArea } from 'carbon-components-svelte';
  import { Send } from 'carbon-icons-svelte';

  export let form: {
    content?: string;
    invalidContent?: string;
    success?: boolean;
  } | null;

  let content = form?.content ?? '';
  let submitted = false;
  $: title = content.slice(0, 30);
</script>

<Form method="POST" action="?/addComment" on:submit={() => (submitted = true)}>
  <div class="textarea-wrapper">
    <TextArea
      hideLabel
      invalid={!!form?.invalidContent}
      invalidText={form?.invalidContent}
      name="content"
      labelText="Content"
      placeholder="Leave a comment?"
      required
      bind:value={content}
      maxCount={3000}
      rows={5}
    />
    <input type="hidden" aria-hidden name="title" value={title} />
    <div class="button-wrapper">
      <Button
        type="submit"
        size="small"
        kind="ghost"
        disabled={!content || submitted}
        iconDescription="Add comment"
        icon={Send}
      />
    </div>
  </div>
</Form>

<style lang="scss">
  .textarea-wrapper {
    position: relative;
  }
  .button-wrapper {
    position: absolute;
    z-index: 10;
    bottom: 0.5rem;
    right: 0.5rem;
  }
</style>
