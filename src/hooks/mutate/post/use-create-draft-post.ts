import axiosInstance from '@/apis/request';
import { CreatePostPayload } from '@/types/post/post';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateDraftPost = (options: UseMutationOptions<unknown, AxiosError<unknown>, CreatePostPayload> = {}) => {
    const createPostDraft = async (payload: CreatePostPayload) => {
        const { data } = await axiosInstance.post('/post/create/draft', payload);

        return data;
    };

    return useMutation<unknown, AxiosError<unknown>, CreatePostPayload>({
        mutationKey: ['post', 'create', 'draft'],
        mutationFn: payload => createPostDraft(payload),
        ...options,
    });
};
