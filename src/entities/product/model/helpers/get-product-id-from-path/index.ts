/** Получить id товара из пути */
export const getProductIdFromPath = (path?: string) => {
  if (!path) return '';

  return path.split('/').at(-1);
};
