import { put, call } from 'redux-saga/effects';

// Individual exports for testing
import request from '../../utils/request';
import { SYS_CONF, UPLOAD_IMG_SINGLE } from '../../config/urlConfig';
import { getSysConfFailed, getSysConfSuccess, updateSysConfSuccess, updateSysConfFailed } from './actions';
// import { UPDATE_SYS_CONF, GET_SYS_CONF } from './constants';

export function* getSysConf() {
  const token = localStorage.getItem('token');
  try {
    const data = yield call(request, SYS_CONF, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (data === true) {
      yield put(getSysConfSuccess(data));
    } else {
      yield put(getSysConfFailed());
    }
  } catch (error) {
    yield put(getSysConfFailed(error));
  }
}

// export function* updateSysConf(){
//   const token = localStorage.getItem('token');
//   try{
//     const data
//   }
// }

export default function* systemConfigPageSaga() {
  // See example in containers/HomePage/saga.js
}
