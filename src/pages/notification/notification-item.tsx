import { StarIcon } from "@/utils/asset";
import { css } from "@emotion/react";
import { Avatar, Card, Flex, Typography } from "antd";
import { FC } from "react";

const NotificationItem: FC = () => {
    return <Card css={styles}>
        <Flex vertical gap={6}>
            <Flex align="center" gap={10}>
                <div>
                    <img src={StarIcon}></img>
                </div>
                <div>
                    <Avatar />
                </div>
            </Flex>
            <div>
                <Typography.Text className="notification-title">NOTIFICATION TITLE</Typography.Text>
            </div>
            <div>
                <Typography.Text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Typography.Text>
            </div>
        </Flex>
    </Card>
}

const styles = css(`
    border-radius: 0;

    .notification-title {
        font-weight: 600;
        font-size: 16px;
    }

`)
export default NotificationItem;