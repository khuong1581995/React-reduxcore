import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the approvedDetailPage state domain
 */

const selectApprovedDetailPageDomain = state => state.get('approvedDetailPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApprovedDetailPage
 */

const makeSelectApprovedDetailPage = () => createSelector(selectApprovedDetailPageDomain, substate => substate.toJS());

export default makeSelectApprovedDetailPage;
export { selectApprovedDetailPageDomain };
