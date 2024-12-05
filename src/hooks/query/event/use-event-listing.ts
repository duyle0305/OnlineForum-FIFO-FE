import type { Event } from '@/types/event';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { request } from '@/apis/request';
import { eventKeys } from '@/consts/factory/event';

export const useEventListing = () => {
    const fetchEvents = async () => {
        const { entity } = await request<Event[]>(
            'get',
            '/event/get-all',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<Event[]>({
        queryKey: eventKeys.listing(),
        queryFn: fetchEvents,
        placeholderData: keepPreviousData,
    });
};
