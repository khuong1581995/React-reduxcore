/*
 *
 * CustomersPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const fetchAction = () => ({ type: 'FETCH_CUSTOMER' });

export const deleteCustomers = list => ({ type: 'DELETE_CUSTOMERS', list });

export const fetchSuccessAction = data => ({ type: 'FETCH_CUSTOMER_SUCCESS', data });

export const deleteCustomersFailed = () => ({ type: 'DELETE_CUSTOMERS_FAILED' });

export const fetchFailedAction = () => ({
  type: 'FETCH_FAILED',
});

export const putConfig = columns => {
  const data = JSON.parse(localStorage.getItem('viewConfig')).find(item => item.code === '002');
  data.editDisplay.type.fields.type.columns = columns;
  return { type: 'PUT_CONFIG', data };
};

export const putConfigSuccess = data => {
  const viewConfig = JSON.parse(localStorage.getItem('viewConfig'));
  data._id = data.id;
  const newData = data.editDisplay.type.fields.type.columns.filter(column => column.name !== 'edit');
  data.editDisplay.type.fields.type.columns = newData;
  const newView = viewConfig.map(item => {
    if (item._id === data._id) return { ...item, editDisplay: data.editDisplay };
    return item;
  });
  localStorage.setItem('viewConfig', JSON.stringify(newView));

  return { type: 'PUT_CONFIG_SUCCESS' };
};

export const putConfigFailed = () => ({ type: 'PUT_CONFIG_FAILED' });
