import { Flex } from 'antd';
import { FC } from 'react';
import NotificationItem from './notification-item';
import { useNotifications } from '@/hooks/query/notification/use-notifications';

const NotificationPage: FC = () => {
    const { data: notifications } = useNotifications();
    return (
        <div>
            <Flex vertical align="stretch" gap={20}>
                {notifications?.map(notification => (
                    <NotificationItem notification={notification} />
                ))}
            </Flex>
        </div>
    );
};

export default NotificationPage;
