import axiosInstance from "@/apis/request";
import { UpdateProfilePayload } from "@/types/account";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateProfile = (options: UseMutationOptions<unknown, AxiosError<unknown>, UpdateProfilePayload> = {}) => {
    const updateProfile = async (payload: UpdateProfilePayload) => {
      return axiosInstance.put(`/account/update-info`, payload);
    };

    return useMutation<unknown, AxiosError<unknown>, UpdateProfilePayload>({
        mutationKey: ['profile', 'update'],
        mutationFn: updateProfile,
        ...options,
    });
}