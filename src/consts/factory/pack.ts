export const packKeys = {
    all: ['packs'],
    listing: (params = {}) => [...packKeys.all, 'listing', params],
    get: (id: string) => [...packKeys.all, 'get', id] as const,
};
