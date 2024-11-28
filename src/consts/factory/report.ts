export const reportKeys = {
  all: ['reports'] as const,
  reportPostListing: (params: object = {}) => [...reportKeys.all, 'posts', 'listing', params] as const,
  reportAccountListing: (params: object = {}) => [...reportKeys.all, 'accounts', 'listing', params] as const,
}
