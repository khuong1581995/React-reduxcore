/**
 *
 * ExtendedInformation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Grid,
  TextField,
  Checkbox,
  withStyles,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from '@material-ui/core';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
class ExtendedInformation extends React.Component {
  state = {
    statusPrice: false,
    statusTitleMoney: false,
    titleMoney: '',
    name: '',
    methodMoney: '',
    transferUnit: false,
    ArryUnit: [
      {
        numberUnit: 0,
        unitExchange: '',
        costPriceAfterExchange: 0,
        sellPriceAfterExchange: 0,
      },
    ],
    AdditionalItems: [
      {
        keyItem: '',
      },
    ],
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAddField = () => {
    const { ArryUnit } = this.state;
    ArryUnit.push({
      numberUnit: 0,
      unitExchange: '',
      costPriceAfterExchange: 0,
      sellPriceAfterExchange: 0,
    });
    this.setState({ ArryUnit });
  };

  handleAdditonalItems = () => {
    const { AdditionalItems } = this.state;
    AdditionalItems.push({
      keyItem: '',
    });
    this.setState({ AdditionalItems });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <div>
            <Grid container>
              <Grid md={3}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.statusPrice}
                        onChange={this.handleChangeCheck('statusPrice')}
                        value="statusPrice"
                        color="primary"
                      />
                    }
                    label="Giá đã bao gồm thuế :"
                    labelPlacement="start"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container>
              <Grid md={3}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.statusTitleMoney}
                        onChange={this.handleChangeCheck('statusTitleMoney')}
                        value="statusTitleMoney"
                        color="primary"
                      />
                    }
                    label="Thay đổi tiêu đề tiền hoa hồng :"
                    labelPlacement="start"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Typography align="left">Phần trăm hoa hồng dựa trên giá bán hoặc lợi nhuận của một sản phẩm</Typography>
            <Grid container>
              <Grid md={6}>
                <FormControl className={classes.textField} style={{ width: '90%' }}>
                  <InputLabel htmlFor="age-simple">Tiền hoa hồng :</InputLabel>
                  <Select
                    value={this.state.titleMoney}
                    onChange={this.handleChange('titleMoney')}
                    inputProps={{
                      name: 'titleMoney',
                      id: 'titleMoney-simple',
                    }}
                  >
                    <MenuItem value={10}>Tỉ lệ phần trăm</MenuItem>
                    <MenuItem value={20}>Số Tiền cố định</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6}>
                <TextField
                  id="standard-name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  style={{ width: '90%' }}
                />
              </Grid>
            </Grid>
            {this.state.titleMoney === 20 ? (
              ''
            ) : (
              <div>
                <Grid container>
                  <Grid md={6}>
                    <FormControl className={classes.textField} style={{ width: '90%' }}>
                      <InputLabel htmlFor="age-simple">Phương thức tính phần trăm hoa hồng:</InputLabel>
                      <Select
                        value={this.state.methodMoney}
                        onChange={this.handleChange('methodMoney')}
                        inputProps={{
                          name: 'methodMoney',
                          id: 'methodMoney-simple',
                        }}
                      >
                        <MenuItem value="Giá Bán">Giá Bán</MenuItem>
                        <MenuItem value="Lợi Nhuận">Lợi Nhuận</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            )}
            <div>
              <TextField
                id="outlined-name"
                label="Hạn mức đặt hàng :"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                style={{ width: '95%' }}
              />
              <TextField
                id="outlined-name"
                label="Giá khuyến mại :"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                style={{ width: '95%' }}
              />
              <div style={{ margin: '40px 35px 20px 35px', display: 'flex', justifyContent: 'space-between' }}>
                <form className={classes.container} style={{ width: '40%' }} noValidate>
                  <TextField
                    id="date"
                    label="Ngày bắt đầu giảm giá :"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    style={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                <form className={classes.container} style={{ width: '40%' }} noValidate>
                  <TextField
                    id="date"
                    label="Ngày kết thúc :"
                    type="date"
                    className={classes.textField}
                    style={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>
            </div>
          </div>
          <div>
            <Grid container>
              <Grid md={3}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.transferUnit}
                        onChange={this.handleChangeCheck('transferUnit')}
                        value="transferUnit"
                        color="primary"
                      />
                    }
                    label="Chuyển đổi đơn vị :"
                    labelPlacement="start"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <div hidden={!this.state.transferUnit} style={{ margin: '35px' }}>
              <div>
                <div style={{ display: 'flex', border: '1px solid #000', background: '#f5f5f5' }}>
                  <Typography style={{ width: '16%' }}>Quy đổi từ</Typography>
                  <Typography style={{ width: '4%' }} className={classes.border}>
                    x
                  </Typography>
                  <Typography style={{ width: '16%' }}>Số lượng quy đổi</Typography>
                  <Typography style={{ width: '4%' }} className={classes.border}>
                    =
                  </Typography>
                  <Typography style={{ width: '20%' }}>Đơn vị quy đổi</Typography>
                  <Typography style={{ width: '20%' }} className={classes.border}>
                    Giá vốn sau khi quy đổi
                  </Typography>
                  <Typography style={{ width: '20%' }}>Giá bán sau khi quy đổi</Typography>
                </div>
                <div>
                  {this.state.ArryUnit.map(item => (
                    <div style={{ width: '100%', marginTop: '15px' }}>
                      <div>
                        <div style={{ display: 'flex', border: '1px solid #000', background: '#f5f5f5' }}>
                          <Typography style={{ width: '16%' }}>Quy đổi từ</Typography>
                          <Typography style={{ width: '4%' }} className={classes.border}>
                            x
                          </Typography>
                          <Typography style={{ width: '16%' }}>Số lượng quy đổi</Typography>
                          <Typography style={{ width: '4%' }} className={classes.border}>
                            =
                          </Typography>
                          <Typography style={{ width: '20%' }}>Đơn vị quy đổi</Typography>
                          <Typography style={{ width: '20%' }} className={classes.border}>
                            Giá vốn sau khi quy đổi
                          </Typography>
                          <Typography style={{ width: '20%' }}>Giá bán sau khi quy đổi</Typography>
                        </div>
                        <div style={{ display: 'flex', border: '1px solid #000' }}>
                          <Typography style={{ width: '16%' }} />
                          <Typography
                            style={{ width: '4%', color: 'red', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                            className={classes.border}
                          >
                            x
                          </Typography>
                          <div style={{ width: '16%' }}>
                            <TextField
                              id="outlined-name"
                              className={classes.textField}
                              value={item.numberUnit}
                              onChange={this.handleChange('numberUnit')}
                              margin="normal"
                              style={{ width: '90%' }}
                            />
                          </div>
                          <Typography
                            style={{ width: '4%', color: 'red', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                            className={classes.border}
                          >
                            =
                          </Typography>
                          <div style={{ width: '20%' }}>
                            <FormControl className={classes.textField} style={{ width: '90%' }}>
                              <InputLabel htmlFor="age-simple">Tiền hoa hồng :</InputLabel>
                              <Select
                                value={item.unitExchange}
                                onChange={this.handleChange('unitExchange')}
                                inputProps={{
                                  name: 'unitExchange',
                                  id: 'unitExchange-simple',
                                }}
                              >
                                <MenuItem value={10}>Tỉ lệ phần trăm</MenuItem>
                                <MenuItem value={20}>Số Tiền cố định</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div style={{ display: 'flex', width: '20%', justifyContent: 'center', alignItems: 'center' }} className={classes.border}>
                            <TextField
                              id="outlined-name"
                              className={classes.textField}
                              value={item.costPriceAfterExchange}
                              onChange={this.handleChange('costPriceAfterExchange')}
                              margin="normal"
                              style={{ width: '60%', marginRight: '5%' }}
                            />
                            <Typography>(NaN)</Typography>
                          </div>
                          <div style={{ display: 'flex', width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                              id="outlined-name"
                              className={classes.textField}
                              value={item.sellPriceAfterExchange}
                              onChange={this.handleChange('sellPriceAfterExchange')}
                              margin="normal"
                              style={{ width: '60%', marginRight: '5%' }}
                            />
                            <Typography>(NaN)</Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button size="small" style={{ float: 'left', marginTop: '15px' }} onClick={this.handleAddField} variant="contained" color="primary">
                    Thêm trường
                  </Button>
                </div>
              </div>
            </div>
            <TextField
              id="outlined-name"
              label="Ngày hết hạn :"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              style={{ width: '95%' }}
            />
            <Grid container style={{ marginTop: '40px' }}>
              <Grid md={3}>
                <Typography>Số mục bổ sung</Typography>
              </Grid>
              <Grid md={7}>
                <Table style={{ border: '1px solid #f5f5f5' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ width: '80%', borderRight: '1px solid #f5f5f5' }}>
                        Mã Số
                      </TableCell>
                      <TableCell align="center">Xóa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.AdditionalItems.map(() => (
                      <TableRow>
                        <TableCell style={{ borderRight: '1px solid #f5f5f5' }}>
                          <div>
                            <TextField margin="normal" style={{ width: '100%' }} />
                          </div>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <span style={{ color: '#346086', textAlign: 'left', marginTop: '15px', cursor: 'pointer' }} onClick={this.handleAdditonalItems}>
                  Thêm số mục
                </span>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

ExtendedInformation.propTypes = {};

export default withStyles(styles)(ExtendedInformation);
