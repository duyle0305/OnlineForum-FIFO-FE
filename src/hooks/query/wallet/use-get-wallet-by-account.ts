import { request } from '@/apis/request';
import { walletKeys } from '@/consts/factory/wallet';
import { Wallet } from '@/types/account';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetWalletByAccount = (accountId: string) => {
    const fetchWallet = async () => {
        const { entity } = await request<Wallet>('get', `/wallet/get-by-account-id/${accountId}`, {});

        return entity;
    };

    return useQuery<Wallet>({
        queryKey: walletKeys.getByAccount(accountId),
        queryFn: fetchWallet,
        placeholderData: keepPreviousData,
        enabled: !!accountId,
    });
};
