/*
 *
 * LoginPage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { loginPageSaga } from './saga';
import { LoginPageState } from './types';

export const initialState: LoginPageState = {
  data: undefined,
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    login(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    loginSuccess(state, payload) {
      state.data = payload.payload.user;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    loginFailures(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    reset(state) {
      state.data = undefined;
      state.loading = false;
      state.success = false;
      state.failures = false;
    },
  },
});

export const { actions } = slice;

export const loginPageSlice = { key: slice.name, reducer: slice.reducer, saga: loginPageSaga };
