import { FULL_TIME_FORMAT } from '@/consts/common';
import { formatSignedNumber } from '@/utils/number';
import { css } from '@emotion/react';
import { Avatar, Flex, Typography } from 'antd';
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
                <div>
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
                    color: description !== 'Transaction' ? '#18C07A' : '#FF0000',
                }}
            >
                {formatSignedNumber(amount)} MC
            </div>
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
