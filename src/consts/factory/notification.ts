import { postKeys } from "./post";

export const notificationsKeys = {
    all: ['notifications'] as const,
    listing: (params: object = {}) => [...postKeys.all, 'listing', params] as const,
};
