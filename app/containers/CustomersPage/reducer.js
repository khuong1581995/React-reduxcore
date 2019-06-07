/*
 *
 * CustomersPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({});

function customersPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case 'FETCH_CUSTOMER':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case 'FETCH_CUSTOMER_SUCCESS':
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('list', action.data);
    case 'FETCH_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case 'DELETE_CUSTOMERS_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case 'PUT_CONFIG':
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case 'PUT_CONFIG_SUCCESS':
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false);
    case 'PUT_CONFIG_FAILED':
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    default:
      return state;
  }
}

export default customersPageReducer;
