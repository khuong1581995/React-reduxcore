/*
 *
 * HocTable actions
 *
 */

import { DEFAULT_ACTION, EDIT_VIEWCONFIG_ACTION, EDIT_VIEWCONFIG_SUCCESS, EDIT_VIEWCONFIG_FAIL } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function editViewConfigAction(newViewConfig) {
  return {
    type: EDIT_VIEWCONFIG_ACTION,
    newViewConfig,
  };
}
export function editViewConfigSuccessAction(data) {
  return {
    type: EDIT_VIEWCONFIG_SUCCESS,
    data,
  };
}
export function editViewConfigFailAction() {
  return {
    type: EDIT_VIEWCONFIG_FAIL,
  };
}
