/*
 *
 * AddNewProductPage actions
 *
 */

import {
  DEFAULT_ACTION,
  RESET_NOTI,
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILED,
  GET_SUPPLIER,
  GET_SUPPLIER_SUCCESS,
  GET_SUPPLIER_FAILED,
  GET_PROPERTIES_SET,
  GET_PROPERTIES_SET_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function resetNoti() {
  return {
    type: RESET_NOTI,
  };
}
// get tags
export function getTagsAct(body) {
  return {
    type: GET_TAGS,
    body,
  };
}
export function getTagsSuccess(data) {
  return {
    type: GET_TAGS_SUCCESS,
    data,
  };
}
export function getTagsFailed(err) {
  return {
    type: GET_TAGS_FAILED,
    err,
  };
}

// get supplier
export function getSuppliersAct(body) {
  return {
    type: GET_SUPPLIER,
    body,
  };
}
export function getSuppliersSuccess(data) {
  return {
    type: GET_SUPPLIER_SUCCESS,
    data,
  };
}
export function getSuppliersFailed(err) {
  return {
    type: GET_SUPPLIER_FAILED,
    err,
  };
}

// get properties set
export function getPropertiesSetAct(body) {
  return {
    type: GET_PROPERTIES_SET,
    body,
  };
}
export function getPropertiesSetSuccess(data) {
  return {
    type: GET_PROPERTIES_SET_SUCCESS,
    data,
  };
}
export function getPropertiesSetFailed(err) {
  return {
    type: GET_PROPERTIES_SET,
    err,
  };
}
