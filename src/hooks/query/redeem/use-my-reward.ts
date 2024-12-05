import { request } from "@/apis/request";
import { redeemKeys } from "@/consts/factory/redeem";
import { RedeemDocument } from "@/types/redeem/redeem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useMyReward = () => {
  const fetchMyReward = async () => {
    const { entity } = await request<{reward: RedeemDocument[]}>('get', '/redeem/my-reward');

    return entity;
  }

  return useQuery<{reward: RedeemDocument[]}>({
    queryKey: redeemKeys.myReward(),
    queryFn: fetchMyReward,
    placeholderData: keepPreviousData,
  });
}