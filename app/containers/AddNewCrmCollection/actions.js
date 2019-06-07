/*
 *
 * AddNewCrmCollection actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_COLLECTION,
  GET_ALL_COLLECTION_FALSE,
  ADD_NEW_COLLECTION,
  ADD_NEW_COLLECTION_SUCCESS,
  ADD_NEW_COLLECTION_FALSE,
  EDIT_COLLECTION_SUCCESS,
  EDIT_COLLECTION_FALSE,
  GET_ALL_COLLECTION_SUCCESS,
  EDIT_COLLECTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllCollection() {
  return {
    type: GET_ALL_COLLECTION,
  };
}
export function getAllCRMCollectionSuccess(data) {
  return {
    type: GET_ALL_COLLECTION_SUCCESS,
    data,
  };
}
export function getAllCRMCollectionFalse(err) {
  return {
    type: GET_ALL_COLLECTION_FALSE,
    err,
  };
}

export function postAddNewCollection(body) {
  return {
    type: ADD_NEW_COLLECTION,
    body,
  };
}
export function postAddNewCollectionSuccess(data) {
  return {
    type: ADD_NEW_COLLECTION_SUCCESS,
    data,
  };
}
export function postAddNewCollectionFalse(err) {
  return {
    type: ADD_NEW_COLLECTION_FALSE,
    err,
  };
}

export function putUpdateCollection(body) {
  return {
    type: EDIT_COLLECTION,
    body,
  };
}
export function putUpdateCollectionSuccess(data) {
  return {
    type: EDIT_COLLECTION_SUCCESS,
    data,
  };
}
export function putUpdateCollectionFalse(err) {
  return {
    type: EDIT_COLLECTION_FALSE,
    err,
  };
}
