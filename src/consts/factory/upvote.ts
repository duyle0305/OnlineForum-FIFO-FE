export const upvoteKeys = {
    all: ['upvotes'] as const,
    listing: (params: object = {}) => [...upvoteKeys.all, 'listing', params] as const,
};
