import { takeLatest, call, put } from 'redux-saga/effects';
import { DYNAMIC_COLLECTION } from '../../config/urlConfig';
import request from '../../utils/request';
import {
  getAllCRMCollectionSuccess,
  getAllCRMCollectionFalse,
  postAddNewCollectionSuccess,
  postAddNewCollectionFalse,
  putUpdateCollectionSuccess,
  putUpdateCollectionFalse,
} from './actions';
import { GET_ALL_COLLECTION, ADD_NEW_COLLECTION, EDIT_COLLECTION } from './constants';
export function* fetchAllCRMCollection() {
  try {
    const data = yield call(request, DYNAMIC_COLLECTION, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    yield put(getAllCRMCollectionSuccess(data));
  } catch (err) {
    yield put(getAllCRMCollectionFalse(err));
  }
}
export function* fetchAddCRMCollection(action) {
  try {
    const data = yield call(request, DYNAMIC_COLLECTION, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(action.body),
    });
    yield put(postAddNewCollectionSuccess(data));
  } catch (err) {
    yield put(postAddNewCollectionFalse(err));
  }
}
export function* fetchUpdateCRMCollection(action) {
  try {
    const data = yield call(request, DYNAMIC_COLLECTION, {
      method: 'POST',
      body: JSON.stringify(action.body),
    });
    yield put(putUpdateCollectionSuccess(data));
  } catch (err) {
    yield put(putUpdateCollectionFalse(err));
  }
}

// Individual exports for testing
export default function* addNewCrmCollectionSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ALL_COLLECTION, fetchAllCRMCollection);
  yield takeLatest(ADD_NEW_COLLECTION, fetchAddCRMCollection);
  yield takeLatest(EDIT_COLLECTION, fetchUpdateCRMCollection);
}
