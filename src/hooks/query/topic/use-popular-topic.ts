import axiosInstance, { request } from '@/apis/request';
import { topicKeys } from '@/consts/factory/topic';
import { PaginationParams, Response } from '@/types';
import { Topic } from '@/types/topic/topic';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const usePopularTopics = () => {
    const fetchTopics = async (): Promise<Topic[]> => {
        const { entity } = await request<Topic[]>(
            'get',
            '/topic/popular',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<Topic[]>({
        queryKey: topicKeys.popular(),
        queryFn: fetchTopics,
        placeholderData: keepPreviousData,
    });
};
