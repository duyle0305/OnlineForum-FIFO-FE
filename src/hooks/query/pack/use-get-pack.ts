import { request } from '@/apis/request';
import { packKeys } from '@/consts/factory/pack';
import { Pack } from '@/types/pack/pack';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetPack = (id: string) => {
    const fetchPack = async (): Promise<Pack> => {
        const { entity } = await request<Pack>('get', `/monkey-coin-pack/get-by-id/${id}`);

        return entity;
    };

    return useQuery({
        queryKey: packKeys.get(id),
        queryFn: fetchPack,
        placeholderData: keepPreviousData,
        enabled: !!id,
    });
};
