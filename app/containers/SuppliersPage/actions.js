/*
 *
 * SuppliersPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const getSuppliers = () => ({ type: 'GET_SUPPLIERS' });

export const deleteSuppliers = list => ({ type: 'DELETE_SUPPLIERS', list });

export const getSuppliersSuccess = data => ({ type: 'GET_SUPPLIERS_SUCCESS', data });

export const deleteSuppliersFailed = () => ({ type: 'DELETE_SUPPLIERS_FAILED' });

export const getSuppliersFailed = () => ({
  type: 'GET_SUPPLIER_FAILED',
});

export const putConfig = columns => {
  const data = JSON.parse(localStorage.getItem('viewConfig')).find(item => item.code === '009');
  data.editDisplay.type.fields.type.columns = columns.filter(item => item.name !== 'edit');
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
