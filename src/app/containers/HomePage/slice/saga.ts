/*
 *
 * HomePage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* getArticle(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles/${payload.payload.query}`,
      method: 'GET',
      params: payload.payload.params,
    });
    if (respone) {
      yield put(actions.getArticleSucceed(respone));
    } else {
      yield put(actions.getArticleFailed());
    }
  } catch (err) {
    yield put(actions.getArticleFailed());
  }
}

export function* getTag() {
  try {
    const respone = yield call(request, {
      url: '/tags',
      method: 'GET',
    });
    if (respone) {
      yield put(actions.getTagSucceed(respone));
    } else {
      yield put(actions.getTagFailed());
    }
  } catch (err) {
    yield put(actions.getTagFailed());
  }
}

export function* favorite(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles/${payload.payload}/favorite`,
      method: 'POST',
    });
    if (respone) {
      yield put(actions.favoriteSucceed(respone));
    } else {
      yield put(actions.favoriteFailed());
    }
  } catch (err) {
    yield put(actions.favoriteFailed());
  }
}

export function* unFavorite(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles/${payload.payload}/favorite`,
      method: 'DELETE',
    });
    if (respone) {
      yield put(actions.unFavoriteSucceed(respone));
    } else {
      yield put(actions.unFavoriteFailed());
    }
  } catch (err) {
    yield put(actions.unFavoriteFailed());
  }
}

export function* follow(payload) {
  try {
    console.log(payload.payload);
    const respone = yield call(request, {
      url: `profiles/${payload.payload}/follow`,
      method: 'POST',
    });
    if (respone) {
      yield put(actions.followSucceed(respone));
    } else {
      yield put(actions.followFailed());
    }
  } catch (err) {
    yield put(actions.followFailed());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.getArticle.type, getArticle);
  yield takeLatest(actions.getTag.type, getTag);
  yield takeLatest(actions.favorite.type, favorite);
  yield takeLatest(actions.unFavorite.type, unFavorite);
  yield takeLatest(actions.follow.type, follow);
}
