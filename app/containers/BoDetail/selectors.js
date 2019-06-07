import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the boDetail state domain
 */

const selectBoDetailDomain = state => state.get('boDetail', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BoDetail
 */

const makeSelectBoDetail = () => createSelector(selectBoDetailDomain, substate => substate.toJS());

export default makeSelectBoDetail;
export { selectBoDetailDomain };
