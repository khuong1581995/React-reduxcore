/*
 *
 * AddNewProductPage reducer
 *
 */

import { fromJS } from 'immutable';
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
  GET_PROPERTIES_SET_FAILED,
} from './constants';

export const initialState = fromJS({});

function addNewProductPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET_NOTI:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false);
    case GET_TAGS:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_TAGS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('tagsList', action.data)
        .set('error', false);
    case GET_TAGS_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case GET_SUPPLIER:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_SUPPLIER_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('suppliersList', action.data)
        .set('error', false);
    case GET_SUPPLIER_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case GET_PROPERTIES_SET:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_PROPERTIES_SET_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('propertiesSet', action.data)
        .set('error', false);
    case GET_PROPERTIES_SET_FAILED:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    default:
      return state;
  }
}

export default addNewProductPageReducer;
