/**
 *
 * CustomersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Tabs, Tab, Fab } from '@material-ui/core';
import GridUI from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from 'components/Snackbar';
import ListAsync from '../../components/List/ListAsync';
import { makeSelectCustomersPage, makeSelectAddCustomerPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import styles from './styles';
import CustomerDashboard from '../../components/CustomerDashboard';

import { fetchAction, deleteCustomers, putConfig } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class CustomersPage extends React.Component {
  state = {
    valueForTabs: 0,
    columns: [],
    rows: [],
    status: false,
    message: { type: null, content: 'dd' },
  };

  componentDidMount() {
    this.props.listCustomer();
  }

  static getDerivedStateFromProps(props) {
    if (props.customersPage.success === true)
      return {
        rows: props.customersPage.list.map(item => ({ ...item, ...item.customerInfo })),
        columns: JSON.parse(localStorage.getItem('viewConfig')).find(item => item.code === '002').editDisplay.type.fields.type.columns,
      };
    return null;
  }

  addLink(rows) {
    return rows.map(item => ({
      ...item,
      edit: (
        <Link to={`customers/${item._id}`}>
          <Fab color="primary" size="small">
            <Edit />
          </Fab>
        </Link>
      ),
    }));
  }

  addColumn(columns) {
    return [...columns, { name: 'edit', title: 'Sửa', checked: true }];
  }

  getOrder(columns) {
    const columnOrder = [];

    // Method 1
    columns.sort((a, b) => a.order - b.order);
    columns.forEach(element => {
      columnOrder.push(element.name);
    });

    // Method 2
    // columnOrder = Array.from({ length: columns.length }, (u, v) => v);
    // columns.forEach(element => {
    //   columnOrder.splice(element.order, 1, element.name);
    // });
    return columnOrder;
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props);
    const { valueForTabs, columns, rows, status } = this.state;
    const newRows = this.addLink(rows);
    const newColumns = this.addColumn(columns);
    const columnOrder = this.getOrder(columns);
    columnOrder.push('edit');

    return (
      <div>
        <Tabs value={this.state.valueForTabs} onChange={this.handleChangeTab} indicatorColor="primary" variant="scrollable" scrollButtons="on">
          <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Dashboards" />
          <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Danh sách khách hàng" />
        </Tabs>
        <SwipeableViews index={valueForTabs} style={{ overflowX: 'scroll !important' }} onChangeIndex={this.handleChangeIndex}>
          <TabContainer style={{ maxHeight: 200 }}>
            <CustomerDashboard classes={classes} />
          </TabContainer>
          <TabContainer style={{ maxHeight: 200 }}>
            <ListAsync
              handleDelete={this.props.deleteCustomers}
              status={status}
              rows={newRows}
              columns={newColumns}
              saveConfig={this.props.saveConfig}
              columnOrder={columnOrder}
            />
          </TabContainer>
        </SwipeableViews>
        <Snackbar message={this.state.message.content} onClose={() => this.setState({ status: false })} open={status} />
      </div>
    );
  }

  handleChangeTab = (event, value) => {
    this.setState({ valueForTabs: value });
  };

  handleChangeIndex = index => {
    this.setState({ valueForTabs: index });
  };
}

function TabContainer({ children, dir }) {
  return (
    <GridUI item md={12} sm={12} dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </GridUI>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

CustomersPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  customersPage: makeSelectCustomersPage(),
  addCustomerPage: makeSelectAddCustomerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    listCustomer: () => dispatch(fetchAction()),
    // saveSetting: columns => dispatch(updateViewConfig(columns)),
    deleteCustomers: list => dispatch(deleteCustomers(list)),
    saveConfig: columns => dispatch(putConfig(columns)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'customersPage', reducer });
const withSaga = injectSaga({ key: 'customersPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(CustomersPage);
