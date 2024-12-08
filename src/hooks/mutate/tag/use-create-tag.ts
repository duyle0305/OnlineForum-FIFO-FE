import axiosInstance from '@/apis/request';
import { CreateTagPayload } from '@/types/tag/tag';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateTag = (options: UseMutationOptions<unknown, AxiosError<unknown>, CreateTagPayload> = {}) => {
    const createTag = async (payload: CreateTagPayload) => {
        return axiosInstance.post('/tag/create', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateTagPayload>({
        mutationKey: ['tag', 'create'],
        mutationFn: payload => createTag(payload),
        ...options,
    });
};
