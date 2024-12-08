import axiosInstance from '@/apis/request';
import { CreateCategoryPayload } from '@/types/category/category';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteTopic = ( options: UseMutationOptions<unknown, AxiosError<unknown>, string> = {}) => {
    const deleteTopic = async (id: string) => {
        return axiosInstance.delete(`/topic/delete/${id}`);
    };

    return useMutation<unknown, AxiosError<unknown>, string>({
        mutationKey: ['topic', 'delete'],
        mutationFn: id => deleteTopic(id),
        ...options,
    });
};
