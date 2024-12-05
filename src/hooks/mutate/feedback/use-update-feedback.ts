import axiosInstance from '@/apis/request';
import { CreateFeedbackPayload, FeedbackStatus } from '@/types/feedback/feedback';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateFeedback = (
  id: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>> = {},
) => {
    const updateFeedback = async (payload: FeedbackStatus) => {
        return axiosInstance.put(`/feedback/update/${id}?status=${payload}`, {});
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['feedback', 'update', id],
        mutationFn: (payload: FeedbackStatus) => updateFeedback(payload),
        ...options,
    });
};
