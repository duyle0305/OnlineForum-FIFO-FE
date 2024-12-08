import axiosInstance from '@/apis/request';
import { CreateCategoryPayload } from '@/types/category/category';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteCategory = ( options: UseMutationOptions<unknown, AxiosError<unknown>, string> = {}) => {
    const deleteCategory = async (id: string) => {
        return axiosInstance.delete(`/category/delete/${id}`);
    };

    return useMutation<unknown, AxiosError<unknown>, string>({
        mutationKey: ['category', 'delete'],
        mutationFn: id => deleteCategory(id),
        ...options,
    });
};
