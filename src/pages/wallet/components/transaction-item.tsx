import type { FC } from 'react';

import { css } from '@emotion/react';
import { Avatar, Flex, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { title } from 'process';

import { FULL_TIME_FORMAT } from '@/consts/common';
import { formatSignedNumber } from '@/utils/number';

interface TransactionItemProps {
    image: string;
    title: string;
    description: string;
    amount: number;
    status: string;
    createdDate: string;
}

const TransactionItem: FC<TransactionItemProps> = ({ image, title, description, amount, status, createdDate }) => {
    if (status === 'success') {
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
                    </div>
                </Flex>

                <Typography.Text className="text-description">
                    {dayjs(createdDate).format(FULL_TIME_FORMAT)}
                </Typography.Text>

                <div
                    style={{
                        color: amount >= 0 ? '#18C07A' : '#FF0000',
                    }}
                >
                    {formatSignedNumber(amount)} MC
                </div>
            </Flex>
        );
    }

    return null;
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
