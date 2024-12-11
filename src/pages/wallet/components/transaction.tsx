/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FilterTransactionParams } from '@/hooks/query/transaction/use-transactions-current-account';
import type { RootState } from '@/stores';
import type { FC } from 'react';

import { css } from '@emotion/react';
import { DatePicker, Flex, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useTransactionsCurrentAccount } from '@/hooks/query/transaction/use-transactions-current-account';
import { numberFormat } from '@/utils/number';

import TransactionItem from './transaction-item';

export const TransactionType = {
    bonus: 'Bonus Point',
    daily: 'Daily Point',
    transaction: 'Transaction',
    order: 'Order Point',
} as const;

export const TransactionStatus = {
    success: 'SUCCESS',
    // pending: 'FAILED',
    failed: 'FAILED',
} as const;

type FormatTransaction = {
    id: string;
    title: string;
    type: string;
    amount: number;
    status: string;
    createdDate: string;
};

const Transactions: FC = () => {
    const [params, setParams] = useState<FilterTransactionParams>({
        viewTransaction: false,
        dailyPoint: false,
        bonusPoint: false,
        status: '',
        orderPoint: false,
    });

    const { accountInfo } = useSelector((state: RootState) => state.account);
    const { data } = useTransactionsCurrentAccount({ params });

    const bonusPointsTransactions: FormatTransaction[] =
        data?.bonusPoint?.map(bonusPoint => ({
            id: bonusPoint?.dailyPointId,
            title: bonusPoint?.post?.title || '',
            type: 'Bonus Point',
            amount: bonusPoint.pointEarned,
            status: 'SUCCESS',
            createdDate: bonusPoint.createdDate,
        })) || [];

    const dailyPointsTransactions: FormatTransaction[] =
        data?.dailyPointList?.map(dailyPoint => ({
            id: dailyPoint?.dailyPointId,
            title: dailyPoint?.post?.title || '',
            type: 'Daily Point',
            amount: dailyPoint.pointEarned,
            status: 'SUCCESS',
            createdDate: dailyPoint.createdDate,
        })) || [];

    const transactionList: FormatTransaction[] =
        data?.transactionList?.map(transaction => ({
            id: transaction?.transactionId,
            title:
                transaction.transactionType === 'REDEEM_REWARD'
                    ? 'Exchange Source'
                    : transaction.transactionType === 'POST_VIOLATION'
                    ? 'Report Post'
                    : transaction.transactionType === 'DOWNLOAD_SOURCECODE'
                    ? 'Download File'
                    : transaction.transactionType === 'DELETE_POST'
                    ? 'Delete Post'
                    : transaction.transactionType, // Default to transactionType if no match
            type:
                transaction.transactionType === 'REDEEM_REWARD'
                    ? 'Transaction'
                    : transaction.transactionType === 'POST_VIOLATION'
                    ? 'Transaction'
                    : transaction.transactionType === 'DOWNLOAD_SOURCECODE'
                    ? 'Transaction'
                    : transaction.transactionType === 'DELETE_POST'
                    ? 'Transaction'
                    : '', // Consider a default type or leave empty if none apply
            amount: transaction.amount,
            status: 'SUCCESS',
            createdDate: transaction.createdDate,
        })) || [];

    const orderPointTransactions: FormatTransaction[] =
        data?.orderPointList?.map(orderPoint => ({
            id: orderPoint?.orderId,
            title: 'Deposit ' + numberFormat(orderPoint?.amount, ',') + ' VNĐ',
            type: 'Order Point',
            status: orderPoint.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED',
            amount: orderPoint.monkeyCoinPack.point,
            createdDate: orderPoint.orderDate,
        })) || [];

    const allTransactions = [
        ...bonusPointsTransactions,
        ...dailyPointsTransactions,
        ...transactionList,
        ...orderPointTransactions,
    ].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

    console.log(allTransactions);

    const handleChangeType = (value: string) => {
        console.log(value);

        if (value === 'Bonus Point') {
            setParams(prev => ({
                ...prev,
                dailyPoint: false,
                viewTransaction: false,
                bonusPoint: true,
                orderPoint: false,
            }));
        } else if (value === 'Daily Point') {
            setParams(prev => ({
                ...prev,
                bonusPoint: false,
                viewTransaction: false,
                dailyPoint: true,
                orderPoint: false,
            }));
        } else if (value === 'Transaction') {
            setParams(prev => ({
                ...params,
                bonusPoint: false,
                dailyPoint: false,
                viewTransaction: true,
                orderPoint: false,
            }));
        } else if (value === 'Order Point') {
            setParams(prev => ({
                ...params,
                bonusPoint: false,
                dailyPoint: false,
                viewTransaction: false,
                orderPoint: true,
            }));
        } else {
            setParams({
                ...params,
                bonusPoint: false,
                dailyPoint: false,
                viewTransaction: false,
                orderPoint: false,
            });
        }
    };

    // const handleChangeStatus = (value: string) => {
    //     console.log(value);

    //     if (value === 'SUCCESS') {
    //         setParams(prev => ({
    //             ...prev,
    //             success: true,
    //             failed: false,
    //             pending: false,
    //         }));
    //     } else if (value === 'PENDING') {
    //         setParams(prev => ({
    //             ...prev,
    //             success: false,
    //             failed: false,
    //             pending: true,
    //         }));
    //     } else if (value === 'FAILED') {
    //         setParams(prev => ({
    //             ...params,
    //             success: false,
    //             failed: true,
    //             pending: false,
    //         }));
    //     } else {
    //         setParams({
    //             ...params,
    //             success: false,
    //             failed: true,
    //             pending: false,
    //         });
    //     }
    // };
    const handleChangeStatus = (value: string) => {
        // Allow undefined for clearing
        setParams(prev => ({
            ...prev,
            status: value, // Set the 'status' field directly
        }));
    };

    return (
        <div css={styles}>
            <Flex justify="space-between">
                <p>
                    <Typography.Text
                        style={{
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
                        Last Transaction
                    </Typography.Text>
                </p>
            </Flex>
            <Flex justify="space-between" className="transaction-header">
                <Flex gap={16}>
                    <Space>
                        {/* Type filter */}
                        <Typography.Text>Type:</Typography.Text>
                        <Select
                            allowClear
                            style={{ minWidth: 100 }}
                            options={Object.keys(TransactionType).map(k => ({
                                label: TransactionType[k as keyof typeof TransactionType],
                                value: TransactionType[k as keyof typeof TransactionType],
                            }))}
                            onChange={value => handleChangeType(value)}
                        />
                    </Space>
                    <Space>
                        <Typography.Text>Status:</Typography.Text>
                        <Select
                            allowClear
                            style={{ minWidth: 100 }}
                            options={Object.keys(TransactionStatus).map(k => ({
                                label: TransactionStatus[k as keyof typeof TransactionStatus],
                                value: TransactionStatus[k as keyof typeof TransactionStatus],
                            }))}
                            onChange={handleChangeStatus} // Use corrected handler
                        />
                    </Space>
                    {/* Date filter remains in the same position */}
                    <Space>
                        <Typography.Text>Date:</Typography.Text>
                        <DatePicker.RangePicker // ... (date picker code)
                        />
                    </Space>
                </Flex>
            </Flex>
            <Flex className="transaction-items" vertical gap={20}>
                {allTransactions
                    .filter(transaction => {
                        if (!params.status) return true; // Show all if no status selected

                        return transaction.status === params.status;
                    })
                    .map(transaction => (
                        <TransactionItem
                            key={transaction?.id}
                            image={accountInfo?.avatar || ''}
                            amount={transaction?.amount}
                            description={transaction?.type}
                            title={transaction?.title}
                            createdDate={transaction?.createdDate}
                            status={transaction?.status}
                        />
                    ))}
            </Flex>
        </div>
    );
};

const styles = css(`
    .transaction-header {
        margin-bottom: 30px;    
    }
`);

export default Transactions;
