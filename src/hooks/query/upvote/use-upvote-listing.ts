import { request } from '@/apis/request';
import { upvoteKeys } from '@/consts/factory/upvote';
import { Upvote } from '@/types/upvote/upvote';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useUpvoteListing = () => {
    const fetchUpvotes = async () => {
        const { entity } = await request<Upvote[]>(
            'get',
            '/upvote/getall',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

     return useQuery<Upvote[]>({
         queryKey: upvoteKeys.listing(),
         queryFn: fetchUpvotes,
         placeholderData: keepPreviousData,
        //  refetchInterval: 1000,
     });
};