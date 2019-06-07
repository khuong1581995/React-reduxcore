/*
 *
 * CrmConfigPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_STATUS,
  GET_ALL_STATUS_SUCCESS,
  GET_ALL_STATUS_FAIL,
  ADD_STATUS,
  ADD_STATUS_FAIL,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAIL,
  DELETE_STATUS_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_INDEX,
  UPDATE_STATUS_INDEX_FAIL,
  UPDATE_STATUS_INDEX_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function fetchAllStatusAction(id) {
  return {
    type: GET_ALL_STATUS,
    id,
  };
}
export function fetchAllStatusSuccessAction(data, message) {
  return {
    type: GET_ALL_STATUS_SUCCESS,
    data,
    message,
  };
}
export function fetchAllStatusFailAction(err, message) {
  return {
    type: GET_ALL_STATUS_FAIL,
    err,
    message,
  };
}
export function addStatusAction(body, id) {
  return {
    type: ADD_STATUS,
    body,
    id,
  };
}
export function addStatusSuccessAction(data, message) {
  return {
    type: ADD_STATUS_SUCCESS,
    data,
    message,
  };
}
export function addStatusFailAction(err, message) {
  return {
    type: ADD_STATUS_FAIL,
    err,
    message,
  };
}
export function deleteStatusAction(statusId, id) {
  return {
    type: DELETE_STATUS,
    statusId,
    id,
  };
}
export function deleteStatusSuccessAction(data, message) {
  return {
    type: DELETE_STATUS_SUCCESS,
    data,
    message,
  };
}
export function deleteStatusFailAction(err, message) {
  return {
    type: DELETE_STATUS_FAIL,
    err,
    message,
  };
}
export function updateStatusAction(body, id) {
  return {
    type: UPDATE_STATUS,
    body,
    id,
  };
}
export function updateStatusSuccessAction(data, message) {
  return {
    type: UPDATE_STATUS_SUCCESS,
    data,
    message,
  };
}
export function updateStatusFailAction(err, message) {
  return {
    type: UPDATE_STATUS_FAIL,
    err,
    message,
  };
}
export function updateStatusIndexAction(body, id) {
  return {
    type: UPDATE_STATUS_INDEX,
    body,
    id,
  };
}
export function updateStatusIndexSuccessAction(data, message) {
  return {
    type: UPDATE_STATUS_INDEX_SUCCESS,
    data,
    message,
  };
}
export function updateStatusIndexFailAction(err, message) {
  return {
    type: UPDATE_STATUS_INDEX_FAIL,
    err,
    message,
  };
}
export function resetNotis() {
  return {
    type: DEFAULT_ACTION,
  };
}
