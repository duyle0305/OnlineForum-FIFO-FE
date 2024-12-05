
export const walletKeys = {
    all: ['upvote'] as const,
    listing: (params: object = {}) => [...walletKeys.all, 'listing', params] as const,
    getByAccount: (accountId: string) => [...walletKeys.all, 'getByAccount', accountId] as const,
};
