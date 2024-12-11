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
    status: string;
    amount: number;
    createdDate: string;
}

const TransactionItem: FC<TransactionItemProps> = ({ image, title, description, amount, createdDate, status }) => {
    let statusColor = '#FF0000'; // Default status to red (FAILED)
    let amountColor = amount < 0 ? '#FF0000' : '#18C07A'; // Red if amount is negative, otherwise green

    if (status === 'SUCCESS') {
        statusColor = '#18C07A'; // Green for successful transactions
    }
    // else if (status === 'PENDING') {
    //     statusColor = '#ffff00'; // Yellow for pending transactions
    //     amountColor = '#FF0000'; // Red for pending transactions
    // }
    else if (status === 'FAILED') {
        // Add this condition
        statusColor = '#FF0000'; // Explicitly set to red (though already the default)
        amountColor = '#FF0000'; // Red for failed transactions
    }

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
                    {/* {amount < 0 && (
                            <Typography.Text type="secondary" className="text-description">
                                Report Post
                            </Typography.Text>
                        )} */}
                </div>
            </Flex>

            <Typography.Text className="text-description">
                {dayjs(createdDate).format(FULL_TIME_FORMAT)}
            </Typography.Text>

            <Flex vertical gap={8} align="center">
                <div
                    style={{
                        // color: amountColor >= 0 ? '#18C07A' : '#FF0000',
                        color: amountColor,
                    }}
                >
                    {formatSignedNumber(amount)} MC
                </div>
            </Flex>
            <Flex vertical gap={8} align="center">
                <div style={{ color: statusColor }}>{status}</div>
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
