/*
 *
 * SystemConfigPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  RESET_NOTI,
  GET_SYS_CONF,
  GET_SYS_CONF_FAILED,
  GET_SYS_CONF_SUCCESS,
  UPDATE_SYS_CONF,
  UPDATE_SYS_CONF_FAILED,
  UPDATE_SYS_CONF_SUCCESS,
} from './constants';

export const initialState = fromJS({});

function systemConfigPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET_NOTI:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successDelete', false)
        .set('successUpdate', false)
        .set('error', false);
    case GET_SYS_CONF:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_SYS_CONF_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('sysConf', action.data || {});
    case GET_SYS_CONF_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case UPDATE_SYS_CONF:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case UPDATE_SYS_CONF_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('sysConf', action.data || {});
    case UPDATE_SYS_CONF_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    default:
      return state;
  }
}

export default systemConfigPageReducer;
