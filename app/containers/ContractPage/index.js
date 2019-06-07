/**
 *
 * Contract
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Paper, Grid, Select, MenuItem, FormControl, Button, Badge, Slide, OutlinedInput } from '@material-ui/core';

import SearchBar from 'material-ui-search-bar';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ListPage from '../../components/List/ListPage';
// import lodash from 'lodash';
import makeSelectContract from './selectors';
import reducer from './reducer';
import saga from './saga';
// import Table from './component/table';

import ContractDialog from './component/ContractDialog';

import './styles.scss';
/* eslint-disable react/prefer-stateless-function */

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },

  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});
const fakeHeader = [
  { name: 'contractID', title: 'Mã', visibility: true },
  { name: 'name', title: 'Tên', visibility: true },
  { name: 'guess', title: 'Khách hàng', visibility: true },
  { name: 'orderNumber', title: 'Số đơn hàng', visibility: true },
  { name: 'signDate', title: 'Ngày ký', visibility: true },
  { name: 'status', title: 'Trạng thái', visibility: true },
  { name: 'file', title: 'File', visibility: true },
  // { name: 'edit', title: 'Thao tác', visibility: true },
];
const fakeData = [
  {
    contractType: 1,
    belong: 'Không thuộc hợp đồng nào',
    name: 'Hợp đồng 1',
    contractID: 'HD1000854562',
    orderID: '1010101010131221',
    orderNumber: 5,
    signDate: '19/09/1997',
    startDate: new Date(),
    endDate: new Date(),
    manager: 'Người mang về 1',
    taker: 'Người mang về 2',
    cycleDays: 0,
    alertDays: 0,
    status: 0,
    otherRequire: {
      files: [],
      fileName: '',
      content: '',
    },
  },
  {
    contractType: 0,
    belong: 'Không thuộc hợp đồng nào',
    name: 'Hợp đồng Nguyên tắc',
    contractID: 'HD100020202',
    orderID: '1010101010131221',
    orderNumber: 5,
    signDate: '19/09/1997',
    startDate: new Date(),
    endDate: new Date(),
    manager: 'Người mang về 1',
    taker: 'Người mang về 2',
    cycleDays: 0,
    alertDays: 0,
    status: 0,
    otherRequire: {
      files: [],
      fileName: '',
      content: '',
    },
  },
  {
    contractType: 1,
    belong: 'Không thuộc hợp đồng nào',
    name: 'Hợp đồng Thời vụ',
    contractID: 'HD100023212',
    orderID: '1010101010131221',
    orderNumber: 5,
    signDate: '19/09/1997',
    startDate: new Date(),
    endDate: new Date(),
    manager: 'Người mang về 1',
    taker: 'Người mang về 2',
    cycleDays: 0,
    alertDays: 0,
    status: 0,
    otherRequire: {
      files: [],
      fileName: '',
      content: '',
    },
  },
];
@observer
export class Contract extends React.Component {
  @observable
  _fakeData = fakeData;

  @observable
  _contractType = 0;

  @observable
  _isOpeningDialog = false;

  // 0: Hợp đồng KH, 1: Hợp đồng NCC
  @observable
  _isEditting = false;

  @observable
  _dialogData = null;

  state = {
    value: 2,
    contractType: '-1',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeTabList = (event, value) => {
    this.setState({ value });
  };

  callBack = (command, data) => {
    switch (command) {
      case 'cancel-main-dialog':
        this._isOpeningDialog = false;
        break;

      case 'open-add-dialog':
        this._isOpeningDialog = true;
        this._isEditting = false;
        break;
      case 'edit-contract':
        this._dialogData = data;
        this._isEditting = true;
        this._isOpeningDialog = true;
        break;
      case 'back':
        this._isOpeningDialog = false;
        break;
      case 'save':
        this._fakeData.push(data);
        break;
      case 'save and back':
        this._isOpeningDialog = false;

        this._fakeData.push(data);
        break;
      case 'add':
        this._fakeData.push(data);
        break;
      default:
        break;
    }
  };

  changeContractType = contractType => {
    this._contractType = contractType;
  };

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Slide direction="right" in={!this._isOpeningDialog}>
          <Paper className={this._isOpeningDialog ? 'd-none' : 'd-block'}>
            <Grid container className="p-3">
              <Grid className="px-3" item sm={4}>
                <SearchBar />
              </Grid>
              <Grid className="px-3" item sm={2}>
                <FormControl fullWidth>
                  <Select
                    // variant="outlined"
                    value={this.state.contractType}
                    onChange={this.handleChange('contractType')}
                    input={<OutlinedInput labelWidth={0} name="age" id="age-native-label-placeholder" />}
                  >
                    <MenuItem value="-1">Tất cả các hợp đồng</MenuItem>
                    <MenuItem value="0">Hợp đồng nguyên tắc</MenuItem>
                    <MenuItem value="1">Hợp đồng thời vụ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} className="text-right">
                <Button
                  onClick={() => {
                    this.changeContractType(0);
                  }}
                  className="mx-2"
                  variant={this._contractType === 0 ? 'contained' : 'outlined'}
                  color="primary"
                >
                  Hợp đồng KH
                </Button>
                <Button
                  onClick={() => {
                    this.changeContractType(1);
                  }}
                  className="mx-2"
                  variant={this._contractType === 1 ? 'contained' : 'outlined'}
                  color="secondary"
                >
                  Hợp đồng NCC
                </Button>
              </Grid>
              <Grid item sm={12} className="mt-3">
                <Tabs value={this.state.value} indicatorColor="primary" textColor="primary" onChange={this.handleChangeTabList}>
                  <Tab
                    label={
                      <Badge color="secondary" badgeContent={4}>
                        Danh sách
                      </Badge>
                    }
                  />
                  <Tab
                    label={
                      <Badge color="secondary" badgeContent={4}>
                        Chu kì dịch vụ
                      </Badge>
                    }
                  />
                  <Tab
                    label={
                      <Badge color="secondary" badgeContent={4}>
                        Hết hạn hợp đồng
                      </Badge>
                    }
                  />
                </Tabs>
              </Grid>
              <Grid item sm={12}>
                {/* <Table callBack={this.callBack} dataSource={this._fakeData} className="mb-0" /> */}
                <ListPage callBack={this.callBack} rows={fakeData} columns={fakeHeader} />
              </Grid>
            </Grid>
          </Paper>
        </Slide>
        <Slide direction="left" in={this._isOpeningDialog}>
          <Paper className={!this._isOpeningDialog ? 'd-none' : 'd-block'}>
            <ContractDialog dialogData={this._dialogData} callBack={this.callBack} isEditting={this._isEditting} />
          </Paper>
        </Slide>
      </div>
    );
  }
}

Contract.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contract: makeSelectContract(),
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

const withReducer = injectReducer({ key: 'contract', reducer });
const withSaga = injectSaga({ key: 'contract', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles, { withTheme: true }),
)(Contract);
