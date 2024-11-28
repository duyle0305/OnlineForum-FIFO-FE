import axiosInstance from "@/apis/request";
import { CommentCreatePayload, UpdateCommentPayload } from "@/types/comment/comment";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateComment = ( options: UseMutationOptions<unknown, AxiosError<unknown>, UpdateCommentPayload> = {}) => {
   const updateComment = async (payload: UpdateCommentPayload & {id: string}) => {
       return axiosInstance.put(`/comment/update/${payload.id}`, payload);
   };

   return useMutation<unknown, AxiosError<unknown>, UpdateCommentPayload & {id: string}>({
       mutationKey: ['comment', 'update'],
       mutationFn: payload => updateComment({
        content: payload.content,
        id: payload.id,
       }),
       ...options,
   });
};