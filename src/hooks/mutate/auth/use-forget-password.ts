import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useForgetPassword = (
    options: UseMutationOptions<unknown, AxiosError<unknown>, { email: string }> = {},
) => {
    const forgetPassword = async (payload: { email: string }) => {
        return axiosInstance.post(`/authenticate/forget-password?email=${payload.email}`);
    };

    return useMutation<unknown, AxiosError<unknown>, { email: string }>({
        mutationKey: ['auth', 'forget-password'],
        mutationFn: payload => forgetPassword(payload),
        ...options,
    });
};
