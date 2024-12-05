import { Dispatch } from "@reduxjs/toolkit";
import { AppStore } from ".";

type ThunkAction<T = any> = (dispatch: Dispatch, state: AppStore['getState']) => Promise<T>;

export const createAsyncAction = <T = any, R = any>(callback: (arg: T) => ThunkAction<R>) => {
    return callback;
};
