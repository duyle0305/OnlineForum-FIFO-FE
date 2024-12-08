import { RewardParams } from "@/hooks/query/redeem/use-my-reward";

export const redeemKeys = {
    all: ['redeems'] as const,
    documents: () => [...redeemKeys.all, 'documents'] as const,
    history: () => [...redeemKeys.all, 'history'] as const,
    myReward: () => [...redeemKeys.all, 'myReward'] as const,
    detail: (rewardId: string) => [...redeemKeys.all, 'detail', rewardId] as const,
    currentUserRewards: () => [...redeemKeys.all, 'currentUserRewards'] as const,
    download: (rewardId: string) => [...redeemKeys.all, 'download', rewardId] as const,
    listing: (params: RewardParams = {}) => [...redeemKeys.all, 'listing', params] as const,
};
