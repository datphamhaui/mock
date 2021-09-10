/*
 *
 * ArticlePage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { articelPageSaga } from './saga';
import { ArticlePageState } from './types';

export const initialState: ArticlePageState = {
  article: {
    author: {
      bio: '',
      followerCount: 0,
      following: false,
      followingCount: 2,
      image: '',
      postCount: 107,
      username: '',
    },
    body: '',
    description: '',
    favorited: false,
    favoritesCount: 1,
    slug: '',
    tagList: [''],
    title: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  comments: [],
  loading: false,
  success: false,
  failures: false,
  removeSuccess: false,
};

const slice = createSlice({
  name: 'articlePage',
  initialState,
  reducers: {
    //=======================================================================
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
    //=======================================================================
    getComment(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getCommentSuccess(state, actions) {
      state.comments = actions.payload.comments;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getCommentFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    //=======================================================================
    favorite(state, payload) {
      state.loading = false;
      state.success = false;
      state.failures = false;
    },
    favoriteSucceed(state, actions) {
      if (state.article) {
        state.article.favorited = actions.payload.article.favorited;
        state.article.favoritesCount = actions.payload.article.favoritesCount;
      }
      state.success = true;
      state.failures = false;
    },
    favoriteFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    //=======================================================================
    unFavorite(state, payload) {
      state.success = false;
      state.failures = false;
    },
    unFavoriteSucceed(state, actions) {
      if (state.article) {
        state.article.favorited = actions.payload.article.favorited;
        state.article.favoritesCount = actions.payload.article.favoritesCount;
      }
      state.success = true;
      state.failures = false;
    },
    unFavoriteFailed(state) {
      state.success = false;
      state.failures = true;
    },
    //=======================================================================
    follow(state, actions) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    followSuccess(state, actions) {
      if (state.article) {
        state.article.author.following = actions.payload.profile.following;
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
    //=======================================================================
    unFollow(state, actions) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    unFollowSuccess(state, actions) {
      if (state.article) {
        state.article.author.following = actions.payload.profile.following;
      }
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    unFollowFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    //=======================================================================
    comment(state, payload) {
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    commentSuccess(state, actions) {
      if (state.comments) {
        state.comments.unshift(actions.payload.comment);
      }
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    commentFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    //=======================================================================
    remove(state, payload) {
      state.loading = false;
      state.removeSuccess = true;
      state.failures = false;
    },
    removeSuccess(state) {
      state.loading = false;
      state.removeSuccess = true;
      state.failures = false;
    },
    removeFailed(state) {
      state.loading = false;
      state.removeSuccess = false;
      state.failures = true;
    },
    //=======================================================================
    removeComment(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    removeCommentSuccess(state, actions) {
      if (state.comments) {
        state.comments = state.comments.filter(item => item.id !== actions.payload);
      }
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    removeCommentFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    //=======================================================================
    reset(state) {
      state.article = initialState.article;
      state.comments = [];
      state.loading = false;
      state.success = false;
      state.failures = false;
      state.removeSuccess = false;
    },
  },
});

export const { actions } = slice;

export const articlePageSlice = { key: slice.name, reducer: slice.reducer, saga: articelPageSaga };
