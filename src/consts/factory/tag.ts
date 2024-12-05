export const tagKeys = {
  all: ['tags'] as const,
  listing: (params: object = {}) => [...tagKeys.all, 'listing', params] as const
}