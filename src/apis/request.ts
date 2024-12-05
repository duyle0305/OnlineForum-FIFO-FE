import { ApiConfigs, ApiPaths } from '@/consts/apis';
import { LocalStorageKeys } from '@/consts/local-storage';
import store from '@/stores';
import { setGlobalState } from '@/stores/global';
import { Response } from '@/types';
import { RefreshTokenResponse } from '@/types/auth';
import { historyNavigation } from '@/utils/common';
import { API_PATH } from '@/utils/env';
import { PATHS } from '@/utils/paths';
import { message as $message } from 'antd';
import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import axios from 'axios';
import Qs from 'qs';

export type BaseResponse<T = any> = Promise<Response<T>>;

const axiosInstance = axios.create({
    baseURL: API_PATH,
    timeout: ApiConfigs.TIME_OUT_MS,
    // validateStatus: status => status >= 200 && status < 300,
    // paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' }),
});

axiosInstance.interceptors.request.use(
    config => {
        setLoadingState(true);

        const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY);

        if (token) {
            config!.headers!.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    error => {
        setLoadingState(false);
        return Promise.reject(error);
    },
);

let isRefreshToken = false;

axiosInstance.interceptors.response.use(
    (axiosResponse: AxiosResponse) => {
        setLoadingState(false);

        const { code, entity } = axiosResponse?.data;

        const response: Response<any> = {
            success: code === ApiConfigs.API_SUCCESS_CODE,
            message: 'Success',
            code: code,
            entity: entity,
        };

        return response;
    },

    async (err: AxiosError) => {
        setLoadingState(false);

        const originalConfig = err.config;
        const { response } = err;

        if (originalConfig.url !== ApiPaths.REFRESH_TOKEN && response && response.status === 401 && !isRefreshToken) {
            isRefreshToken = true;

            // clear previous access token;
            localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN_KEY);

            // Generating new access token
            const refreshToken = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN_KEY);
            const username = localStorage.getItem(LocalStorageKeys.USERNAME_KEY);

            if (refreshToken && username) {
                const res: Response<RefreshTokenResponse> = await axiosInstance.post(
                    ApiPaths.REFRESH_TOKEN,
                    undefined,
                    {
                        params: { refreshToken, username },
                    },
                );

                const { success, entity } = res;

                isRefreshToken = false;
                if (success && entity && entity.accessToken) {
                    const { accessToken } = entity;

                    // set new access token
                    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, accessToken);

                    return axiosInstance(originalConfig);
                } else {
                    // $message.error('Session has been expired');
                    localStorage.clear();
                    historyNavigation.navigate(PATHS.SIGNIN);
                }
            }
        }

        const { code, message, data } = response?.data || {};
        const errorResponse: Response<unknown> = {
            success: code === ApiConfigs.API_SUCCESS_CODE,
            message: message || 'An error ocurred',
            entity: data,
        };

        // errorResponse.message && $message.error(errorResponse.message);
        return Promise.reject(errorResponse);
    },
);

export default axiosInstance;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 * @param config - Additional Axios config
 */
export const request = <T = any>(
    method: Lowercase<Method>,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): BaseResponse<T> => {
    // remove undefined | null | '' field
    // if (data) {
    //   Object.keys(data).forEach(key => {
    //     if (data[key] == null || data[key] === '') delete data[key];
    //   });
    // }

    switch (method) {
        case 'post':
            return axiosInstance.post(url, data, config);
        case 'put':
            return axiosInstance.put(url, data, config);
        case 'delete':
            return axiosInstance.delete(url, {
                ...config,
                data: data,
            });
        case 'get':
        default:
            return axiosInstance.get(url, {
                params: data,
                ...config,
            });
    }
};

const setLoadingState = (isLoading: boolean) => {
    store.dispatch(setGlobalState({ loading: isLoading }));
};
