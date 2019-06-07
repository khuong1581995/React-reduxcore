/*
 *
 * SuppliersPage actions
 *
 */

// import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: 'DEFAULT_ACTION',
  };
}

export const closeSnackbar = () => ({ type: 'CLOSE' });

export const changeSnackbar = data => ({ type: 'CHANGE', data });
