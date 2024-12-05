export const eventKeys = {
    all: ['events'] as const,
    listing: (params: object = {}) => [...eventKeys.all, 'listing', params] as const,
    get: (id: string) => [...eventKeys.all, 'get', id] as const,
};
