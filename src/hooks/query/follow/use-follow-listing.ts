import { request } from "@/apis/request";
import { followKeys } from "@/consts/factory/follow";
import { Account } from "@/types/account"
import { Follow } from "@/types/follow";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFollowTopAccounts = () => {
  const fetchPostTopAccounts = async () : Promise<Account[]> => {
    const {entity} = await request<Account[]>('get', `/follow/get-follows`);

    return entity;
  }

  return useQuery({
    queryKey:followKeys.topAccounts(),
    queryFn: fetchPostTopAccounts,
    placeholderData: keepPreviousData,
  })
}

export const useGetFollows = () => {
  const fetchFollows = async (): Promise<Follow[]> => {
      const { entity } = await request<Follow[]>('get', `/follow/get-follows`);

      return entity;
  };

  return useQuery({
      queryKey: followKeys.listing(),
      queryFn: fetchFollows,
      placeholderData: keepPreviousData,
  }); 
}