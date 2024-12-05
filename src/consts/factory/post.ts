export const postKeys = {
    all: ['posts'] as const,
    listing: (params: object = {}) => [...postKeys.all, 'listing', params] as const,
    listingAnotherAccount: (id: string) => [...postKeys.all, 'listing', 'another-account', id] as const,
    get: (id: string) => [...postKeys.all, 'get', id] as const,
    download: (id: string) => [...postKeys.all, 'download', id] as const,
    drafts: (params: object = {}) => [...postKeys.all, 'drafts', params] as const,
};

