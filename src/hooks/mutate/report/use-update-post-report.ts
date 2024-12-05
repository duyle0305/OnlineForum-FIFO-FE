import axiosInstance from '@/apis/request';
import { CreateFeedbackPayload, FeedbackStatus } from '@/types/feedback/feedback';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdatePostReport = (
  id: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>> = {},
) => {
    const updatePostReport = async (payload: FeedbackStatus) => {
        return axiosInstance.put(`/post-report/update/${id}?status=${payload}`, {});
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['post-report', 'update', id],
        mutationFn: (payload: FeedbackStatus) => updatePostReport(payload),
        ...options,
    });
};
