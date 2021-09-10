/*
 *
 * PostPage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { postPageSaga } from './saga';
import { PostPageState } from './types';

export const initialState: PostPageState = {
  article: undefined,
  slugSucceed: '',
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'postPage',
  initialState,
  reducers: {
    get(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getSucceed(state, actions) {
      state.article = actions.payload.article;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },

    create(state, payload) {
      state.slugSucceed = '';
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    createSucceed(state, payload) {
      state.slugSucceed = payload.payload.article.slug;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    createFailed(state) {
      state.slugSucceed = '';
      state.loading = false;
      state.success = false;
      state.failures = true;
    },

    update(state, payload) {
      state.slugSucceed = '';
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    updateSucceed(state, payload) {
      state.slugSucceed = payload.payload.article.slug;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    updateFailed(state) {
      state.slugSucceed = '';
      state.loading = false;
      state.success = false;
      state.failures = true;
    },

    reset(state) {
      state.article = undefined;
      state.slugSucceed = '';
      state.loading = false;
      state.success = false;
      state.failures = false;
    },
  },
});

export const { actions } = slice;

export const postPageSlice = { key: slice.name, reducer: slice.reducer, saga: postPageSaga };
