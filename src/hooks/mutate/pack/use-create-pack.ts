import axiosInstance from '@/apis/request';
import { CreatePackPayload } from '@/types/pack/pack';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreatePack = (options: UseMutationOptions<unknown, AxiosError<unknown>, CreatePackPayload> = {}) => {
    const createPack = async (payload: CreatePackPayload) => {
        return axiosInstance.post('/monkey-coin-pack/create', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreatePackPayload>({
        mutationKey: ['monkey-coin-pack', 'create'],
        mutationFn: payload => createPack(payload),
        ...options,
    });
};
