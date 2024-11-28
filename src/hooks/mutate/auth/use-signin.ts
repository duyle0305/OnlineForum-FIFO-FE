import { apiSignIn } from '@/apis/auth.api';
import { LocalStorageKeys } from '@/consts/local-storage';
import { setAccountState } from '@/stores/account';
import { SignInRequest } from '@/types/auth';
import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useSignIn = (options: UseMutationOptions<boolean, DefaultError, SignInRequest> = {}) => {
    const signIn = async (payload: SignInRequest) => {
        const { username } = payload;

        return apiSignIn(payload);
    };

    return useMutation<any, DefaultError, SignInRequest>({
        mutationKey: ['auth', 'signin'],
        mutationFn: signIn,
        ...options,
    });
};
