import axiosInstance from '@/apis/request';
import { SignUpRequest } from '@/types/auth';
import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useSignUp = (options: UseMutationOptions<boolean, DefaultError, SignUpRequest> = {}) => {
    const signIn = async (payload: SignUpRequest) => {
        return axiosInstance.post('/authenticate/sign-up', payload);
    };

    return useMutation<any, DefaultError, SignUpRequest>({
        mutationKey: ['auth', 'signup'],
        mutationFn: signIn,
        ...options,
    });
};
