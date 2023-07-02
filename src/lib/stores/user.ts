import { writable, type Writable } from 'svelte/store';
import { contextual } from './contextual';

type User = { name: string; id: string };

type UserStore = {
  subscribe: Writable<User>['subscribe'];
  init: (value: User) => void;
};

function createStore(): UserStore {
  const { subscribe, set } = writable<User>({ name: '', id: '' });

  return {
    subscribe,
    init: (value: User) => set(value)
  };
}

export const user = {
  subscribe: (run, invalidate) => {
    const { subscribe, init } = contextual(createStore(), 'user');
    user.init = init;
    return subscribe(run, invalidate);
  }
} as UserStore;
