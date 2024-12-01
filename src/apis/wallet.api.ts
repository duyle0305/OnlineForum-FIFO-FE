import type { Wallet } from '@/types/account';

import { ApiPaths } from '@/consts/apis';

import { request } from './request';

export const apiGetWalletByAccountId = (accountId: string) =>
    request<Wallet>('get', ApiPaths.GET_WALLET_BY_ACCOUNT_ID + '/' + accountId);
