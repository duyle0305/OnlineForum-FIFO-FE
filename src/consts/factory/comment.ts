export const commentKeys = {
    all: ['comments'] as const,
    byPost: (postId: string) => [...commentKeys.all, 'byPost', postId] as const,
    listing: () => [...commentKeys.all, 'listing'] as const,
};
