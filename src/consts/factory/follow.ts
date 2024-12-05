export const followKeys = {
  all: ['follows'] as const,
  listing: (params: object = {}) => [...followKeys.all, 'listing', params] as const,
  topAccounts: () => [...followKeys.all, 'top-accounts'] as const,
  recommendations: () => [...followKeys.all, 'recommendations'] as const,
}