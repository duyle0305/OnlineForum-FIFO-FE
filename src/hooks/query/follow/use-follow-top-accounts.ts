import { request } from "@/apis/request";
import { followKeys } from "@/consts/factory/follow";
import { Account } from "@/types/account"
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFollowTopAccounts = () => {
  const fetchPostTopAccounts = async () : Promise<Account[]> => {
    const {entity} = await request<Account[]>('get', `/follow/top-followed-accounts`);

    return entity;
  }

  return useQuery({
    queryKey:followKeys.topAccounts(),
    queryFn: fetchPostTopAccounts,
    placeholderData: keepPreviousData,
  })
}

export const useGetRecommendations = () => {
    const fetchPostTopAccounts = async (): Promise<{
      account: Account;
      trendScore: number;
    }[]> => {
        const { entity } = await request<
            {
                account: Account;
                trendScore: number;
            }[]
        >('get', `/account/get/recommended`);

        return entity;
    };

    return useQuery({
        queryKey: followKeys.recommendations(),
        queryFn: fetchPostTopAccounts,
        placeholderData: keepPreviousData,
    });
};