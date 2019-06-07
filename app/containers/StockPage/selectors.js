import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the stockPage state domain
 */

const selectStockPageDomain = state => state.get('stockPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StockPage
 */

const makeSelectStockPage = () => createSelector(selectStockPageDomain, substate => substate.toJS());

export default makeSelectStockPage;
export { selectStockPageDomain };
