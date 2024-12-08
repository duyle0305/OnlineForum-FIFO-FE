import axiosInstance from '@/apis/request';
import { CreateCategoryPayload } from '@/types/category/category';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteRedeem = (options: UseMutationOptions<unknown, AxiosError<unknown>, string> = {}) => {
    const deleteRedeem = async (id: string) => {
        return axiosInstance.delete(`/reward/delete/${id}`);
    };

    return useMutation<unknown, AxiosError<unknown>, string>({
        mutationKey: ['reward', 'delete'],
        mutationFn: id => deleteRedeem(id),
        ...options,
    });
};
