import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
}

const initialStates: State = {
  loading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialStates,
  reducers: {
    setGlobalState(state, action: PayloadAction<Partial<State>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setGlobalState } = globalSlice.actions;

export default globalSlice.reducer;
