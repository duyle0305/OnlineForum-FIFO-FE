import { FULL_TIME_FORMAT } from '@/consts/common';
import { formatSignedNumber } from '@/utils/number';
import { css } from '@emotion/react';
import { Avatar, Flex, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { title } from 'process';
import { FC } from 'react';

interface TransactionItemProps {
    image: string;
    title: string;
    description: string;
    amount: number;
    createdDate: string;
}

const TransactionItem: FC<TransactionItemProps> = ({ image, title, description, amount, createdDate }) => {
    return (
        <Flex align="center" justify="space-between">
            <Flex align="center" gap={8}>
                <div className="image">
                    <Avatar src={image} size={50}></Avatar>
                </div>
                <div
                    style={{
                        width: 300,
                        maxWidth: 300,
                    }}
                >
                    <div>
                        <Typography.Text className="text-title">{title}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text type="secondary" className="text-description">
                            {description}
                        </Typography.Text>
                    </div>
                    {amount < 0 && (
                        <Typography.Text type="secondary" className="text-description">
                            Report Post
                        </Typography.Text>
                    )}
                </div>
            </Flex>

            <Typography.Text className="text-description">
                {dayjs(createdDate).format(FULL_TIME_FORMAT)}
            </Typography.Text>

            <Flex vertical gap={8} align="center">
                <div
                    style={{
                        color: amount >= 0 ? '#18C07A' : '#FF0000',
                    }}
                >
                    {formatSignedNumber(amount)} MC
                </div>
            </Flex>
        </Flex>
    );
};

const styles = css(`
    .text-title {
        font-size: 16px;
        font-weight: 400;
    }

    .text-description {
        font-size: 14px;
        color: #bdbdbd;
    }

    .amount {
        margin-left: auto;
        font-size: 16px;
        font-weight: 400;
    }

    .deposit {
        color: #18C07A
    }
        
    .withdraw {
        color: #FF0000;
    }
`);

export default TransactionItem;
