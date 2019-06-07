// import { take, call, put, select } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import request from '../../utils/request';
import { API_PROVIDERS } from '../../config/urlConfig';
// import { DEFAULT_ACTION, GET_ALL_PROVIDERS, GET_ALL_PROVIDERS_FAIL, GET_ALL_PROVIDERS_SUCCESS } from './constants';
// Individual exports for testing
export function* fetchGetAllProviders() {
  try {
    const data = yield call(request, API_PROVIDERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (data) {
      // yield put(fetchAllUserSuccessAction(data.employees));
    } else {
      // yield put(fetchAllUserfalseAction({}));
    }
  } catch (err) {
    // yield put(fetchAllUserfalseAction(err));
  }
}
export default function* stockPageSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(GET_ALL_PROVIDERS, fetchGetAllProviders);
  // yield takeLatest(GET_ALL_USER, fetchAllDepartment);
  // yield takeLatest(GET_CONFIG, fetchGetConfig);
  // yield takeLatest(UPDATE_GET_CONFIG, fetchUpdateConfig);
  // yield takeEvery(DELETE_USERS, fetchDeleteUsers);
}
