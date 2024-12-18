import axiosInstance, { request } from '@/apis/request';
import { LocalStorageKeys } from '@/consts/local-storage';
import { API_PATH } from '@/utils/env';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export type BuyPointsPayload = {
    monkeyCoinPackId: string;
    redirectUrl: string;
};

export const useBuyPoints = (options: UseMutationOptions<unknown, AxiosError<unknown>, BuyPointsPayload> = {}) => {
    const createBuyPoints = async (payload: BuyPointsPayload) => {
        const { data } = await axios.post(`${API_PATH}/payment/buyPoints`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY)}`,
            },
        });

        return data;
    };

    return useMutation<
        {
            code: string;
            message: string;
            paymentUrl: string;
        },
        AxiosError<unknown>,
        BuyPointsPayload
    >({
        mutationKey: ['payment', 'buyPoints'],
        mutationFn: payload => createBuyPoints(payload),
        ...options,
    });
};
