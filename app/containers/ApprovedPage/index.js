/**
 *
 * ApprovedPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { rowsApproved, columnsApproved } from 'variable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ListPage from '../../components/List/Listpage';

import makeSelectApprovedPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ApprovedPage extends React.Component {
  render() {
    return (
      <div>
        <ListPage rows={rowsApproved} columns={columnsApproved} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  approvedPage: makeSelectApprovedPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'approvedPage', reducer });
const withSaga = injectSaga({ key: 'approvedPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ApprovedPage);
