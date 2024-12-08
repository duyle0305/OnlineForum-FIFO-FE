import axiosInstance from '@/apis/request';
import { CreateCategoryPayload } from '@/types/category/category';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateCategory = (
    id: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>, CreateCategoryPayload> = {},
) => {
    const updateCategory = async (payload: CreateCategoryPayload) => {
        return axiosInstance.put(`/category/update/${id}`, payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateCategoryPayload>({
        mutationKey: ['category', 'update', id],
        mutationFn: payload => updateCategory(payload),
        ...options,
    });
};
