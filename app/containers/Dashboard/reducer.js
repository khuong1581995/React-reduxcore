/*
 *
 * CustomersPage reducer
 *
 */

import { fromJS } from 'immutable';
// import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({ message: '', variant: null, status: false });

function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case 'DEFAULT_ACTION':
      return state;
    case 'CLOSE':
      return state.set('status', false);
    case 'CHANGE':
      return state.merge(action.data);
    default:
      return state;
  }
}

export default dashboardPageReducer;
