/*
 *
 * AddUserPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_DEPARTMENT,
  GET_DEPARTMENT_SUCCESS,
  GET_DEPARTMENT_FAILED,
  RESET_NOTI,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FALSE,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from './constants';

export const initialState = fromJS({
  listOrganizationUnit: [],
});

function addUserPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET_NOTI:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false);
    case GET_DEPARTMENT:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('body', action.body);
    case GET_DEPARTMENT_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('listOrganizationUnit', action.data);
    case GET_DEPARTMENT_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case ADD_USER:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('body', action.body);
    case ADD_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('successCreate', true)
        .set('error', false);
    case ADD_USER_FALSE:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', true);
    case EDIT_USER:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('body', action.body);
    case EDIT_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('successCreate', true)
        .set('error', false);
    case EDIT_USER_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', true);
    case GET_USER:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('body', action.body);
    case GET_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('user', action.data)
        .set('error', false);
    case GET_USER_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    default:
      return state;
  }
}

export default addUserPageReducer;
