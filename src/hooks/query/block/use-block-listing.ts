import { request } from '@/apis/request';
import { blockKeys } from '@/consts/factory/block';
import { Account } from '@/types/account';
import { useQuery } from '@tanstack/react-query';

export const useBlocksListing = () => {
    const fetchBlocks = async (): Promise<Account[]> => {
        const { entity } = await request<Account[]>(
            'get',
            '/block-user/get-list-user-block',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<Account[]>({
        queryKey: blockKeys.listing(),
        queryFn: fetchBlocks,
        placeholderData: [],
    });
};
