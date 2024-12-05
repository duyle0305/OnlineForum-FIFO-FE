import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeletePost = (postId: string, options: UseMutationOptions<unknown, AxiosError<unknown>> = {}) => {
    const deletePost = async () => {
        const { data } = await axiosInstance.put(`/post/update/${postId}/status/hidden`);
    };

    return useMutation<unknown, AxiosError<unknown>>({
        mutationKey: ['post', 'delete', postId],
        mutationFn: deletePost,
        ...options,
    });
};

export const useDeleteDraftPost = (options: UseMutationOptions<unknown, AxiosError<unknown>> = {}) => {
    const deletePost = async (postIds: string[]) => {
        const { data } = await axiosInstance.delete(`/post/delete/draft`, { data: postIds });
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['post', 'delete', 'draft'],
        mutationFn: (payload: string[]) => deletePost(payload),
        ...options,
    });
};
