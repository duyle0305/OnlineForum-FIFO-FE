import axiosInstance from '@/apis/request';
import { CreateFeedbackPayload, FeedbackStatus } from '@/types/feedback/feedback';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateReportAccount = (
  id: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>> = {},
) => {
    const updateReportAccount = async (payload: FeedbackStatus) => {
        return axiosInstance.put(`/report-account/update/${id}?status=${payload}`, {});
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['report-account', 'update', id],
        mutationFn: (payload: FeedbackStatus) => updateReportAccount(payload),
        ...options,
    });
};
