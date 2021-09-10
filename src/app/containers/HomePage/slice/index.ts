/*
 *
 * HomePage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { homePageSaga } from './saga';
import { HomePageState } from './types';

export const initialState: HomePageState = {
  articles: [],
  articlesCount: 0,
  tags: [],
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    getArticle(state, actions) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getArticleSucceed(state, actions) {
      state.articles = actions.payload.articles;
      state.articlesCount = actions.payload.articlesCount;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getArticleFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    getTag(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getTagSucceed(state, actions) {
      state.tags = actions.payload.tags;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getTagFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    favorite(state, actions) {
      state.loading = true;
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
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    favoriteFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    unFavorite(state, actions) {
      state.loading = true;
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
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    unFavoriteFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    follow(state, actions) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    followSucceed(state, actions) {
      for (let i = 0; i < state.articles.length; i++) {
        if (state.articles[i].author.username === actions.payload.profile.username) {
          state.articles[i].author.following = actions.payload.profile.following;
        }
      }
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    followFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const homePageSlice = { key: slice.name, reducer: slice.reducer, saga: homePageSaga };
