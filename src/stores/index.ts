import { combineReducers, configureStore, Dispatch } from '@reduxjs/toolkit';

import globalReducer from './global';
import accountReducer from "./account";
import postReducer from "./post";

export type RootState = {
  account: ReturnType<typeof accountReducer>;
  global: ReturnType<typeof globalReducer>;
  post: ReturnType<typeof postReducer>;
}

const rootReducer = combineReducers({
  account: accountReducer,
  global: globalReducer,
  post: postReducer,
});


const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;

export type AppStore = typeof store;

type ThunkAction<T = any> = (dispatch: Dispatch, state: AppStore['getState']) => Promise<T>;

export const createAsyncAction = <T = any, R = any>(callback: (arg: T) => ThunkAction<R>) => {
  return callback;
};
