import axiosInstance from '@/apis/request';
import { CreateRedeemPayload, CreateRewardPayload } from '@/types/redeem/redeem';
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

export const useCreateReward = (options: UseMutationOptions<unknown, AxiosError<unknown>, CreateRewardPayload> = {}) => {
    const createReward = async (payload: CreateRewardPayload) => {
        return axiosInstance.post('/reward/create-reward', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateRewardPayload>({
        mutationKey: ['reward', 'create'],
        mutationFn: payload => createReward(payload),
        ...options,
    });
};

