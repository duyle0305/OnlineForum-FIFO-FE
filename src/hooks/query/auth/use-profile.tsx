import { apiGetAccount } from "@/apis/account.api";
import { authKeys } from "@/consts/factory/auth";
import { LocalStorageKeys } from "@/consts/local-storage";
import { RootState } from "@/stores";
import { setAccountState } from "@/stores/account";
import { Account } from "@/types/account";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const useProfile = () => {
    const dispatch = useDispatch();
    const { logged } = useSelector((state: RootState) => state.account);

    const getProfile = async (): Promise<Account | undefined> => {
        const username = localStorage.getItem(LocalStorageKeys.USERNAME_KEY)
        if (!username) {
            return undefined;
        }

        const response = await apiGetAccount({
            username: username
        })

        if (response.success && response.entity) {
            const { entity } = response;

            dispatch(
                setAccountState({
                    accountInfo: entity
                })
            )
            return entity;
        }

        return;
    }

    return useQuery<Account | undefined>({
        queryKey: authKeys.profile(),
        queryFn: getProfile,
        placeholderData: keepPreviousData,
        enabled: !!logged
    });
}