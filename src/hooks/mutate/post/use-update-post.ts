import axiosInstance from '@/apis/request';
import { UpdatePostPayload } from '@/types/post/post';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdatePost = (postId: string, options: UseMutationOptions<unknown, AxiosError<unknown>, UpdatePostPayload> = {}) => {
      const updatePost = async (payload: UpdatePostPayload) => {
        const { data } = await axiosInstance.put(`/post/update/${postId}`, payload);
    };

    return useMutation<unknown, AxiosError<unknown>, UpdatePostPayload>({
        mutationKey: ['post', 'update', postId],
        mutationFn: (payload) => updatePost(payload),
        ...options,
    });
};

export const useUpdatePostDraft = (
    postId: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>, UpdatePostPayload> = {},
) => {
    const updatePost = async (payload: UpdatePostPayload) => {
        const { data } = await axiosInstance.put(`/post/update/draft/${postId}`, payload);
    };

    return useMutation<unknown, AxiosError<unknown>, UpdatePostPayload>({
        mutationKey: ['post', 'update', 'draft', postId],
        mutationFn: payload => updatePost(payload),
        ...options,
    });
};

export const useUpdateDraftToPost = (
    postId: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>> = {},
) => {
    const updatePost = async () => {
        const { data } = await axiosInstance.put(`/post/update/draft/to-post/${postId}`);
    };

    return useMutation<unknown, AxiosError<unknown>>({
        mutationKey: ['post', 'update', 'draft', 'to-post'],
        mutationFn: updatePost,
        ...options,
    });
};