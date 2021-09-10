/*
 *
 * SignupPage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { signupPageSaga } from './saga';
import { SignupPageState } from './types';

export const initialState: SignupPageState = {
  data: undefined,
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'signupPage',
  initialState,
  reducers: {
    signup(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    signupSuccess(state, payload) {
      state.data = payload.payload.user;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    signupFailures(state) {
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

export const signupPageSlice = { key: slice.name, reducer: slice.reducer, saga: signupPageSaga };
