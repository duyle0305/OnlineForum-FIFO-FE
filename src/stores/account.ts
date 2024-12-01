import { LocalStorageKeys } from '@/consts/local-storage';
import { Account, AccountStatus, Wallet } from '@/types/account';
import { Device } from '@/types/layout';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  /** login status */
  logged: boolean;

  /** user's device */
  device?: Device;

  /** menu collapsed status */
  collapsed?: boolean;

  /** notification count */
  noticeCount: number;

  selectedKeys: string[];

  accountInfo?: Account

  userInfo?: Account

  email?: string
}

const initialStates: AccountState = {
  logged: localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY) ? true : false,
  noticeCount: 0,
  selectedKeys: []
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialStates,
  reducers: {
    setAccountState(state, action: PayloadAction<Partial<AccountState>>) {
      Object.assign(state, action.payload)
    },

    loggout(state, action: PayloadAction<undefined>) {
      state = { ...initialStates }
    }
  },
});

export const {
  setAccountState,
  loggout
} = accountSlice.actions;

export default accountSlice.reducer;

