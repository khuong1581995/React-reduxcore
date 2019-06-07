import { fromJS } from 'immutable';
import tradingDetailReducer from '../reducer';

describe('tradingDetailReducer', () => {
  it('returns the initial state', () => {
    expect(tradingDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
