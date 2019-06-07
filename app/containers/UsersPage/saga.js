// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  fetchAllUserSuccessAction,
  fetchAllUserfalseAction,
  fetchConfigSuccessAction,
  fetchConfigfalseAction,
  fetchUpdateConfigSuccessAction,
  fetchUpdateConfigfalseAction,
  fetchDeleteUsersSuccessAction,
  // fetchDelteUsersfalseAction,
  fetchListDepartmentSuccess,
  fetchListDepartmentFalse,
} from './actions';
import { GET_ALL_USER, GET_CONFIG, UPDATE_GET_CONFIG, DELETE_USERS, GET_LIST_DEPARTMENT } from './constants';
import { API_USERS, API_VIEWCONFIG, API_ORIGANIZATION } from '../../config/urlConfig';
export function* fetchGetAllUser(action) {
  try {
    // const departmentId = action.departmentId;
    let data;
    if (action.id === '') {
      data = yield call(request, API_USERS, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } else {
      data = yield call(request, `${API_USERS}?organizationUnit=${action.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }

    if (data) {
      yield put(fetchAllUserSuccessAction(data.employees));
    } else {
      yield put(fetchAllUserfalseAction({}));
    }
  } catch (err) {
    yield put(fetchAllUserfalseAction(err));
  }
}

export function* fetchGetConfig() {
  try {
    // const departmentId = action.departmentId;
    // const userId = localStorage.getItem('userId');
    const data = yield call(request, `${API_VIEWCONFIG}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (data) {
      let config = [];
      data.forEach(e => {
        if (e.path === '/setting/user') {
          config = e.editDisplay.type.fields.type;
        }
      });
      yield put(fetchConfigSuccessAction(config));
    } else {
      yield put(fetchConfigfalseAction({}));
    }
  } catch (err) {
    yield put(fetchConfigfalseAction(err));
  }
}
export function* fetchUpdateConfig(action) {
  try {
    // const departmentId = action.departmentId;

    const data = yield call(request, `${API_VIEWCONFIG}5c8ea461b74423494cb0d13d`, {
      method: 'PUT',
      body: JSON.stringify(action.body),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (data) {
      yield put(fetchUpdateConfigSuccessAction(data));
    } else {
      yield put(fetchUpdateConfigfalseAction({}));
    }
  } catch (err) {
    yield put(fetchUpdateConfigfalseAction(err));
  }
}

// export function* fetchAllDepartment() {
//   try {
//     // const departmentId = action.departmentId;

//     const data = yield call(request, API_ORIGANIZATION, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     if (data) {
//       yield put(fetchListDepartmentSuccess(data));
//     } else {
//       yield put(fetchListDepartmentFalse({}));
//     }
//   } catch (err) {
//     yield put(fetchListDepartmentFalse(err));
//   }
// }
export function* fetchDeleteUsers(action) {
  try {
    // const departmentId = action.departmentId;
    const { body } = action;
    for (let i = 0; i < body.length; i += 1) {
      yield call(request, `${API_USERS}/${body[i]}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }

    yield put(fetchDeleteUsersSuccessAction());
    const data = yield call(request, API_USERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (data) {
      yield put(fetchAllUserSuccessAction(data.employees));
    } else {
      yield put(fetchAllUserfalseAction({}));
    }
  } catch (err) {
    yield put(fetchAllUserfalseAction(err));
  }
}

export function* fetchAllDepartment() {
  try {
    // const departmentId = action.departmentId;

    const data = yield call(request, API_ORIGANIZATION, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (data) {
      yield put(fetchListDepartmentSuccess(data));
    } else {
      yield put(fetchListDepartmentFalse({}));
    }
  } catch (err) {
    yield put(fetchListDepartmentFalse(err));
  }
}

// Individual exports for testing
export default function* usersPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ALL_USER, fetchGetAllUser);
  yield takeLatest(GET_LIST_DEPARTMENT, fetchAllDepartment);
  yield takeLatest(GET_CONFIG, fetchGetConfig);
  yield takeLatest(UPDATE_GET_CONFIG, fetchUpdateConfig);
  yield takeEvery(DELETE_USERS, fetchDeleteUsers);
}
