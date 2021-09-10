/*
 *
 * SettingsPage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { settingsPageSaga } from './saga';
import { SettingsPageState } from './types';

export const initialState: SettingsPageState = {
  data: undefined,
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'settingsPage',
  initialState,
  reducers: {
    put(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    putSucceed(state, actions) {
      state.data = actions.payload.user;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    putFailed(state) {
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

export const settingsPageSlice = { key: slice.name, reducer: slice.reducer, saga: settingsPageSaga };
