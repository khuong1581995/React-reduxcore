import { fromJS } from 'immutable';
import boDetailReducer from '../reducer';

describe('boDetailReducer', () => {
  it('returns the initial state', () => {
    expect(boDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
