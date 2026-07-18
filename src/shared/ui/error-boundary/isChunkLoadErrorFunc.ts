const messages = [
  'Failed to fetch dynamically imported module',
  'Importing a module script failed',
  'error loading dynamically imported module',
  'Failed to load module script',
  'Loading chunk',
  'Failed to fetch',
];

/** Catch ChunkLoadError */
export const isChunkLoadErrorFunc = (error: unknown): boolean => {
  if (!error) return false;

  const err = error as unknown as { message?: string; name?: string };
  const msg = typeof err.message === 'string' ? err.message : '';
  return messages.some((m) => msg.includes(m)) || err.name === 'ChunkLoadError';
};
