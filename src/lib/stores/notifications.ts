import { writable, type Writable } from 'svelte/store';
import { contextual } from './contextual';

type Notification = {
  key: number;
  kind: 'error' | 'info' | 'success' | 'warning';
  title: string;
  subtitle?: string;
  caption: string;
};

type NotificationsStore = {
  subscribe: Writable<Notification[]>['subscribe'];
  add: (notification: Omit<Notification, 'key' | 'caption'>) => void;
  remove: (key: number) => void;
};

function createStore(): NotificationsStore {
  const { subscribe, update } = writable<Notification[]>([]);

  return {
    subscribe,
    add: (notification: Omit<Notification, 'key' | 'caption'>) =>
      update((notifications) => {
        const key = Math.max(0, ...notifications.map((each) => each.key)) + 1;
        const caption = new Date().toLocaleString(undefined, {
          dateStyle: 'short',
          timeStyle: 'short'
        });
        const subtitle = notification.subtitle || '';
        return [{ ...notification, key, caption, subtitle }, ...notifications];
      }),
    remove: (key: number) =>
      update((notifications) =>
        notifications.filter((each) => each.key !== key)
      )
  };
}

export const notifications = {
  subscribe: (run, invalidate) => {
    const { subscribe, add, remove } = contextual(
      createStore(),
      'notifications'
    );
    notifications.add = add;
    notifications.remove = remove;
    return subscribe(run, invalidate);
  }
} as NotificationsStore;
