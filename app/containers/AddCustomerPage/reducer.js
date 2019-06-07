/*
 *
 * AddCustomerPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({ snackbar: { status: false, message: '', variant: null }, attributes: [], attributeSelect: '', expanded: '' });

function addCustomerPageReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_INFO':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false)
        .set('snackbar', { status: false, message: '', variant: null });
    case 'GET_INFO_SUCCESS':
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('data', action.data)
        .set('attributes', action.attributes);
    case 'POST_CUSTOMER':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false)
        .set('snackbar', { status: false, message: '', variant: null });
    case 'POST_CUSTOMER_SUCCESS':
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('snackbar', { status: true, message: 'Thêm mới thành công', variant: 'success' });
    case 'POST_CUSTOMER_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('snackbar', { status: true, message: 'Thêm mới không thành công', variant: 'error' });
    case 'PUT_CUSTOMER':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case 'PUT_CUSTOMER_SUCCESS':
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('data', action.data)
        .set('snackbar', { status: true, message: 'Cập nhật thành công', variant: 'success' });
    case 'UPLOAD_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('snackbar', { status: true, message: 'Upload ảnh không thành công!', variant: 'error' });
    case 'PUT_CUSTOMER_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('snackbar', { status: true, message: 'Cập nhật không thành công', variant: 'error' });
    case 'SNACKBAR':
      return state.set('snackbar', { ...action.data, status: false });
    case 'CHANGE_SELECT':
      return state.set('attributeSelect', action.value);
    case 'GET_ATTRIBUTE_SUCCESS':
      return state.set('attributes', action.attributes);
    case 'CHANGE_EXPANDED':
      return state.set('expanded', action.id);

    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default addCustomerPageReducer;
