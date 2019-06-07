/**
 *
 * Provider
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Dialog, DialogContent, DialogActions, Button, TextField, DialogTitle } from '@material-ui/core';
import HOCTable from '../../containers/HocTable';
import LoadingIndicator from '../LoadingIndicator';

/* eslint-disable react/prefer-stateless-function */
const fakeViewConfig = [
  {
    name: 'name',
    title: 'Tên Đại lý',
    type: 'String',
    checked: true,
    order: 0,
  },
  {
    name: 'code',
    title: 'Mã Đại lý',
    type: 'String',
    checked: true,
    order: 1,
  },
  {
    name: 'phoneNumber',
    title: 'Số điện thoại',
    type: 'String',
    checked: true,
    order: 2,
  },
  {
    name: 'email',
    title: 'Email',
    type: 'String',
    checked: true,
    order: 2,
  },
];
class Provider extends React.Component {
  state = {
    open: false,
    newProvider: {},
    isEditting: false,
  };

  handleAddClick = () => {
    this.setState({
      open: true,
      isEditting: false,
      newProvider: {},
    });
  };

  handleEditClick = item => {
    this.setState({
      isEditting: true,
      newProvider: item,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddNewProvider = () => {
    // console.log(this.state);
    this.setState({
      open: false,
    });
    this.props.addNewProvider(this.state.newProvider);
  };

  handleUpdateProvider = () => {};

  handleDeleteClick = selection => {
    this.props.deleteProviders(selection);
  };

  render() {
    return (
      <div>
        {this.props.data ? (
          <HOCTable
            columns={[
              { name: 'code', title: 'Mã đại lý' },
              { name: 'name', title: 'Tên đại lý' },
              { name: 'address', title: 'Địa chỉ' },
              { name: 'phoneNumber', title: 'Số điện thoại' },
            ]}
            data={this.props.data}
            enableEdit
            handleAddClick={this.handleAddClick}
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.handleDeleteClick}
          />
        ) : (
          <LoadingIndicator />
        )}
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.isEditting ? 'Sửa thông tin đại lý' : 'Thêm đại lý'}</DialogTitle>
          <DialogContent>
            {fakeViewConfig.map(item => (
              <TextField
                onChange={event => {
                  this.state.newProvider[item.name] = event.target.value;
                }}
                value={this.state.newProvider[item.name]}
                autoFocus
                margin="dense"
                id="name"
                label={item.title}
                variant="outlined"
                fullWidth
              />
            ))}

            {/* <TextField inputRef autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Hủy
            </Button>
            <Button
              onClick={() => {
                this.state.isEditting ? this.handleUpdateProvider : this.handleAddNewProvider();
              }}
              color="primary"
            >
              {this.state.isEditting ? 'Cập nhật' : 'Thêm'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Provider.propTypes = {};

export default Provider;
