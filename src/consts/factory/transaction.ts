export const transactionKeys = {
  all: ['transactions'] as const,
  currentAccount: (params: object = {}) => [...transactionKeys.all, 'currentAccount', params] as const,
}