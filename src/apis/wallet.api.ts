import { ApiPaths } from "@/consts/apis";
import { request } from "./request";
import { Wallet } from "@/types/account";

export const apiGetWalletByAccountId = (accountId: string) => request<Wallet>(
    'get',
    ApiPaths.GET_WALLET_BY_ACCOUNT_ID + "/" + accountId,
);
