import { request } from '@/apis/request';
import { redeemKeys } from '@/consts/factory/redeem';
import { PaginationParams } from '@/types';
import { RedeemDocument } from '@/types/redeem/redeem';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type RewardParams = {
    params?: PaginationParams;
};

export const useMyReward = () => {
    const fetchMyReward = async () => {
        const { entity } = await request<{ reward: RedeemDocument[] }>('get', '/redeem/my-reward');

        return entity;
    };

    return useQuery<{ reward: RedeemDocument[] }>({
        queryKey: redeemKeys.myReward(),
        queryFn: fetchMyReward,
        placeholderData: keepPreviousData,
    });
};

export const useGetRewards = (params?: RewardParams) => {
    const fetchRewards = async () => {
        const { entity } = await request<RedeemDocument[]>('get', '/reward/getAll/admin', params);

        return entity;
    };

    return useQuery<RedeemDocument[]>({
        queryKey: redeemKeys.listing(params ?? {}),
        queryFn: fetchRewards,
        placeholderData: keepPreviousData,
    });
};