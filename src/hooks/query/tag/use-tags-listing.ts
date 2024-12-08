import axiosInstance, { request } from '@/apis/request';
import { tagKeys } from '@/consts/factory/tag';
import { PaginationParams, Response } from '@/types';
import { Tag } from '@/types/tag/tag';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type TagListingParams = PaginationParams;

type TagListingProps = {
    params: TagListingParams;
};

export const useTagsListing = ({ params }: TagListingProps) => {
    const fetchTags = async (): Promise<Tag[]> => {
        const { entity } = await request<Tag[]>('get', '/tag/getall', params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<Tag[]>({
        queryKey: tagKeys.listing(params),
        queryFn: fetchTags,
        placeholderData: keepPreviousData,
    });
};

export const useTag = (id: string) => {
    const fetchTag = async (): Promise<Tag> => {
        const { entity } = await request<Tag>('get', `/tag/get/${id}`);

        return entity;
    };

    return useQuery<Tag>({
        queryKey: tagKeys.get(id),
        queryFn: fetchTag,
        placeholderData: keepPreviousData,
    });
}
