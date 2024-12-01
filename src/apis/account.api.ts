import type { Account, GetAccountRequest } from '@/types/account';

import { ApiPaths } from '@/consts/apis';

import { request } from './request';

export const apiGetAccount = (data: GetAccountRequest) =>
    request<Account>('get', ApiPaths.GET_ACCOUNT_BY_USERNAME, data);
