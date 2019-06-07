/*
 *
 * HocTable reducer
 *
 */

import { fromJS } from 'immutable';

import { DEFAULT_ACTION, EDIT_VIEWCONFIG_ACTION, EDIT_VIEWCONFIG_SUCCESS, EDIT_VIEWCONFIG_FAIL } from './constants';
export const initialState = fromJS({});

function hocTableReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case EDIT_VIEWCONFIG_ACTION:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false)
        .set('body', action.body);
    case EDIT_VIEWCONFIG_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case EDIT_VIEWCONFIG_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('listProviders', action.data);
    default:
      return state;
  }
}

export default hocTableReducer;
