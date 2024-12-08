import { request } from '@/apis/request';
import { notificationsKeys } from '@/consts/factory/notification';
import { Notification } from '@/types/notification';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useNotifications = () => {
    const fetchNotifications = async (): Promise<Notification[]> => {
        const { entity } = await request<Notification[]>('get', `/notification/get-all-of-current-user`);

        return entity;
    };

    return useQuery({
    queryKey: notificationsKeys.listing(),
        queryFn: fetchNotifications,
        placeholderData: keepPreviousData,
        // refetchInterval: 1000,
    });
};
