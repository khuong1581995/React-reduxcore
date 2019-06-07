import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tradingDetail state domain
 */

const selectTradingDetailDomain = state => state.get('tradingDetail', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TradingDetail
 */

const makeSelectTradingDetail = () => createSelector(selectTradingDetailDomain, substate => substate.toJS());

export default makeSelectTradingDetail;
export { selectTradingDetailDomain };
