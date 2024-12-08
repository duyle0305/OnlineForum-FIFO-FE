import axiosInstance from '@/apis/request';
import { CreateCategoryPayload } from '@/types/category/category';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateCategory = (
    options: UseMutationOptions<unknown, AxiosError<unknown>, CreateCategoryPayload> = {},
) => {
    const createCategory = async (payload: CreateCategoryPayload) => {
        return axiosInstance.post('/category/create', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateCategoryPayload>({
        mutationKey: ['category', 'create'],
        mutationFn: payload => createCategory(payload),
        ...options,
    });
};
