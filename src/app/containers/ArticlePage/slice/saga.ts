/*
 *
 * ArticlePage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* get(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles/${payload.payload}`,
      method: 'GET',
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
export function* getComment(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles/${payload.payload}/comments`,
      method: 'GET',
    });
    if (respone) {
      yield put(actions.getCommentSuccess(respone));
    } else {
      yield put(actions.getCommentFailed());
    }
  } catch (err) {
    yield put(actions.getCommentFailed());
  }
}
export function* comment(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles/${payload.payload.slug}/comments`,
      method: 'POST',
      data: {
        comment: {
          body: payload.payload.comment,
        },
      },
    });
    if (respone) {
      yield put(actions.commentSuccess(respone));
    } else {
      yield put(actions.commentFailed());
    }
  } catch (err) {
    yield put(actions.commentFailed());
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
    } else {
      yield put(actions.followFailed());
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
    } else {
      yield put(actions.unFollowFailed());
    }
  } catch (err) {
    yield put(actions.unFollowFailed());
  }
}
export function* remove(payload) {
  try {
    yield call(request, {
      url: `/articles/${payload.payload}`,
      method: 'DELETE',
    });
    yield put(actions.removeSuccess());
  } catch (err) {
    yield put(actions.removeFailed());
  }
}
export function* removeComment(payload) {
  try {
    yield call(request, {
      url: `/articles/${payload.payload.slug}/comments/${payload.payload.id}`,
      method: 'DELETE',
    });
    yield put(actions.removeCommentSuccess(payload.payload.id));
  } catch (err) {
    yield put(actions.removeCommentFailed());
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
export function* articelPageSaga() {
  yield takeLatest(actions.get.type, get);
  yield takeLatest(actions.getComment.type, getComment);
  yield takeLatest(actions.comment.type, comment);
  yield takeLatest(actions.removeComment.type, removeComment);
  yield takeLatest(actions.remove.type, remove);
  yield takeLatest(actions.follow.type, follow);
  yield takeLatest(actions.unFollow.type, unFollow);
  yield takeLatest(actions.favorite.type, favorite);
  yield takeLatest(actions.unFavorite.type, unFavorite);
}
