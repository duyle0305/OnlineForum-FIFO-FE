import { request } from '@/apis/request';
import { bookmarkKeys } from '@/consts/factory/bookmark';
import { Post } from '@/types/post/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useBookmarkListing = () => {
    const fetchBookmarks = async (): Promise<Post[]> => {
        const { entity } = await request<Post[]>(
            'get',
            '/bookmarks/list',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<Post[]>({
        queryKey: bookmarkKeys.listing(),
        queryFn: fetchBookmarks,
        placeholderData: keepPreviousData,
    });
};
