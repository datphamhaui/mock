/*
 *
 * ProfilePage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* get(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles`,
      method: 'GET',
      params: payload.payload,
    });
    if (respone) {
      yield put(actions.getSucceed(respone));
    } else {
      yield put(actions.getFailed());
    }
  } catch (err) {
    yield put(actions.getFailed());
  }
}

export function* getProfile(payload) {
  try {
    const respone = yield call(request, {
      url: `/profiles/${payload.payload}`,
      method: 'GET',
    });
    if (respone) {
      yield put(actions.getProfileSuccess(respone));
    } else {
      yield put(actions.getProfileFailed());
    }
  } catch (err) {
    yield put(actions.getProfileFailed());
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
    const respone = yield call(request, {
      url: `/profiles/${payload.payload}/follow`,
      method: 'POST',
    });
    if (respone) {
      yield put(actions.followSuccess(respone));
    }
  } catch (err) {
    yield put(actions.followFailed());
  }
}

export function* unFollow(payload) {
  try {
    const respone = yield call(request, {
      url: `/profiles/${payload.payload}/follow`,
      method: 'DELETE',
    });
    if (respone) {
      yield put(actions.unFollowSuccess(respone));
    }
  } catch (err) {
    yield put(actions.unFollowFailed());
  }
}

export function* profilePageSaga() {
  yield takeLatest(actions.get.type, get);
  yield takeLatest(actions.getProfile.type, getProfile);
  yield takeLatest(actions.favorite.type, favorite);
  yield takeLatest(actions.unFavorite.type, unFavorite);
  yield takeLatest(actions.follow.type, follow);
  yield takeLatest(actions.unFollow.type, unFollow);
}
