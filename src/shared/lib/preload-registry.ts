import type { TPagePreloader } from '../model';

const preloaders = new Map<string, TPagePreloader>();

export function registerPreloader(
  key: string,
  preloader: TPagePreloader,
): void {
  preloaders.set(key, preloader);
}

export function getPreloader(key: string): TPagePreloader {
  const preloader = preloaders.get(key);

  if (!preloader) {
    throw new Error(`Preloader for key "${key}" is not registered.`);
  }

  return preloader;
}
