import axiosInstance from '@/apis/request';
import { CreateTagPayload } from '@/types/tag/tag';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateTag = (
    id: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>, CreateTagPayload> = {},
) => {
    const updateCategory = async (payload: CreateTagPayload) => {
        return axiosInstance.put(`/tag/update/${id}`, payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateTagPayload>({
        mutationKey: ['tag', 'update', id],
        mutationFn: payload => updateCategory(payload),
        ...options,
    });
};
