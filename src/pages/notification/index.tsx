import { Flex } from "antd";
import { FC } from "react";
import NotificationItem from "./notification-item";

const NotificationPage: FC = () => {
    return <div>
        <Flex vertical align="stretch" gap={20}>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
        </Flex>
    </div>
}

export default NotificationPage;