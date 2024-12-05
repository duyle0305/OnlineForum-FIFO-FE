import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type BlockTogglePayload = {
    accountID: string;
};

export const useToggleBlock = (options: UseMutationOptions<unknown, AxiosError<unknown>, BlockTogglePayload> = {}) => {
    const toggleBlock = async (payload: BlockTogglePayload) => {
        return axiosInstance.post('/block-user/block-or-unblock', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, BlockTogglePayload>({
        mutationKey: ['block', 'toggle'],
        mutationFn: payload => toggleBlock(payload),
        ...options,
    });
};
