/**
 *
 * StockImportPage
 *
 */
import { customers } from 'variable';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  withStyles,
  Paper,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Avatar,
  Dialog,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { ArrowDropDown, Cancel, PersonAdd, InsertDriveFile, Close, AccountCircle, Face } from '@material-ui/icons';
import { Breadcrumbs } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStockExportPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import Autocomplete from '../../components/Autocomplete';
// import messages from './messages';

const products = [
  { label: 'Iphone 4', value: 1, data: { name: 'Iphone 4', serial: 'AB1', unit: 'Chiếc' } },
  { label: 'Iphone 5', value: 2, data: { name: 'Iphone 5', serial: 'AB2', unit: 'Chiếc' } },
  { label: 'Iphone 6', value: 3, data: { name: 'Iphone 6', serial: 'AB3', unit: 'Chiếc' } },
  { label: 'Iphone 7', value: 4, data: { name: 'Iphone 7', serial: 'AB4', unit: 'Chiếc' } },
  { label: 'Iphone 8', value: 5, data: { name: 'Iphone 8', serial: 'AB5', unit: 'Chiếc' } },
  { label: 'Iphone X', value: 6, data: { name: 'Iphone X', serial: 'AB6', unit: 'Chiếc' } },
  { label: 'Samsung S10', value: 7, data: { name: 'Samsung S10', serial: 'SS6', unit: 'Chiếc' } },
];

/* eslint-disable react/prefer-stateless-function */
export class StockImportPage extends React.Component {
  state = {
    anchorEl: false,
    history: false,
    textButton: 'Đơn hàng',
    multiline: '',
    customerName: '',
    employeeName: '',
    listProduct: [],
    open: false,
    quantity: 0,
    id: null,
  };

  selectCustomer = customer => {
    this.setState({ customerName: customer });
  };

