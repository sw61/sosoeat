export const locationKeys = {
  all: ['location'] as const,
  search: (query: string) => [...locationKeys.all, 'search', query] as const,
};
