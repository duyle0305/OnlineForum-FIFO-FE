import type { LogoutParams, LogoutResult, SignInRequest, SignInResponse, SignUpRequest } from '../types/auth';

import { AxiosRequestConfig } from 'axios';

import { ApiPaths } from '@/consts/apis';
import { request } from './request';

export const apiSignIn = (data: SignInRequest) => request<SignInResponse>('post', ApiPaths.SIGNIN, data);

export const apiSignUp = (data: SignUpRequest) => request<SignInResponse>('post', ApiPaths.SIGNUP, data);

export const apiRefreshToken = (config: AxiosRequestConfig) =>
    request<SignInResponse>('get', '/api/v1/auth/refreshToken', {}, config);

export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/api/v1/auth/logout', data);
