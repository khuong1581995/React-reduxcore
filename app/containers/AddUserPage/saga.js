// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import qs from 'qs';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { ADD_USER, GET_DEPARTMENT, EDIT_USER, GET_USER } from './constants';
import {
  addUserFalseAction,
  addUserSuccessAction,
  getDepartmentSuccess,
  getDepartmentFailed,
  editUserSuccess,
  editUserFailed,
  getUserSuccess,
  getUserFailed,
} from './actions';
import { API_USERS, API_ORIGANIZATION, CREATE, UPLOAD_IMG_SINGLE } from '../../config/urlConfig';

export function* AddUser(action) {
  const formData = new FormData();
  formData.append('file', action.body.avatar);
  const registerUser = {
    username: action.body.username,
    password: action.body.password,
    name: action.body.name,
    email: action.body.email,
    code: action.body.code,
    status: action.body.status,
  };
  const token = localStorage.getItem('token');
  try {
    let avatar;
    if (action.body.avatar === '') {
      avatar = 'http://g.lifetek.vn:203/api/files/5ceb4ca2b4ed202ad8908a23';
    } else {
      const formData = new FormData();
      formData.append('file', action.body.avatar);
      const upload = yield call(request, UPLOAD_IMG_SINGLE, {
        method: 'POST',
        headers: {},
        body: formData,
      });
      avatar = upload.url;
    }

    const dataRegister = yield call(request, CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: qs.stringify(registerUser),
    });
    if (dataRegister) {
      const createUser = {
        organizationUnit: action.body.organizationUnit,
        code: action.body.code,
        name: action.body.name,
        email: action.body.email,
        beginWork: action.body.beginWork,
        gender: action.body.gender,
        identityCardNumber: action.body.IDcard,
        phoneNumber: action.body.mobileNumber,
        address: action.body.address,
        note: action.body.note,
        positions: action.body.positions,
        avatar,
        dob: action.body.dob,
        status: action.body.status,
        username: action.body.username,
        user: dataRegister.user,
      };
      const dataCreate = yield call(request, API_USERS, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(createUser),
      });
      if (dataCreate) {
        yield put(addUserSuccessAction());
      } else {
        yield put(addUserFalseAction());
      }
    } else {
      yield put(addUserFalseAction());
    }
    // yield put(addUserSuccessAction(data));
  } catch (err) {
    yield put(addUserFalseAction(err));
  }
}

export function* editUser(action) {
  const token = localStorage.getItem('token');
  try {
    let avatar;
    if (action.body.avatar === '') {
      avatar = action.body.avatarURL;
    } else {
      const formData = new FormData();
      formData.append('file', action.body.avatar);
      const upload = yield call(request, UPLOAD_IMG_SINGLE, {
        method: 'POST',
        headers: {},
        body: formData,
      });
      avatar = upload.url;
    }
    const editUser = {
      organizationUnit: action.body.organizationUnit,
      code: action.body.code,
      name: action.body.name,
      email: action.body.email,
      beginWork: action.body.beginWork,
      gender: action.body.gender,
      identityCardNumber: action.body.IDcard,
      phoneNumber: action.body.mobileNumber,
      address: action.body.address,
      note: action.body.note,
      positions: action.body.positions,
      avatar,
      dob: action.body.dob,
      status: action.body.status,
      user: action.body.user,
    };
    const dataEdit = yield call(request, `${API_USERS}/${action.body.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(editUser),
    });
    if (dataEdit) {
      yield put(editUserSuccess());
    } else {
      yield put(editUserFailed());
    }
    // yield put(addUserSuccessAction(data));
  } catch (err) {
    yield put(editUserFailed(err));
  }
}

export function* getDepartment() {
  const token = localStorage.getItem('token');
  try {
    const data = yield call(request, API_ORIGANIZATION, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(getDepartmentSuccess(data));
  } catch (err) {
    yield put(getDepartmentFailed(err));
  }
}

export function* getUser(action) {
  const token = localStorage.getItem('token');
  try {
    const data = yield call(request, `${API_USERS}/${action.body}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.status === 'success') {
      yield put(getUserSuccess(data.data));
    } else {
      yield put(getUserFailed());
    }
  } catch (err) {
    yield put(getUserFailed(err));
  }
}

// Individual exports for testing
export default function* addUserPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(ADD_USER, AddUser);
  yield takeLatest(EDIT_USER, editUser);
  yield takeLatest(GET_DEPARTMENT, getDepartment);
}
