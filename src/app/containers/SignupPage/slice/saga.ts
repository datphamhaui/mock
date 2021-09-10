/*
 *
 * SignupPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* signup(payload) {
  try {
    const respone = yield call(
      request,
      {
        url: '/users',
        method: 'POST',
        data: {
          user: {
            email: payload.payload.email,
            username: payload.payload.username,
            password: payload.payload.password,
          },
        },
      },
      error => {
        if (error.request.status === 422) {
          alert('Username or Email already taken');
        }
      },
    );
    if (respone) {
      yield put(actions.signupSuccess(respone));
    } else {
      yield put(actions.signupFailures());
    }
  } catch (err) {
    yield put(actions.signupFailures());
  }
}

export function* signupPageSaga() {
  yield takeLatest(actions.signup.type, signup);
}
