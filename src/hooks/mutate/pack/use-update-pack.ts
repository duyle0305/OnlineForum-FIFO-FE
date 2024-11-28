import axiosInstance from '@/apis/request';
import { CreatePackPayload } from '@/types/pack/pack';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdatePack = (
    id: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>, CreatePackPayload> = {},
) => {
    const createPack = async (payload: CreatePackPayload) => {
        return axiosInstance.put(`/monkey-coin-pack/update/${id}`, payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreatePackPayload>({
        mutationKey: ['monkey-coin-pack', 'update', id],
        mutationFn: payload => createPack(payload),
        ...options,
    });
};
