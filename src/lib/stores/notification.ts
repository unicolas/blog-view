import { getContext, hasContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

type Notification = {
  key: number;
  kind: 'error' | 'info' | 'success' | 'warning';
  title: string;
  subtitle?: string;
  caption: string;
};

export const notificationsStore = () => {
  if (hasContext('notifications')) {
    return getContext<Writable<Notification[]>>('notifications');
  }
  const notifications = writable<Notification[]>([]);
  setContext('notifications', notifications);
  return notifications;
};

export const addNotification = (
  store: Writable<Notification[]>,
  notification: Omit<Notification, 'key' | 'caption'>
) => {
  store.update((notifications) => {
    const key = Math.max(0, ...notifications.map((each) => each.key)) + 1;
    const caption = new Date().toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short'
    });
    const subtitle = notification.subtitle || '';
    return [{ ...notification, key, caption, subtitle }, ...notifications];
  });
};

export const removeNotification = (
  store: Writable<Notification[]>,
  key: number
) => {
  store.update((notifications) =>
    notifications.filter((each) => each.key !== key)
  );
};
