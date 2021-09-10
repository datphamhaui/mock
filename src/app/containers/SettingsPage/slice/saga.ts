/*
 *
 * SettingsPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* updateUser(payload) {
  try {
    const respone = yield call(request, {
      url: `/user`,
      method: 'PUT',
      data: {
        user: {
          email: payload.payload.email,
          bio: payload.payload.bio,
          image: payload.payload.image,
        },
      },
    });
    if (respone) {
      yield put(actions.putSucceed(respone));
    } else {
      yield put(actions.putFailed());
    }
  } catch (err) {
    yield put(actions.putFailed());
  }
}

export function* settingsPageSaga() {
  yield takeLatest(actions.put.type, updateUser);
}
