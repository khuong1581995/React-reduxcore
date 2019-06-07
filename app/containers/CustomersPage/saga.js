import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_CUSTOMERS, API_VIEW_CONFIG } from 'config/urlConfig';
import { fetchFailedAction, fetchSuccessAction, fetchAction, deleteCustomersFailed, putConfigSuccess, putConfigFailed } from './actions';

function* fetchCustomer() {
  try {
    const data = yield call(request, API_CUSTOMERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (data) {
      yield put(fetchSuccessAction(data));
    } else {
      yield put(fetchFailedAction());
    }
  } catch (error) {
    yield put(fetchFailedAction());
  }
}

function* deleteCustomers(action) {
  try {
    yield call(request, `${API_CUSTOMERS}/remove-more`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ customers: action.list }),
    });
    yield put(fetchAction());
  } catch (error) {
    yield put(deleteCustomersFailed());
  }
}

function* putConfig(action) {
  try {
    const data = yield call(request, `${API_VIEW_CONFIG}/${action.data._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });
    yield put(putConfigSuccess(data.data));
  } catch (error) {
    yield put(putConfigFailed());
  }
}

// Individual exports for testing
export default function* customersPageSaga() {
  yield takeLatest('FETCH_CUSTOMER', fetchCustomer);
  yield takeLatest('PUT_CONFIG', putConfig);
  yield takeLatest('DELETE_CUSTOMERS', deleteCustomers);
}
