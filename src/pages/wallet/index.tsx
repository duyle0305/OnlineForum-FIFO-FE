import { BaseCard } from '@/components/core/card';
import { useWallet } from '@/hooks/query/auth/use-wallet';
import { css } from '@emotion/react';
import { Flex, Spin } from 'antd';
import { FC } from 'react';
import Balance from './components/balance';
import Transactions from './components/transaction';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useGetWalletByAccount } from '@/hooks/query/wallet/use-get-wallet-by-account';

const WalletPage: FC = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { data: wallet, isLoading } = useGetWalletByAccount(accountInfo?.accountId as string);

    return isLoading ? (
        <Spin />
    ) : (
        <BaseCard css={styles}>
            <Flex vertical gap={30}>
                <Balance balance={wallet?.balance || 0} />
                <div className="transaction">
                    <Transactions />
                </div>
            </Flex>
        </BaseCard>
    );
};

const styles = css(`
    overflow: hidden;

    .ant-card-body {
        padding: 0;  
    }

    .transaction {
        padding: 40px;
    }
`);

export default WalletPage;
