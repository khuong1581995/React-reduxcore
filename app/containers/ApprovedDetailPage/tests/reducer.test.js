import { fromJS } from 'immutable';
import approvedDetailPageReducer from '../reducer';

describe('approvedDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(approvedDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
