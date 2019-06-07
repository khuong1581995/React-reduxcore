/*
 *
 * CrmConfigPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_ALL_STATUS,
  GET_ALL_STATUS_FAIL,
  GET_ALL_STATUS_SUCCESS,
  ADD_STATUS,
  ADD_STATUS_FAIL,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAIL,
  DELETE_STATUS_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_INDEX,
  UPDATE_STATUS_INDEX_FAIL,
  UPDATE_STATUS_INDEX_SUCCESS,
} from './constants';

export const initialState = fromJS({});

function crmConfigPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('callAPIStatus', -1);
    case GET_ALL_STATUS:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_ALL_STATUS_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case GET_ALL_STATUS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('status', action.data);
    case ADD_STATUS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('body', action.body);
    case ADD_STATUS_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('error', false)
        .set('notiMessage', action.message)
        .set('status', action.data);
    case ADD_STATUS_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('err', action.err)
        .set('error', true);
    case UPDATE_STATUS:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case UPDATE_STATUS_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('success', true)
        .set('status', action.data);
    case UPDATE_STATUS_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message);
    case UPDATE_STATUS_INDEX:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case UPDATE_STATUS_INDEX_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('success', true)
        .set('status', action.data);
    case UPDATE_STATUS_INDEX_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message);
    case DELETE_STATUS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('body', action.body);
    case DELETE_STATUS_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('status', action.data);
    case DELETE_STATUS_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message);
    default:
      return state;
  }
}

export default crmConfigPageReducer;
