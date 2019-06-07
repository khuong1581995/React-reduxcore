/**
 *
 * Dialog
 *
 */

import React from 'react';
import {
  Button,
  Grid,
  Divider,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  Tab,
  Tabs,
} from '@material-ui/core';

import { Assignment } from '@material-ui/icons';

import { observer } from 'mobx-react';
import { observable } from 'mobx';
// import PropTypes from 'prop-types';

// import styled from 'styled-components';

import lodash from 'lodash';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import RequiredCheckoutTbl from './requireCheckoutTbl';
import RequiredCheckoutDialog from './RequiredCheckoutDialog';
import ProductRequiredTbl from './productRequireTbl';
/* eslint-disable react/prefer-stateless-function */
const modelContract = {
  contractType: 0,
  belong: 'Không thuộc hợp đồng nào',
  name: undefined,
  contractID: undefined,
  orderID: undefined,
  orderNumber: undefined,
  signDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  manager: 'Người quản lý 1',
  taker: 'Người mang về 1',
  cycleDays: 0,
  alertDays: 0,
  status: 0,
  otherRequire: {
    files: [],
    fileName: '',
    content: '',
  },
};
function createModelContract() {
  return {
    contractType: 0,
    belong: 'Không thuộc hợp đồng nào',
    name: undefined,
    contractID: '',
    orderID: undefined,
    orderNumber: 0,
    signDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    manager: 'Người quản lý 1',
    taker: 'Người mang về 1',
    cycleDays: 0,
    alertDays: 0,
    status: 0,
    otherRequire: {
      files: [],
      fileName: '',
      content: '',
    },
  };
}
@observer
class MainDialog extends React.Component {
  @observable
  contract = modelContract;

  @observable
  openRequiredCheckoutDialog = false;

  @observable
  isEdittingRequiredCheckoutDialog = false;

  @observable
  editData = {};

  state = {
    tabIndex: 'YCTT',
    // requiredCheckoutList: [{ stage: 'giai đoạn 1', checkoutTime: '10-9-2019', money: 12, type: 0 }],

    requiredCheckoutList: [],
  };

  handleChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  componentWillReceiveProps() {}

  callBack = (cmd, data) => {
    let newRequiredCheckoutList = this.state.requiredCheckoutList;
    switch (cmd) {
      case 'open-add-required-checkout-dialog':
        this.openRequiredCheckoutDialog = true;
        break;
      case 'open-edit-required-checkout-dialog':
        this.editData = data;
        this.openRequiredCheckoutDialog = true;
        this.isEdittingRequiredCheckoutDialog = true;

        break;
      case 'close-required-checkout-dialog':
        this.openRequiredCheckoutDialog = false;
        this.isEdittingRequiredCheckoutDialog = false;
        break;

      case 'add-required-checkout':
        this.openRequiredCheckoutDialog = false;
        this.isEdittingRequiredCheckoutDialog = false;
        newRequiredCheckoutList.push(data);
        this.setState({ requiredCheckoutList: newRequiredCheckoutList });

        break;

      case 'update-required-checkout':
        this.openRequiredCheckoutDialog = false;
        this.isEdittingRequiredCheckoutDialog = false;
        newRequiredCheckoutList = this.state.requiredCheckoutList;
        newRequiredCheckoutList[newRequiredCheckoutList.findIndex(d => d.stage === data.stage)] = data;
        this.setState({ requiredCheckoutList: newRequiredCheckoutList });

        break;
      case 'delete-required-checkout':
        newRequiredCheckoutList = lodash.difference(newRequiredCheckoutList, data);
        this.setState({ requiredCheckoutList: newRequiredCheckoutList });

        break;
      default:
        break;
    }
  };

  componentDidMount() {}

