import { request } from '@/apis/request';
import { packKeys } from '@/consts/factory/pack';
import { Pack } from '@/types/pack/pack';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const usePacksListing = () => {
    const fetchPacks = async (): Promise<Pack[]> => {
        const { entity } = await request<Pack[]>(
            'get',
            '/monkey-coin-pack/get-all',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<Pack[]>({
        queryKey: packKeys.listing(),
        queryFn: fetchPacks,
        placeholderData: keepPreviousData,
    });
};
