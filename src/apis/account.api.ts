import { ApiPaths } from "@/consts/apis";
import { Account, GetAccountRequest } from "@/types/account";
import { request } from "./request";

export const apiGetAccount = (data: GetAccountRequest) => request<Account>(
    'get',
    ApiPaths.GET_ACCOUNT_BY_USERNAME,
    data
  );