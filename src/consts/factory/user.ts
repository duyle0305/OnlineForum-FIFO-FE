export const userKeys = {
  all: ['users'] as const,
  listing: (params: object = {}) => [...userKeys.all, 'listing', params] as const,
  statistics: (params: object = {}) => [...userKeys.all, 'statistics', params] as const,
}