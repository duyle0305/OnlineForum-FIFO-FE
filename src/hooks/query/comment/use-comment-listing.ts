import { request } from '@/apis/request';
import { commentKeys } from '@/consts/factory/comment';
import { TComment } from '@/types/comment/comment';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useCommentListing = () => {
    const fetchComments = async (): Promise<TComment[]> => {
        const { entity } = await request<TComment[]>('get', `/comment/getall`);

        return entity;
    };

    return useQuery<TComment[]>({
        queryKey: commentKeys.listing(),
        queryFn: fetchComments,
        placeholderData: keepPreviousData,
    });
};