  render() {
    const { tabIndex } = this.state;

    return (
      <div className="p-3">
        <div>
          <h6 className="font-weight-bold">Thông tin hợp đồng</h6>
          <Divider />
          <Grid container>
            <Grid item sm={6} className="my-3 px-3">
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="age-simple">Loại hợp đông</InputLabel>
                <Select
                  value={this.contract.contractType}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                  onChange={event => {
                    this.contract.contractType = event.target.value;
                  }}
                >
                  <MenuItem value={0}>Hợp đồng nguyên tắc</MenuItem>
                  <MenuItem value={1}>Hợp dồng thời vụ/đơn hàng</MenuItem>
                </Select>
              </FormControl>
              {this.contract.contractType === 0 ? (
                ''
              ) : (
                <FormControl fullWidth className="mb-2" margin="normal">
                  <InputLabel htmlFor="age-simple">Thuộc</InputLabel>
                  <Select
                    value={this.contract.belong}
                    inputProps={{
                      name: 'age',
                      id: 'age-simple',
                    }}
                    onChange={event => {
                      this.contract.belong = event.target.value;
                    }}
                  >
                    <MenuItem value="Không thuộc hợp đồng nào">Không thuộc hợp đồng nào</MenuItem>
                    <MenuItem value="Hợp đồng nguyên tắc 2">Hợp đồng nguyên tắc 2</MenuItem>
                    <MenuItem value="Hợp đồng nguyên tắc 1">Hợp đồng nguyên tắc 1</MenuItem>
                  </Select>
                </FormControl>
              )}

              <TextField
                onChange={event => {
                  this.contract.name = event.target.value;
                }}
                value={this.contract.name}
                margin="normal"
                id="standard-full-width"
                label="Tên hợp đồng"
                fullWidth
              />
              <TextField
                margin="normal"
                onChange={event => {
                  this.contract.contractID = event.target.value;
                }}
                value={this.contract.contractID}
                id="standard-full-width"
                label="Mã hợp đồng"
                fullWidth
              />
              {this.contract.contractType === 0 ? (
                ''
              ) : (
                <div>
                  <TextField
                    id="filled-adornment-password"
                    label="Mã đơn hàng"
                    fullWidth
                    disabled
                    onChange={event => {
                      this.contract.orderID = event.target.value;
                    }}
                    value={this.contract.orderID}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => {}} aria-label="Toggle password visibility">
                            <Assignment />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    onChange={event => {
                      this.contract.orderNumber = event.target.value;
                    }}
                    value={this.contract.orderNumber}
                    margin="normal"
                    id="standard-full-width"
                    label="Số đơn hàng"
                    type="number"
                    fullWidth
                  />
                </div>
              )}
            </Grid>
            <Grid item sm={6} className="px-3 my-3">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  fullWidth
                  keyboard
                  className=""
                  margin="normal"
                  label="Ngày ký"
                  value={this.contract.signDate}
                  onChange={event => {
                    this.contract.signDate = event;
                  }}
                />
                <DatePicker
                  fullWidth
                  keyboard
                  className=""
                  margin="normal"
                  label="Ngày bắt đầu"
                  value={this.contract.startDate}
                  onChange={event => {
                    this.contract.startDate = event;
                  }}
                />
                <DatePicker
                  fullWidth
                  keyboard
                  className=""
                  margin="normal"
                  label="Ngày bắt kết thúc"
                  value={this.contract.endDate}
                  onChange={event => {
                    this.contract.endDate = event;
                  }}
                />
              </MuiPickersUtilsProvider>

              {this.contract.contractType === 0 ? (
                ''
              ) : (
                <div>
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="age-simp">Người quản lý</InputLabel>
                    <Select
                      onChange={event => {
                        this.contract.manager = event.target.value;
                      }}
                      value={this.contract.manager}
                      inputProps={{
                        name: 'age',
                        id: 'age-simp',
                      }}
                    >
                      <MenuItem value="Người quản lý 1">Người quản lý 1</MenuItem>
                      <MenuItem value="Người quản lý 2">Người quản lý 2</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="age-simpl">Người mang về</InputLabel>
                    <Select
                      onChange={event => {
                        this.contract.taker = event.target.value;
                      }}
                      value={this.contract.taker}
                      inputProps={{
                        name: 'age',
                        id: 'age-simpl',
                      }}
                    >
                      <MenuItem value="Người mang về 1">Người mang về 1</MenuItem>
                      <MenuItem value="Người mang về 2">Người mang về 2</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    onChange={event => {
                      this.contract.cycleDays = event.target.value;
                    }}
                    value={this.contract.cycleDays}
                    margin="normal"
                    id="standard-full-width"
                    label="Chu kỳ (ngày)"
                    type="number"
                    fullWidth
                    inputProps={{ min: '0' }}
                  />
                  <TextField
                    onChange={event => {
                      this.contract.alertDays = event.target.value;
                    }}
                    value={this.contract.alertDays}
                    margin="normal"
                    id="standard-full-width"
                    label="Báo trước (ngày)"
                    type="number"
                    fullWidth
                    inputProps={{ min: '0' }}
                  />
                </div>
              )}

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="age-simple">Trạng thái</InputLabel>
                <Select
                  onChange={event => {
                    this.contract.status = event.target.value;
                  }}
                  value={this.contract.status}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value={0}>Đang thực hiện</MenuItem>
                  <MenuItem value={1}>Đã thực hiện</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} className="py-3">
              <Tabs value={tabIndex} onChange={this.handleChange} indicatorColor="primary" textColor="primary" variant="standard">
                <Tab value="YCSP" label="Yêu cầu sản phẩm" className={this.contract.contractType === 0 ? 'd-none' : 'd-block'} />
                <Tab
                  value="YCGH"
                  label="Yêu cầu giao hàng"
                  /* eslint react/prop-types: 0 */

