import axiosInstance from "@/apis/request";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteComment = (options: UseMutationOptions<unknown, AxiosError<unknown>, any> = {}) => {
   const deleteComment = async (payload: string) => {
       return axiosInstance.delete(`/comment/delete/by-user/${payload}`);
   };

   return useMutation<unknown, AxiosError<unknown>, any>({
       mutationKey: ['comment', 'create'],
       mutationFn: payload => deleteComment(payload),
       ...options,
   });
};