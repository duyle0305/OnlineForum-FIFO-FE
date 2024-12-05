import axiosInstance from '@/apis/request';
import { CreateRedeemPayload } from '@/types/redeem/redeem';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateRedeem = (
    options: UseMutationOptions<unknown, AxiosError<unknown>, CreateRedeemPayload> = {},
) => {
    const createRedeem = async (payload: CreateRedeemPayload) => {
        return axiosInstance.post('/redeem/create', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateRedeemPayload>({
        mutationKey: ['redeem', 'create'],
        mutationFn: payload => createRedeem(payload),
        ...options,
    });
};
