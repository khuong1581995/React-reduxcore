import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crmCollection state domain
 */

const selectCrmCollectionDomain = state => state.get('crmCollection', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CrmCollection
 */

const makeSelectCrmCollection = () => createSelector(selectCrmCollectionDomain, substate => substate.toJS());

export default makeSelectCrmCollection;
export { selectCrmCollectionDomain };
