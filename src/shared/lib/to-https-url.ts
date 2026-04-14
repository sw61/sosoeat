export function toHttpsUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http://') ? url.replace('http://', 'https://') : url;
}
