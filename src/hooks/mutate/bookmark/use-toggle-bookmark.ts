import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type BookmarkTogglePayload = {
    postId: string;
};

export const useToggleBookmark = (
    options: UseMutationOptions<unknown, AxiosError<unknown>, BookmarkTogglePayload> = {},
) => {
    const toggleBookmark = async (payload: BookmarkTogglePayload) => {
        return axiosInstance.post('/bookmarks/add-or-remove', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, BookmarkTogglePayload>({
        mutationKey: ['bookmark', 'toggle'],
        mutationFn: payload => toggleBookmark(payload),
        ...options,
    });
};
