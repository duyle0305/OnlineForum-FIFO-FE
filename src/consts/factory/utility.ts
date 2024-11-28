export const utilityKeys = {
    all: ['utility'] as const,
    categorySearch: (params: object = {}) => [...utilityKeys.all, 'category', 'search', params] as const,
};
