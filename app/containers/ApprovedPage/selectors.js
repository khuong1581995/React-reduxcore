import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the approvedPage state domain
 */

const selectApprovedPageDomain = state => state.get('approvedPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApprovedPage
 */

const makeSelectApprovedPage = () => createSelector(selectApprovedPageDomain, substate => substate.toJS());

export default makeSelectApprovedPage;
export { selectApprovedPageDomain };
