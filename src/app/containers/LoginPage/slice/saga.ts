/*
 *
 * LoginPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* login(payload) {
  try {
    const respone = yield call(
      request,
      {
        url: '/users/login',
        method: 'POST',
        data: {
          user: {
            email: payload.payload.email,
            password: payload.payload.password,
          },
        },
      },
      error => {
        if (error.request.status === 422) {
          alert('Email or password is invalid');
        }
      },
    );
    if (respone) {
      yield put(actions.loginSuccess(respone));
    } else {
      yield put(actions.loginFailures());
    }
  } catch (err) {
    yield put(actions.loginFailures());
  }
}

export function* loginPageSaga() {
  yield takeLatest(actions.login.type, login);
}
