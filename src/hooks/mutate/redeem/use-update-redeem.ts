import axiosInstance from '@/apis/request';
import { CreateRewardPayload } from '@/types/redeem/redeem';
import { CreateTagPayload } from '@/types/tag/tag';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateReward = (
    id: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>, CreateRewardPayload> = {},
) => {
    const updateReward = async (payload: CreateRewardPayload) => {
        return axiosInstance.put(`/reward/update/${id}`, payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateRewardPayload>({
        mutationKey: ['reward', 'update', id],
        mutationFn: payload => updateReward(payload),
        ...options,
    });
};
