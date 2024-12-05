import axiosInstance, { request } from '@/apis/request';
import { eventKeys } from '@/consts/factory/event';
import { postKeys } from '@/consts/factory/post';
import { Response } from '@/types';
import { Event } from '@/types/event';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetEvent = (id: string) => {
    const fetchEvent = async (): Promise<Event> => {
        const { entity } = await request<Event>('get', `/event/get-by-id/${id}`);

        return entity;
    };

    return useQuery({
        queryKey: eventKeys.get(id),
        queryFn: fetchEvent,
        placeholderData: keepPreviousData,
        enabled: !!id,
    });
};
