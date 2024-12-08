import axiosInstance from '@/apis/request';
import { CreateTopicPayload } from '@/types/topic/topic';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateTopic = (options: UseMutationOptions<unknown, AxiosError<unknown>, CreateTopicPayload> = {}) => {
    const createTopic = async (payload: CreateTopicPayload) => {
        return axiosInstance.post('/topic/create', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, CreateTopicPayload>({
        mutationKey: ['topic', 'create'],
        mutationFn: payload => createTopic(payload),
        ...options,
    });
};
