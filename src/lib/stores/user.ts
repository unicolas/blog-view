import { getContext, hasContext, setContext } from 'svelte';
import { readable, type Readable } from 'svelte/store';

type User = { name: string; id: string };

export const userStore = (value?: User) => {
  if (hasContext('user')) {
    return getContext<Readable<User>>('user');
  }
  const user = readable<User>(value);
  setContext('user', user);
  return user;
};
