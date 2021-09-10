/*
 *
 * ProfilePage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { profilePageSaga } from './saga';
import { ProfilePageState } from './types';

export const initialState: ProfilePageState = {
  articles: [],
  profile: {
    username: '',
    bio: '',
    image: '',
    following: false,
    followingCount: 0,
    followerCount: 0,
    postCount: 0,
  },
  articlesCount: 0,
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    get(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getSucceed(state, actions) {
      state.articles = actions.payload.articles;
      state.articlesCount = actions.payload.articlesCount;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },

    getProfile(state, actions) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getProfileSuccess(state, actions) {
      state.profile = actions.payload.profile;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getProfileFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },

    favorite(state, payload) {
      state.loading = false;
      state.success = false;
      state.failures = false;
    },
    favoriteSucceed(state, actions) {
      for (let i = 0; i < state.articles.length; i++) {
        if (state.articles[i].slug === actions.payload.article.slug) {
          state.articles[i].favorited = actions.payload.article.favorited;
          state.articles[i].favoritesCount = actions.payload.article.favoritesCount;
        }
      }
      state.success = true;
      state.failures = false;
    },
    favoriteFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },

    unFavorite(state, payload) {
      state.loading = false;
      state.success = false;
      state.failures = false;
    },
    unFavoriteSucceed(state, actions) {
      for (let i = 0; i < state.articles.length; i++) {
        if (state.articles[i].slug === actions.payload.article.slug) {
          state.articles[i].favorited = actions.payload.article.favorited;
          state.articles[i].favoritesCount = actions.payload.article.favoritesCount;
        }
      }
      state.success = true;
      state.failures = false;
    },
    unFavoriteFailed(state) {
      state.success = false;
      state.failures = true;
    },
    follow(state, actions) {
      state.success = false;
      state.failures = false;
    },
    followSuccess(state, actions) {
      state.profile.following = actions.payload.profile.following;
      state.profile.followerCount = actions.payload.profile.followerCount;
      state.success = true;
      state.failures = false;
    },
    followFailed(state) {
      state.success = false;
      state.failures = true;
    },
    unFollow(state, actions) {
      state.success = false;
      state.failures = false;
    },
    unFollowSuccess(state, actions) {
      state.profile.following = actions.payload.profile.following;
      state.profile.followerCount = actions.payload.profile.followerCount;
      state.success = true;
      state.failures = false;
    },
    unFollowFailed(state) {
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const profilePageSlice = { key: slice.name, reducer: slice.reducer, saga: profilePageSaga };
