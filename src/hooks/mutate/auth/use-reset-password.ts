import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useResetPassword = (
    options: UseMutationOptions<
        unknown,
        AxiosError<unknown>,
        { email: string; password: string; confirmPassword: string }
    > = {},
) => {
    const resetPassword = async (payload: { email: string; password: string; confirmPassword: string }) => {
        return axiosInstance.put(`/authenticate/change-password?email=${payload.email}`, {
            password: payload.password,
            confirmPassword: payload.confirmPassword,
        });
    };

    return useMutation<unknown, AxiosError<unknown>, { email: string; password: string; confirmPassword: string }>({
        mutationKey: ['auth', 'reset-password'],
        mutationFn: payload => resetPassword(payload),
        ...options,
    });
};
