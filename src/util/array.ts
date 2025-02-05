export function chunkArray<K>(array: K[], size: number): K[][] {
  const chunks: K[][] = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}
