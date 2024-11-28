export const blockKeys = {
    all: ['blocks'],
    listing: (params = {}) => [...blockKeys.all, 'listing', params],
};
