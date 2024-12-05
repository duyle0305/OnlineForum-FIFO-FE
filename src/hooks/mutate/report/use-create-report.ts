import axiosInstance from '@/apis/request';
import { ReportAccountReasons } from '@/types/report/report';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateReport = (id: string, options: UseMutationOptions<unknown, AxiosError<unknown>> = {}) => {
    const createReport = async (reason: ReportAccountReasons) => {
        return axiosInstance.post(`/report-account/create?reported=${id}&reportAccountReasons=${reason}`, {});
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['feedback', 'update', id],
        mutationFn: (payload: ReportAccountReasons) => createReport(payload),
        ...options,
    });
};


export const useCreateReportPost = (id: string, options: UseMutationOptions<unknown, AxiosError<unknown>> = {}) => {
    const createReport = async (reason: ReportAccountReasons) => {
        return axiosInstance.post(`/post-report/create?reportReason=${reason}`, {
            postId: id,
        });
    };

    return useMutation<unknown, AxiosError<unknown>, any>({
        mutationKey: ['feedback', 'update', id],
        mutationFn: (payload: ReportAccountReasons) => createReport(payload),
        ...options,
    });
}