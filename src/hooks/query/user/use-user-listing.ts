import { request } from '@/apis/request';
import { userKeys } from '@/consts/factory/user';
import { PaginationParams } from '@/types';
import { Account, Statistic } from '@/types/account';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type UserListingParams = PaginationParams & {
  username?: string;
  email?: string;
};

type UserListingProps = {
    params: UserListingParams;
};

export const useUsersListing = ({ params }: UserListingProps) => {
    const fetchUsers = async (): Promise<Account[]> => {
        const { entity } = await request<Account[]>('get', '/account/filter', params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<Account[]>({
        queryKey: userKeys.listing(params),
        queryFn: fetchUsers,
        placeholderData: keepPreviousData,
    });
};

export const useStatistics = () => {
    const fetchStatistics = async () : Promise<Statistic> => {
        const { entity } = await request<Statistic>('get', '/statistic/get/dod-statistic');

        return entity;
    };

    return useQuery<Statistic>({
        queryKey: userKeys.statistics(),
        queryFn: fetchStatistics,
        placeholderData: keepPreviousData
    });
}
