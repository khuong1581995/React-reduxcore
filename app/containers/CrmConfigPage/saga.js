import { call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import { API_STATUS_CRMCONFIG } from '../../config/urlConfig';
// import lodash from 'lodash';
import request from '../../utils/request';
import { makeSelectBody } from './selectors';
import {
  fetchAllStatusFailAction,
  fetchAllStatusSuccessAction,
  addStatusSuccessAction,
  addStatusFailAction,
  updateStatusFailAction,
  updateStatusSuccessAction,
  deleteStatusSuccessAction,
  deleteStatusFailAction,
  updateStatusIndexSuccessAction,
  updateStatusIndexFailAction,
} from './actions';
import { GET_ALL_STATUS, ADD_STATUS, DELETE_STATUS, UPDATE_STATUS, UPDATE_STATUS_INDEX } from './constants';
export function* fetchGetAllStatus() {
  try {
    const data = yield call(request, API_STATUS_CRMCONFIG, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (data) {
      yield put(fetchAllStatusSuccessAction(data));
    } else {
      yield put(fetchAllStatusSuccessAction({}));
    }
  } catch (err) {
    yield put(fetchAllStatusFailAction(err));
  }
}
export function* fetchAddStatus(action) {
  const token = localStorage.getItem('token');
  // console.log(action);
  try {
    // console.log('action', action.body);
    const addStatus = yield call(request, `${API_STATUS_CRMCONFIG}/createitem/${action.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(action.body),
    });
    if (addStatus) {
      const oldStatus = yield select(makeSelectBody('status'));
      oldStatus[oldStatus.findIndex(d => d._id === action.id)].data = addStatus.data;
      // oldStatus.push(addStatus.data);

      yield put(addStatusSuccessAction(oldStatus, 'Thêm trạng thái thành công'));
    }
  } catch (err) {
    yield put(addStatusFailAction(err, 'Thêm trạng thái thất bại'));
  }
}
export function* fetchDeleteStatus(action) {
  const token = localStorage.getItem('token');

  try {
    const deletedStatus = yield call(request, `${API_STATUS_CRMCONFIG}/deleteitem/${action.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: action.statusId }),
    });

    if (deletedStatus) {
      const oldStatus = yield select(makeSelectBody('status'));
      oldStatus[oldStatus.findIndex(d => d._id === action.id)] = deletedStatus;

      yield put(deleteStatusSuccessAction(oldStatus, 'Xóa trạng thái thành công'));
    }
  } catch (err) {
    yield put(deleteStatusFailAction(err, 'Xóa trạng thái thất bại'));
  }
}
export function* fetchUpdateStatus(action) {
  const token = localStorage.getItem('token');
  // console.log(action.body);
  const newData = action.body;
  newData.id = newData._id;
  delete newData._id;
  try {
    const updateStatus = yield call(request, `${API_STATUS_CRMCONFIG}/updateitem/${action.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(newData),
    });

    // console.log(updateStatus);
    if (updateStatus) {
      const oldStatus = yield select(makeSelectBody('status'));

      oldStatus[oldStatus.findIndex(d => d._id === updateStatus._id)] = updateStatus;

      yield put(updateStatusSuccessAction(oldStatus, 'Cập nhật trạng thái thành công'));
    }
  } catch (err) {
    yield put(updateStatusFailAction(err, 'Cập nhật trạng thái thất bại'));
  }
}
export function* fetchUpdateStatusIndex(action) {
  const token = localStorage.getItem('token');
  console.log(action.body);
  try {
    const updateStatus = yield call(request, `${API_STATUS_CRMCONFIG}/updateIndex/${action.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: action.body }),
    });

    if (updateStatus) {
      console.log(updateStatus);
      const oldStatus = yield select(makeSelectBody('status'));

      oldStatus[oldStatus.findIndex(d => d._id === updateStatus._id)] = updateStatus;

      yield put(updateStatusIndexSuccessAction(oldStatus, 'Cập nhật trạng thái thành công'));
    }
  } catch (err) {
    yield put(updateStatusIndexFailAction(err, 'Cập nhật trạng thái thất bại'));
  }
}
// Individual exports for testing
export default function* crmConfigPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ALL_STATUS, fetchGetAllStatus);
  yield takeLatest(ADD_STATUS, fetchAddStatus);
  yield takeLatest(DELETE_STATUS, fetchDeleteStatus);
  yield takeLatest(UPDATE_STATUS, fetchUpdateStatus);
  yield takeLatest(UPDATE_STATUS_INDEX, fetchUpdateStatusIndex);
}