                  className={this.contract.contractType === 0 ? 'd-none' : this.props.isEditting === false ? 'd-none' : 'd-block'}
                />
                <Tab value="YCTT" label="Yêu cầu thanh toán" />
                <Tab
                  className={this.contract.contractType === 0 ? 'd-none' : this.props.isEditting === false ? 'd-none' : 'd-block'}
                  value="TTHH"
                  label="Thanh toán hoa hồng"
                />
                <Tab value="YCK" label="Yêu cầu khác" />
              </Tabs>
            </Grid>
          </Grid>

          {tabIndex === 'YCSP' && (
            <ProductRequiredTbl
              dataSource={[{ name: 'Bàn bếp 1', price: '1000000 VNĐ', amount: 100, unit: 'Chiếc', discount: '0.00%', total: '100,000,000 VNĐ' }]}
            />
          )}
          {tabIndex === 'YCGH' && <div>yêu cầu giao hàng</div>}
          {tabIndex === 'YCTT' && (
            <div>
              <RequiredCheckoutTbl callBack={this.callBack} dataSource={this.state.requiredCheckoutList} />
              {this.openRequiredCheckoutDialog === true ? (
                <RequiredCheckoutDialog
                  editData={this.editData}
                  isEdittingRequiredCheckoutDialog={this.isEdittingRequiredCheckoutDialog}
                  openRequiredCheckoutDialog={this.openRequiredCheckoutDialog}
                  callBack={this.callBack}
                />
              ) : (
                ''
              )}
            </div>
          )}
          {tabIndex === 'TTHH' && <div>thanh toán hoa hồng</div>}
          {tabIndex === 'YCK' && (
            <div className="p-4">
              <Grid container alignItems="center" justify="center">
                <Grid item sm={2} className="px-3">
                  <p className="text-right mb-0 ">File Upload</p>
                </Grid>
                <Grid item sm={8} className="px-3">
                  <TextField margin="normal" type="file" id="standard-full-width" fullWidth />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="center">
                <Grid item sm={2} className="px-3">
                  <p className="text-right mb-0 ">Tên file</p>
                </Grid>
                <Grid item sm={8} className="px-3">
                  <TextField
                    onChange={event => {
                      this.contract.otherRequire.fileName = event.target.value;
                    }}
                    value={this.contract.otherRequire.fileName}
                    margin="normal"
                    id="standard-full-width"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="center">
                <Grid item sm={2} className="px-3">
                  <p className="text-right mb-0 ">Yêu cầu khác</p>
                </Grid>
                <Grid item sm={8} className="px-3">
                  <TextField
                    onChange={event => {
                      this.contract.otherRequire.content = event.target.value;
                    }}
                    value={this.contract.otherRequire.content}
                    multiline
                    rows={4}
                    margin="normal"
                    id="standard-full-width"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </div>
        <Button
          onClick={() => {
            this.contract = createModelContract();

            this.props.callBack('back', {});
          }}
        >
          Quay lại
        </Button>
        <Button
          onClick={() => {
            const newContract = this.contract;
            this.props.callBack('save', newContract);
          }}
        >
          Lưu
        </Button>
        <Button
          onClick={() => {
            const newContract = this.contract;
            this.contract = createModelContract();
            this.props.callBack('save and back', newContract);
          }}
        >
          Lưu và đóng
        </Button>
      </div>
    );
  }
}

MainDialog.propTypes = {};

export default MainDialog;
