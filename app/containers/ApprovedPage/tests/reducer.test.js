import { fromJS } from 'immutable';
import approvedPageReducer from '../reducer';

describe('approvedPageReducer', () => {
  it('returns the initial state', () => {
    expect(approvedPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
