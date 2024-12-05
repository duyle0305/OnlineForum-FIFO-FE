import axiosInstance, { request } from '@/apis/request';
import { postKeys } from '@/consts/factory/post';
import { PaginationParams, Response } from '@/types';
import { Post, PostStatus } from '@/types/post/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type PostListingParams = PaginationParams & {
    topicId?: string;
    tagId?: string;
    statuses?: PostStatus[];
    accountId?: string;
    categoryId?: string;
    isFolloweeIncluded?: boolean;
};

type PostListingProps = {
    params: PostListingParams;
};

export const usePostsListing = ({ params }: PostListingProps) => {
    const fetchPosts = async (): Promise<Post[]> => {
        const { entity } = await request<Post[]>('get', '/post/getall', params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<Post[]>({
        queryKey: postKeys.listing(params),
        queryFn: fetchPosts,
        placeholderData: keepPreviousData,
        refetchInterval: 1000,
    });
};

export const useDraftsListing = ({ params }: PostListingProps) => {
    const fetchPosts = async (): Promise<Post[]> => {
        const { entity } = await request<Post[]>('get', '/post/getall/draft/by-current-user', params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<Post[]>({
        queryKey: postKeys.drafts(params),
        queryFn: fetchPosts,
        placeholderData: keepPreviousData,
    });
};

export const usePostsAnotherAccountListing = (id: string) => {
    const fetchPosts = async (): Promise<Post[]> => {
        const { entity } = await request<Post[]>('get', `/post/getall/other-user/${id}`, {}, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<Post[]>({
        queryKey: postKeys.listingAnotherAccount(id),
        queryFn: fetchPosts,
        placeholderData: keepPreviousData,
        enabled: !!id,
    });
};