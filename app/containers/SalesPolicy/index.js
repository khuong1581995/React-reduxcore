import React from 'react';
import ListPage from 'components/List/ListPage';
import { rowsSale, columnsSale } from 'variable';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const rows = rowsSale.map(row => {
  const edit = (
    <Link to="/setting/sales_policy/-1">
      <Fab size="small">
        <Edit />
      </Fab>
    </Link>
  );
  return { ...row, edit };
});

const columns = [...columnsSale, { name: 'edit', title: 'Hành động', visibility: true }];

const SalesPolicy = props => <ListPage path={props.match.path} rows={rows} columns={columns} />;

SalesPolicy.propTypes = {
  match: PropTypes.object,
};
export default SalesPolicy;
