import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useToggleFollow = (options: UseMutationOptions<unknown, AxiosError<unknown>> = {}) => {
    const toggleFollow = async (id: string) => {
        return axiosInstance.post(`/follow/follow-or-unfollow`, {
            accountId: id,
        });
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['follow', 'toggle'],
        mutationFn: (payload: string) => toggleFollow(payload),
        ...options,
    });
};
