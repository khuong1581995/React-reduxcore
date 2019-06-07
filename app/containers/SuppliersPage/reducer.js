/*
 *
 * SuppliersPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({ rows: [] });

function suppliersPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case 'GET_SUPPLIERS_SUCCESS':
      return state.set('rows', action.data);
    default:
      return state;
  }
}

export default suppliersPageReducer;
