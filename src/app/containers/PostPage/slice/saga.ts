/*
 *
 * PostPage Saga
 *
 */
import { call, takeLatest } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
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

export function* create(payload) {
  try {
    const respone = yield call(request, {
      url: '/articles',
      method: 'POST',
      data: {
        article: {
          title: payload.payload.title,
          description: payload.payload.description,
          body: payload.payload.body,
          tagList: payload.payload.tagList,
        },
      },
    });

    if (respone) {
      yield put(actions.createSucceed(respone));
    } else {
      yield put(actions.createFailed());
    }
  } catch (err) {
    yield put(actions.createFailed());
  }
}

export function* update(payload) {
  try {
    const respone = yield call(request, {
      url: `/articles/${payload.payload.slug}`,
      method: 'PUT',
      data: {
        article: {
          title: payload.payload.title,
          description: payload.payload.description,
          body: payload.payload.body,
          tagList: payload.payload.tagList,
        },
      },
    });

    if (respone) {
      yield put(actions.updateSucceed(respone));
    } else {
      yield put(actions.updateFailed());
    }
  } catch (err) {
    yield put(actions.updateFailed());
  }
}

export function* postPageSaga() {
  yield takeLatest(actions.get.type, get);
  yield takeLatest(actions.create.type, create);
  yield takeLatest(actions.update.type, update);
}
