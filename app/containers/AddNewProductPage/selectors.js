import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addNewProductPage state domain
 */

const selectAddNewProductPageDomain = state => state.get('addNewProductPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddNewProductPage
 */

const makeSelectAddNewProductPage = () => createSelector(selectAddNewProductPageDomain, substate => substate.toJS());

export default makeSelectAddNewProductPage;
export { selectAddNewProductPageDomain };
