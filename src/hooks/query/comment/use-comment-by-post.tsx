import { request } from '@/apis/request';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { commentKeys } from '@/consts/factory/comment';
import { TComment } from '@/types/comment/comment';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useCommentByPost = (postId: string, isShown: boolean) => {
    const fetchCommentByPost = async (): Promise<TComment[]> => {
        const { entity } = await request<TComment[]>('get', `/comment/getall/by-post/${postId}`);

        return entity;
    };

    return useQuery<TComment[]>({
        queryKey: commentKeys.byPost(postId),
        queryFn: fetchCommentByPost,
        placeholderData: keepPreviousData,
        enabled: !!postId && isShown,
        // refetchInterval: 1000,
    });
};

export const useGetAllComments = () => {
    const fetchCommentByPost = async (): Promise<TComment[]> => {
        const { entity } = await request<TComment[]>('get', `/comment/getall`, {
                page: DEFAULT_PAGE,
                pageSize: DEFAULT_PAGE_SIZE
        });

        return entity;
    };

    return useQuery<TComment[]>({
        queryKey: commentKeys.listing(),
        queryFn: fetchCommentByPost,
        placeholderData: keepPreviousData,
        // refetchInterval: 1000,
    });
};
