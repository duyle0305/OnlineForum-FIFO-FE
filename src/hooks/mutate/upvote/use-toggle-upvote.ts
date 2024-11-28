import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useToggleUpvote = (options: UseMutationOptions<unknown, AxiosError<unknown>> = {}) => {
    const toggleUpvote = async (id: string) => {
        return axiosInstance.post(`/upvote/add-or-delete`, {
            postId: id,
        });
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['upvote', 'toggle'],
        mutationFn: (payload: string) => toggleUpvote(payload),
        ...options,
    });
};
