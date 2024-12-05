import axiosInstance, { request } from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type DeleteFollowPayload = {
    accountId: string;
};

export const useDeleteFollow = (
    options: UseMutationOptions<unknown, AxiosError<unknown>, DeleteFollowPayload> = {},
) => {
    const deleteFollow = async (payload: DeleteFollowPayload) => {
        return request('delete', '/follow/unfollow', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, DeleteFollowPayload>({
        mutationKey: ['follow', 'delete'],
        mutationFn: payload => deleteFollow(payload),
        ...options,
    });
};
