import axiosInstance from "@/apis/request";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type OtpVerifyPayload = {
    email: string;
    otp: string;
}

export const useOtpVerify = (options: UseMutationOptions<unknown, AxiosError<unknown>, OtpVerifyPayload> = {}) => {
    const otpVerify = async (payload: OtpVerifyPayload) => {
      return axiosInstance.post('/authenticate/verify-otp', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, OtpVerifyPayload>({
        mutationKey: ['auth', 'otp-verify'],
        mutationFn: payload => otpVerify(payload),
        ...options,
    });
};

export const useResendOtp = (options: UseMutationOptions<unknown, AxiosError<unknown>, { email: string }> = {}) => {
    const resendOtp = async (payload: { email: string }) => {
      return axiosInstance.post(`/authenticate/resend-otp?email=${payload.email}`);
    };

    return useMutation<unknown, AxiosError<unknown>, { email: string }>({
        mutationKey: ['auth', 'resend-otp'],
        mutationFn: payload => resendOtp(payload),
        ...options,
    });
}