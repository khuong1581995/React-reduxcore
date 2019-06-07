import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import request from '../../utils/request';
import { API_UPDATE_VIEWCONFIG } from '../../config/urlConfig';
import { editViewConfigAction, editViewConfigFailAction, editViewConfigSuccessAction } from './actions';
import { EDIT_VIEWCONFIG_ACTION, EDIT_VIEWCONFIG_SUCCESS, EDIT_VIEWCONFIG_FAIL } from './constants';

// Individual exports for testing
export function* fetchEditViewConfig(action) {
  const token = localStorage.getItem('token');

  try {
    console.log(action);
    const newViewConfig = action.newViewConfig;
    delete newViewConfig.createdAt;
    delete newViewConfig.updatedAt;
    console.log(newViewConfig);

    const editViewConfig = yield call(request, `${API_UPDATE_VIEWCONFIG}/${newViewConfig._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.newViewConfig),
    });
  } catch (err) {
    // yield put(addUserFalseAction(err));
  }
}
export default function* hocTableSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(EDIT_VIEWCONFIG_ACTION, fetchEditViewConfig);
}
