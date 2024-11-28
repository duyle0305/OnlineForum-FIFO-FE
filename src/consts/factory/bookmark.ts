export const bookmarkKeys = {
    all: ['bookmarks'],
    listing: (params = {}) => [...bookmarkKeys.all, 'listing', params],
};