  selectEmployee = employee => {
    this.setState({ employeeName: employee });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  deleteProduct(id) {
    const { listProduct } = this.state;
    const newProduct = listProduct.filter(item => item.value !== id);
    this.setState({ listProduct: newProduct });
  }

  selectProduct = product => {
    const { listProduct } = this.state;
    const findPrroduct = listProduct.findIndex(item => item.value === product.value);
    let newProduct;
    if (findPrroduct === -1) newProduct = [...listProduct, { ...product, quantity: 1 }];
    else newProduct = listProduct.map(item => (item.value === product.value ? { ...item, quantity: item.quantity + 1 } : item));
    this.setState({ listProduct: newProduct });
  };

  // Thay đổi số lượng
  editQuantity(item) {
    this.setState({ quantity: item.quantity, open: true, id: item.value });
  }

  updateQuantity = () => {
    const { listProduct, id, quantity } = this.state;
    const newProduct = listProduct.map(item => (item.value === id ? { ...item, quantity } : item));
    this.setState({ listProduct: newProduct, open: false });
  };

  // xóa đơn hàng

  cancelOrder = () => {
    this.setState({
      customerName: '',
      employeeName: '',
      listProduct: [],
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, history, listProduct, quantity, open } = this.state;
    const HeadCell = props => <TableCell style={{ fontWeight: 'bold', color: 'black' }}>{props.children}</TableCell>;
    return (
      <div>
        <Helmet>
          <title>Nhập kho kho</title>
          <meta name="description" content="Description of StockImportPage" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Helmet>
            <title>Kho</title>
            <meta name="description" content="Description of AddUserPage" />
          </Helmet>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Kho
            </Link>
            <Typography color="textPrimary">Nhập kho</Typography>
          </Breadcrumbs>
        </Paper>
        <Grid container spacing={24}>
          <Grid md={8} item>
            <Paper className={classes.paper}>
              <div style={{ display: 'flex' }}>
                <Autocomplete placeholder="Chọn sản phẩm" select={product => this.selectProduct(product)} suggestions={products} />
                <Button
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClickanchorEl}
                  color="primary"
                  variant="contained"
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  {this.state.textButton}
                  <ArrowDropDown />
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose('anchorEl')}>
                  <MenuItem onClick={this.handleClose('anchorEl')}>Đơn hàng</MenuItem>
                  <MenuItem onClick={this.handleClose('anchorEl')}>Kho trực tiếp</MenuItem>
                </Menu>
              </div>
            </Paper>
          </Grid>
          <Grid md={4} item>
            <Paper className={classes.paper}>
              <div style={{ margin: '0 auto', width: '50%' }}>
                <Grid container direction="row" style={{ justifyContent: 'space-around' }}>
                  <div>
                    <Button
                      aria-owns={history ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClickhistory}
                      // color="primary"
                      variant="outlined"
                    >
                      ...
                    </Button>
                    <Menu id="simple-menu" anchorEl={history} open={Boolean(history)} onClose={this.handleClose('history')}>
                      <MenuItem onClick={this.handleClose('history')}>
                        <InsertDriveFile /> Lịch sử nhập kho
                      </MenuItem>
                      <MenuItem onClick={this.handleClose('history')}>
                        <InsertDriveFile /> Lịch sử chuyển kho
                      </MenuItem>
                    </Menu>
                  </div>
                  <Button onClick={this.cancelOrder} variant="outlined" color="secondary">
                    <Cancel style={{ marginRight: '5px' }} /> Hủy đơn hàng
                  </Button>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid md={8} item>
            <Paper className={classes.paper}>
              <div>
                <Typography className={classes.txtXuatKho} variant="h5">
                  Nhập kho kho theo đơn hàng:
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow style={{ background: '#F5F5F5', fontWeight: 'bold' }}>
                      <HeadCell />
                      <HeadCell>Tên</HeadCell>
                      <HeadCell>Số Lượng</HeadCell>
                      <HeadCell>Mã serial</HeadCell>
                      <HeadCell>Đơn vị tính</HeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listProduct.length ? (
                      listProduct.map(item => (
                        <TableRow>
                          <TableCell>
                            <Close onClick={() => this.deleteProduct(item.value)} style={{ cursor: 'pointer' }} />
                          </TableCell>
                          <TableCell>{item.data.name}</TableCell>
                          <TableCell>
                            <Button onClick={() => this.editQuantity({ value: item.value, quantity: item.quantity })}>{item.quantity}</Button>
                          </TableCell>
                          <TableCell>{item.data.serial}</TableCell>
                          <TableCell>{item.data.unit}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className={classes.borderTable} colSpan="5">
                          <Typography className={classes.tableThongBao}>
                            Bạn đã xuất đủ số lượng, quay lại đơn hàng tạm dừng để hoàn thành đơn{' '}
                            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
                              click here
                            </Link>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Typography style={{ padding: '20px 0px' }}>Ghi Chú:</Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  // label="Multiline"
                  multiline
                  rows="4"
                  value={this.state.multiline}
                  onChange={this.handleChange('multiline')}
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  style={{ width: '100%' }}
                />
              </div>
            </Paper>
          </Grid>
          <Grid md={4} item>
            <Paper className={classes.paper}>
              {this.state.customerName ? (
                <div className={classes.complete}>
                  <Avatar className={classes.bigAvatar}>
                    <AccountCircle style={{ fontSize: '100' }} />
                  </Avatar>
                  <h4>{this.state.customerName.label}</h4>
                  <p>khachhang1@gmail.com</p>
                  <Button onClick={() => this.setState({ customerName: null })} color="primary" variant="contained">
                    Hủy bỏ
                  </Button>
                </div>
              ) : (
                <div style={{ padding: '20px' }}>
                  <Grid container direction="row">
                    <Button variant="contained" color="primary" className={classes.btnAdd}>
                      <PersonAdd />
                    </Button>
                    <Autocomplete placeholder="Khách hàng" select={customer => this.selectCustomer(customer)} suggestions={customers} />
                  </Grid>
                </div>
              )}

              {this.state.employeeName ? (
                <div className={classes.complete}>
                  <Avatar className={classes.bigAvatar}>
                    <Face style={{ fontSize: '100' }} />
                  </Avatar>
                  <h4>{this.state.employeeName.label}</h4>
                  <p>nhanvien1@gmail.com</p>
                  <Button onClick={() => this.setState({ employeeName: null })} color="primary" variant="contained">
                    Hủy bỏ
                  </Button>
                </div>
              ) : (
                <div style={{ padding: '20px' }}>
                  <Grid container direction="row">
                    <Button variant="contained" color="primary" className={classes.btnAdd}>
                      <PersonAdd />
                    </Button>
                    <Autocomplete placeholder="Nhân viên" select={employee => this.selectEmployee(employee)} suggestions={customers} />
                  </Grid>
                </div>
              )}
              <div style={{ padding: '20px' }}>
                <Button variant="contained" color="primary" style={{ width: '100%' }}>
                  HOÀN THÀNH
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Dialog aria-labelledby="form-dialog-title" onClose={() => this.setState({ open: false })} open={open}>
          <DialogContent>
            <DialogContentText>Nhập số lượng</DialogContentText>
            <TextField id="standard-name" label="Số lượng" value={quantity} onChange={this.handleChange('quantity')} margin="normal" />
            <DialogActions>
              <Button onClick={() => this.updateQuantity()} variant="contained" color="primary">
                Lưu
              </Button>
              <Button onClick={() => this.setState({ open: false })} variant="contained" color="primary">
                Hủy
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  handleClickanchorEl = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickhistory = event => {
    this.setState({ history: event.currentTarget });
  };

  handleClose = name => event => {
    if (name === 'anchorEl') this.setState({ anchorEl: null, textButton: event.target.textContent });
    else this.setState({ history: null });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
}

StockImportPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  stockImportPage: makeSelectStockExportPage(),
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

const withReducer = injectReducer({ key: 'stockImportPage', reducer });
const withSaga = injectSaga({ key: 'stockImportPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(StockImportPage);
