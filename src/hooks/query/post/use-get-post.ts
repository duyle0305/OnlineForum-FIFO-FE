import axiosInstance, { request } from '@/apis/request';
import { postKeys } from '@/consts/factory/post';
import { Response } from '@/types';
import { Post } from '@/types/post/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetPost = (id: string) => {
    const fetchPost = async (): Promise<Post> => {
        const { entity } = await request<Post>('get', `/post/get/${id}`);

        return entity;
    };

    return useQuery({
        queryKey: postKeys.get(id),
        queryFn: fetchPost,
        placeholderData: keepPreviousData,
        enabled: !!id,
    });
};

