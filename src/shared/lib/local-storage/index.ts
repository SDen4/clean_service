import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  // storage прилетит только из других tabs — на всякий случай слушаем
  window.addEventListener('storage', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

function emit() {
  listeners.forEach((l) => l());
}

export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  emit(); // уведомляем всех подписчиков в текущем tab
}

export function useLocalStorage(key: string, fallback = '') {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? fallback,
  );
}
