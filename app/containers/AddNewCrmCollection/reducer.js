/*
 *
 * AddNewCrmCollection reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_ALL_COLLECTION,
  GET_ALL_COLLECTION_SUCCESS,
  GET_ALL_COLLECTION_FALSE,
  ADD_NEW_COLLECTION_FALSE,
  ADD_NEW_COLLECTION_SUCCESS,
  ADD_NEW_COLLECTION,
} from './constants';

export const initialState = fromJS({});

function addNewCrmCollectionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
        .set('addLoading', false)
        .set('addSuccess', false)
        .set('addError', false);
    case GET_ALL_COLLECTION:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_ALL_COLLECTION_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('allCRMCollection', action.data);
    case GET_ALL_COLLECTION_FALSE:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case ADD_NEW_COLLECTION:
      return state
        .set('addLoading', true)
        .set('addSuccess', false)
        .set('addError', false);
    case ADD_NEW_COLLECTION_SUCCESS:
      return state
        .set('addLoading', false)
        .set('addSuccess', true)
        .set('addError', false);
    case ADD_NEW_COLLECTION_FALSE:
      return state
        .set('addLoading', false)
        .set('addSuccess', false)
        .set('addError', true);
    default:
      return state;
  }
}

export default addNewCrmCollectionReducer;
