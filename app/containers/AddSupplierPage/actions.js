/*
 *
 * AddSupplierPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';
export const defaultAction = () => ({ type: DEFAULT_ACTION });
export const getSupplier = id => ({ type: 'GET_SUPPLIER', id });
export const getSupplierSuccess = data => ({ type: 'GET_SUPPLIER_SUCCESS', data });
export const getSupplierFailed = () => ({ type: 'GET_SUPPLIER_FAILED' });
export const postSupplier = data => ({ type: 'POST_SUPPLIER', data });
export const postSupplierSuccess = () => ({ type: 'POST_SUPPLIER_SUCCESS' });
export const postSupplierFailed = () => ({ type: 'POST_SUPPLIER_FAILED' });
export const putSupplier = (id, data) => ({ type: 'PUT_SUPPLIER', id, data });
export const putSupplierSuccess = data => ({ type: 'PUT_SUPPLIER_SUCCESS', data });
export const putSupplierFailed = () => ({ type: 'PUT_SUPPLIER_FAILED' });
export const snackbar = () => ({ type: 'SNACKBAR' });
export const uploadFailed = () => ({ type: 'UPLOAD_FAILED' });
export const changeValue = data => ({ type: 'CHANGE_NAME', data });
export const changeImage = data => ({ type: 'CHANGE_IMAGE', data });
export const setDefaultState = () => ({ type: 'DEFAULT_STATE' });
