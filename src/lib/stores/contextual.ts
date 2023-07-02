import { getContext, hasContext, setContext } from 'svelte';
import type { Readable } from 'svelte/store';

export function contextual<S extends Readable<T>, T>(store: S, key: string): S {
  return hasContext(key) ? getContext<S>(key) : setContext(key, store);
}
