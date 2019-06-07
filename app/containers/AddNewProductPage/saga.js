import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { getTagsSuccess, getTagsFailed, getPropertiesSetSuccess, getPropertiesSetFailed, getSuppliersSuccess, getSuppliersFailed } from './actions';
import { GET_TAGS } from './constants';
import { API_TAG_STOCK, SUPPLIER, GET_PROP_SET } from '../../config/urlConfig';

export function* getTags() {
  try {
    const token = localStorage.getItem('token');
    const data = yield call(request, API_TAG_STOCK, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      yield put(getTagsSuccess(data));
    } else {
      yield put(getTagsFailed({}));
    }
  } catch (err) {
    yield put(getTagsFailed(err));
  }
}

export function* getSupplier() {
  try {
    const token = localStorage.getItem('token');
    const data = yield call(request, SUPPLIER, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      yield put(getSuppliersSuccess(data));
    } else {
      yield put(getSuppliersFailed({}));
    }
  } catch (err) {
    yield put(getSuppliersFailed(err));
  }
}

export function* getPropertiesSet() {
  try {
    const data = yield call(request, GET_PROP_SET, {
      method: 'GET',
      headers: {},
    });
    if (data.status === 'success') {
      yield put(getPropertiesSetSuccess(data.data));
    } else {
      yield put(getPropertiesSetFailed({}));
    }
  } catch (err) {
    yield put(getPropertiesSetFailed(err));
  }
}

// Individual exports for testing
export default function* addNewProductPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_TAGS, getTags);
  yield takeLatest(GET_TAGS, getSupplier);
  yield takeLatest(GET_TAGS, getPropertiesSet);
}
