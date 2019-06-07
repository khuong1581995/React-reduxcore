import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'utils/request';
import { API_SUPPLIERS, UPLOAD_IMG_SINGLE } from 'config/urlConfig';
import { push } from 'react-router-redux';
import { postSupplierFailed, getSupplierFailed, getSupplierSuccess, putSupplierFailed } from './actions';

// Individual exports for testing
import { changeSnackbar } from '../Dashboard/actions';

function* postSupplier(action) {
  try {
    if (action.data.logoURL) {
      const formData = new FormData();
      formData.append('file', action.data.logo);
      const logoURL = yield call(request, UPLOAD_IMG_SINGLE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      action.data.logo = logoURL.url;
    }
    const data = yield call(request, API_SUPPLIERS, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });
    yield put(changeSnackbar({ message: `Thêm mới thành công ${data.data.name}`, status: true, variant: 'success' }));
    // yield put(push(`/crm/suppliers/${supplierInfo.data._id}`));
    yield put(push('/crm/suppliers'));
  } catch (error) {
    yield put(changeSnackbar({ message: 'Thêm mới thất bại', status: true, variant: 'error' }));
    yield put(postSupplierFailed());
  }
}

function* putSupplier(action) {
  try {
    if (action.data.logoURL) {
      const formData = new FormData();
      formData.append('file', action.data.logo);
      const logoURL = yield call(request, UPLOAD_IMG_SINGLE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      action.data.logo = logoURL.url;
    }
    const data = yield call(request, `${API_SUPPLIERS}/${action.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });
    yield put(changeSnackbar({ message: `Cập nhật thành công ${data.data.name}`, status: true, variant: 'success' }));
    yield put(push('/crm/suppliers'));
  } catch (error) {
    yield put(putSupplierFailed());
  }
}

function* getSupplier(action) {
  try {
    const data = yield call(request, `${API_SUPPLIERS}/${action.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (data) {
      data.supplierCode = data.code;
      const newData = { ...data, ...data.classifySupplier, logoURL: null };
      yield put(getSupplierSuccess(newData));
    } else {
      yield put(getSupplierFailed());
    }
  } catch (error) {
    yield put(getSupplierFailed());
  }
}

export default function* addSupplierPageSaga() {
  yield takeLatest('POST_SUPPLIER', postSupplier);
  yield takeLatest('PUT_SUPPLIER', putSupplier);
  yield takeLatest('GET_SUPPLIER', getSupplier);
}
