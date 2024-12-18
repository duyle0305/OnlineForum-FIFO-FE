import SecondaryTag from '@/components/core/secondary-tag';
import { RootState } from '@/stores';
import { Card, Divider, Flex } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useGetWalletByAccount } from '@/hooks/query/wallet/use-get-wallet-by-account';
import PageBreadcrumbs from '@/components/core/page-breadcrumbs';

interface RewardWrapperProps {
    children: React.ReactNode;
    title?: string;
}

const RewardWrapper: FC<RewardWrapperProps> = ({ children, title }) => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { data: wallet } = useGetWalletByAccount(accountInfo?.accountId as string);

    return (
        <Card>
            <Flex justify="space-between" align="center">
                <PageBreadcrumbs title={title} />

                <SecondaryTag>Balance: {wallet?.balance} MC</SecondaryTag>
            </Flex>

            <Divider />

            {children}
        </Card>
    );
};

export default RewardWrapper;
