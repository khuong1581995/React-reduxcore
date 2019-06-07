/**
 *
 * SuppliersPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Fab, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSuppliersPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getSuppliers, deleteSuppliers, putConfig } from './actions';
import avatarDefault from '../../images/avatar.jpg';
import ListAsync from '../../components/List/ListAsync';

class SuppliersPage extends React.Component {
  addLink(rows) {
    return rows.map(item => ({
      ...item,
      edit: (
        <Link to={`suppliers/${item._id}`}>
          <Fab color="primary" size="small">
            <Edit />
          </Fab>
        </Link>
      ),
      logo: <Avatar src={item.logo ? item.logo : avatarDefault} />,
      representativeGender: item.representativeGender === 'male' ? 'Nam' : item.representativeGender === 'female' ? 'Nữ' : 'Không xác định',
    }));
  }

  addColumn() {
    const newColumns = JSON.parse(localStorage.getItem('viewConfig')).find(item => item.code === '009').editDisplay.type.fields.type.columns;
    return [...newColumns, { name: 'edit', title: 'Sửa', checked: true }];
  }

  getOrder(columns) {
    const columnOrder = [];
    columns.sort((a, b) => a.order - b.order);
    columns.forEach(element => {
      columnOrder.push(element.name);
    });
    return columnOrder;
  }

  componentDidMount() {
    this.props.getSuppliers();
  }

  render() {
    const columns = this.addColumn();
    const columnOrder = this.getOrder(columns);
    const rows = this.addLink(this.props.suppliersPage.rows);
    return (
      <div>
        <ListAsync
          handleDelete={this.props.deleteSuppliers}
          rows={rows}
          columns={columns}
          saveConfig={this.props.saveConfig}
          columnOrder={columnOrder}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  suppliersPage: makeSelectSuppliersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSuppliers: () => dispatch(getSuppliers()),
    deleteSuppliers: list => dispatch(deleteSuppliers(list)),
    saveConfig: columns => dispatch(putConfig(columns)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'suppliersPage', reducer });
const withSaga = injectSaga({ key: 'suppliersPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SuppliersPage);
