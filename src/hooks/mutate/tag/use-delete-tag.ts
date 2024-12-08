import axiosInstance from '@/apis/request';
import { CreateCategoryPayload } from '@/types/category/category';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteTag = ( options: UseMutationOptions<unknown, AxiosError<unknown>, string> = {}) => {
    const deleteTag = async (id: string) => {
        return axiosInstance.delete(`/tag/delete/${id}`);
    };

    return useMutation<unknown, AxiosError<unknown>, string>({
        mutationKey: ['tag', 'delete'],
        mutationFn: id => deleteTag(id),
        ...options,
    });
};
