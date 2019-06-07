import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hocTable state domain
 */

const selectHocTableDomain = state => state.get('hocTable', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HocTable
 */

const makeSelectHocTable = () => createSelector(selectHocTableDomain, substate => substate.toJS());

export default makeSelectHocTable;
export { selectHocTableDomain };
