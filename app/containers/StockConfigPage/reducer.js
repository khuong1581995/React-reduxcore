/*
 *
 * StockConfigPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_ALL_UNITS,
  GET_ALL_UNITS_FAIL,
  GET_ALL_UNITS_SUCCESS,
  ADD_UNIT,
  ADD_UNIT_FAIL,
  ADD_UNIT_SUCCESS,
  DELETE_UNITS,
  DELETE_UNITS_FAIL,
  DELETE_UNITS_SUCCESS,
  UPDATE_UNIT,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_FAIL,
  GET_ALL_SERVICES,
  GET_ALL_SERVICES_SUCCESS,
  ADD_SERVICE,
  ADD_SERVICE_FAIL,
  ADD_SERVICE_SUCCESS,
  UPDATE_SERVICE,
  UPDATE_SERVICE_FAIL,
  UPDATE_SERVICE_SUCCESS,
  DELETE_SERVICES,
  DELETE_SERVICES_FAIL,
  DELETE_SERVICES_SUCCESS,
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_SUCCESS,
  ADD_CATEGORY,
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  GET_ALL_TAGS,
  GET_ALL_TAGS_SUCCESS,
  GET_ALL_TAGS_FAIL,
  ADD_TAG,
  ADD_TAG_FAIL,
  ADD_TAG_SUCCESS,
  DELETE_TAGS,
  DELETE_TAGS_FAIL,
  DELETE_TAGS_SUCCESS,
  UPDATE_TAG,
  UPDATE_TAG_FAIL,
  UPDATE_TAG_SUCCESS,
} from './constants';

export const initialState = fromJS({});

function stockConfigPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('callAPIStatus', -1);

    case GET_ALL_UNITS:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_ALL_UNITS_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case GET_ALL_UNITS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('units', action.data);
    case ADD_UNIT:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('body', action.body);
    case ADD_UNIT_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('error', false)
        .set('notiMessage', action.message)
        .set('units', action.data);
    case ADD_UNIT_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('err', action.err)
        .set('error', true);
    case UPDATE_UNIT:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case UPDATE_UNIT_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('success', true)
        .set('units', action.data);
    case UPDATE_UNIT_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message);
    case DELETE_UNITS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('body', action.body);
    case DELETE_UNITS_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('units', action.data);
    case DELETE_UNITS_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message);
    // SERVICES

    case GET_ALL_SERVICES:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);

    case GET_ALL_SERVICES_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('services', action.data);
    case ADD_SERVICE:
      return state
        .set('loading', false)
        .set('success', false)
        .set('serviceAdded', -1)
        .set('error', false)
        .set('body', action.body);
    case ADD_SERVICE_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('services', action.data);
    case ADD_SERVICE_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('error', true);
    case UPDATE_SERVICE:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false)
        .set('serviceUpdated', -1);
    case UPDATE_SERVICE_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('success', true)
        .set('services', action.data);
    case UPDATE_SERVICE_FAIL:
      return state
        .set('loading', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('success', false)
        .set('error', true);
    case DELETE_SERVICES:
      return state
        .set('loading', false)
        .set('success', false)

        .set('error', false)
        .set('body', action.body);
    case DELETE_SERVICES_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('services', action.data);
    case DELETE_SERVICES_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('error', true);
    // CATEGORY

    case GET_ALL_CATEGORY:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);

    case GET_ALL_CATEGORY_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('categories', action.data);
    case ADD_CATEGORY:
      return state
        .set('loading', false)
        .set('success', false)

        .set('error', false)
        .set('body', action.body);
    case ADD_CATEGORY_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false);
    // .set('categories', action.data);
    case ADD_CATEGORY_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('error', true);
    case DELETE_CATEGORY:
      return state
        .set('loading', false)
        .set('success', false)

        .set('error', false)
        .set('body', action.body);
    case DELETE_CATEGORY_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message);
    case DELETE_CATEGORY_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message);
    case UPDATE_CATEGORY:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);

    case UPDATE_CATEGORY_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('success', true);

    case UPDATE_CATEGORY_FAIL:
      return state
        .set('loading', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('success', false)
        .set('error', true);
    // TAG
    case GET_ALL_TAGS:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_ALL_TAGS_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case GET_ALL_TAGS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('tags', action.data);
    case ADD_TAG:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('body', action.body);
    case ADD_TAG_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('error', false)
        .set('notiMessage', action.message)
        .set('tags', action.data);
    case ADD_TAG_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message)
        .set('err', action.err)
        .set('error', true);
    case UPDATE_TAG:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case UPDATE_TAG_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('success', true);
    // .set('tags', action.data);
    case UPDATE_TAG_FAIL:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true)
        .set('callAPIStatus', 0)
        .set('notiMessage', action.message);
    case DELETE_TAGS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('successCreate', false)
        .set('error', false)
        .set('body', action.body);
    case DELETE_TAGS_SUCCESS:
      return state
        .set('loading', false)
        .set('callAPIStatus', 1)
        .set('notiMessage', action.message)
        .set('error', false)
        .set('tags', action.data);
    case DELETE_TAGS_FAIL:
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

export default stockConfigPageReducer;
