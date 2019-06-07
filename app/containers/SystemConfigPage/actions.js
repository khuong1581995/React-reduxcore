/*
 *
 * SystemConfigPage actions
 *
 */

import {
  DEFAULT_ACTION,
  RESET_NOTI,
  GET_SYS_CONF,
  GET_SYS_CONF_SUCCESS,
  GET_SYS_CONF_FAILED,
  UPDATE_SYS_CONF,
  UPDATE_SYS_CONF_SUCCESS,
  UPDATE_SYS_CONF_FAILED,
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
export function getSysConfAct(body) {
  return {
    type: GET_SYS_CONF,
    body,
  };
}

export function getSysConfSuccess(data) {
  return {
    type: GET_SYS_CONF_SUCCESS,
    data,
  };
}
export function getSysConfFailed(err) {
  return {
    type: GET_SYS_CONF_FAILED,
    err,
  };
}
export function updateSysConfAct(body) {
  return {
    type: UPDATE_SYS_CONF,
    body,
  };
}
export function updateSysConfSuccess(data) {
  return {
    type: UPDATE_SYS_CONF_SUCCESS,
    data,
  };
}
export function updateSysConfFailed(err) {
  return {
    type: UPDATE_SYS_CONF_FAILED,
    err,
  };
}
