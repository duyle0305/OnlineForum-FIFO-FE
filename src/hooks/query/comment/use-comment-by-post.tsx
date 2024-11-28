import { request } from '@/apis/request';
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
    });
};
