/*
 *
 * AddSupplierPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({
  supplierCode: '',
  name: '',
  email: '',
  website: '',
  phone: '',
  address: '',
  bankAccountNumber: '',
  taxCode: '',
  createdAtSupplier: '',
  charterCapital: '',
  businessRegistrationNumber: '',
  dateRange: '',
  note: '',
  logo: '',
  logoURL: '',
  representativeName: '',
  representativePhone: '',
  representativeGender: 'male',
  representativeBirthDate: '',
  representativeEmail: '',
  representativeNote: '',
  representativePosition: '',
  location: '',
  job: '',
  companyType: '',
  unit: '',
});

function addSupplierPageReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_SUPPLIER':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false)
        .set('status', false)
        .set('message', '')
        .set('variant', null);
    case 'GET_SUPPLIER_SUCCESS':
      return state.merge(action.data);
    case 'POST_SUPPLIER':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case 'POST_SUPPLIER_SUCCESS':
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('status', true)
        .set('message', 'Thêm mới nhà cung cấp thành công')
        .set('variant', 'success');
    case 'POST_SUPPLIER_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('status', true)
        .set('message', 'Tạo mới nhà cung cấp thất bại')
        .set('variant', 'error');
    case 'PUT_SUPPLIER':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case 'PUT_SUPPLIER_SUCCESS':
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('data', action.data)
        .set('status', true)
        .set('message', 'Cập nhật thành công')
        .set('variant', 'success');
    case 'UPLOAD_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('status', true)
        .set('message', 'Upload ảnh thất bại')
        .set('variant', 'error');
    case 'PUT_SUPPLIER_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('status', true)
        .set('message', 'Cập nhật thất bại')
        .set('variant', 'error');
    case 'SNACKBAR':
      return state.set('status', false);
    case 'CHANGE_NAME':
      return state.set(action.data.name, action.data.value);
    case 'CHANGE_IMAGE':
      return state.set('logo', action.data.logo).set('logoURL', action.data.logoURL);
    case 'DEFAULT_STATE':
      return state.merge(initialState);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default addSupplierPageReducer;
