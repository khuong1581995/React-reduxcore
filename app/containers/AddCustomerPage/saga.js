import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { API_CUSTOMERS, UPLOAD_IMG_SINGLE, GET_PROP_SET } from 'config/urlConfig';
import { getInfoSuccess, getInfoFailed, postCustomerFailed, postCustomerSuccess, putCustomerFailed, getAttributeSuccess } from './actions';
import { changeSnackbar } from '../Dashboard/actions';
// Individual exports for testing
function* getCustomer(action) {
  try {
    const data = yield call(request, `${API_CUSTOMERS}/${action.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const attributesData = yield call(request, GET_PROP_SET, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const attributes = attributesData.data;
    if (data && attributes) {
      yield put(getInfoSuccess(data, attributes));
    } else {
      yield put(changeSnackbar({ status: true, message: 'Không thể lấy dữ liệu khách hàng hoặc bộ thuộc tính', variant: 'error' }));
      yield put(getInfoFailed());
    }
  } catch (error) {
    yield put(getInfoFailed());
  }
}

function* getAttribute() {
  try {
    const attributesData = yield call(request, GET_PROP_SET, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const attributes = attributesData.data;
    yield put(getAttributeSuccess(attributes));
  } catch (error) {
    yield put(changeSnackbar({ status: true, message: 'Không thể lấy dữ liệu khách hàng hoặc bộ thuộc tính', variant: 'error' }));
  }
}

// Thêm mới khách hàng

function* postCustomer(action) {
  try {
    if (action.data.customerInfo.avatar) {
      const formData = new FormData();
      formData.append('file', action.data.customerInfo.avatar);
      const avatarURL = yield call(request, UPLOAD_IMG_SINGLE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      action.data.customerInfo.avatar = avatarURL.url;
    }

    const data = yield call(request, API_CUSTOMERS, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });
    yield put(postCustomerSuccess());
    yield put(changeSnackbar({ status: true, message: `Thêm mới khách hàng thành công khách hàng ${data.customerInfo.name}`, variant: 'success' }));
    yield put(push('/crm/customers'));
  } catch (error) {
    yield put(changeSnackbar({ status: true, message: 'Thêm mới khách hàng thất bại', variant: 'error' }));
    yield put(postCustomerFailed());
  }
}

function* putCustomer(action) {
  try {
    if (action.data.customerInfo.avatarURL) {
      const formData = new FormData();
      formData.append('file', action.data.customerInfo.avatar);
      const avatarURL = yield call(request, UPLOAD_IMG_SINGLE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      action.data.customerInfo.avatar = avatarURL.url;
    }

    const data = yield call(request, `${API_CUSTOMERS}/${action.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });
    // yield put(putCustomerSuccess(data));
    yield put(changeSnackbar({ status: true, message: `Cập nhật thành công khách hàng ${data.customerInfo.name}`, variant: 'success' }));
    yield put(push('/crm/customers'));
  } catch (error) {
    yield put(changeSnackbar({ status: true, message: 'Cập nhật thất bại', variant: 'error' }));
    yield put(putCustomerFailed());
  }
}
export default function* addCustomerPageSaga() {
  yield takeLatest('GET_INFO', getCustomer);
  yield takeLatest('POST_CUSTOMER', postCustomer);
  yield takeLatest('PUT_CUSTOMER', putCustomer);
  yield takeLatest('GET_ATTRIBUTE', getAttribute);
}
