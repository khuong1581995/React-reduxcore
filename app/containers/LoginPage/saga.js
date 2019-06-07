import { call, put, takeLatest, all } from 'redux-saga/effects';
import qs from 'qs';
import request from '../../utils/request';
import { LOGIN } from './constants';
import { loginSuccessAction, loginFalseAction } from './actions';
import { API_LOGIN, API_GET_TOKEN, WHO_AM_I, APP_URL, API_VIEWCONFIG } from '../../config/urlConfig';
export function* featchLogin(action) {
  const newBody = {
    username: action.body.username,
    password: action.body.password,
    client_id: 'authServer',
    grant_type: 'password',
    scope: 'user',
  };
  try {
    const data = yield call(request, API_LOGIN, {
      method: 'POST',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: qs.stringify(newBody),
    });
    if (typeof data.access_token === 'string') {
      const API_GET_TOKEN_URL = `${API_GET_TOKEN}?client_id=20_CRM&allowed=true&redirect_uri=${APP_URL}/api/oauth/callback&state=antiCSRF&response_type=code&scope=user`;
      const dataGetToken = yield call(request, API_GET_TOKEN_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      if (dataGetToken.status === 'success') {
        localStorage.setItem('token', dataGetToken.data.token);
        const auth = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${dataGetToken.data.token}`,
          },
        };

        const [dataGetUserId, viewConfig] = yield all([call(request, WHO_AM_I, auth), call(request, API_VIEWCONFIG, auth)]);
        if (viewConfig) localStorage.setItem('viewConfig', JSON.stringify(viewConfig));
        if (dataGetUserId !== null) {
          localStorage.setItem('userId', dataGetUserId);
          yield put(loginSuccessAction(dataGetToken.data.token));
        }
      } else {
        yield put(loginFalseAction({}));
      }
      // yield put(loginSuccessAction(data));
    } else {
      yield put(loginFalseAction({}));
    }
  } catch (err) {
    yield put(loginFalseAction(err));
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN, featchLogin);
}
