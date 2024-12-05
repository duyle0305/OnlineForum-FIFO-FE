import axiosInstance, { request } from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateFollow = (options: UseMutationOptions<unknown, AxiosError<unknown>, string> = {}) => {
    const createFollow = async (payload: string) => {
        return request('post', '/follow/create', payload,{
          headers: {
            'Content-Type': 'application/json',
          }
        });
    };

    return useMutation<unknown, AxiosError<unknown>, string>({
        mutationKey: ['follow', 'create'],
        mutationFn: payload => createFollow(payload),
        ...options,
    });
};
