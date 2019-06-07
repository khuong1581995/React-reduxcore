/**
 *
 * AddSupplierPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Typography,
  Paper,
  //   Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
import GridUI from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Edit, Person } from '@material-ui/icons';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import makeSelectAddSupplierPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import avatarDefault from '../../images/avatar.jpg';
import { postSupplier, putSupplier, getSupplier, changeValue, changeImage, setDefaultState } from './actions';

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

class AddSupplierPage extends React.Component {
  state = {
    tab: 1,
    attributes: 0,
    rows: [
      {
        id: 1,
        name: 'Minh Chiến',
        email: 'chiendev98@gmail.com',
        phone: '0123456789',
        department: 'Came.vn',
        note: 'Vietcombank',
      },
    ], // dữ liệu hiển thị
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== 'add') this.props.getSupplier(id);
    else this.props.setDefaultState();
  }

  handleChangeTab = (e, value) => this.setState({ tab: value });

  handleChangeIndex = index => this.setState({ tab: index });

  onSave = () => {
    const props = this.props.addSupplierPage;
    const data = {
      name: props.name,
      code: props.supplierCode,
      email: props.email,
      website: props.website,
      phone: props.phone,
      adress: props.address,
      bankAccountNumber: props.bankAccountNumber,
      taxCode: props.taxCode,
      createdAtSupplier: props.createdAtSupplier,
      charterCapital: props.charterCapital,
      businessRegistrationNumber: props.businessRegistrationNumber,
      dateRange: props.dateRange,
      note: props.note,
      logo: props.logo,
      logoURL: props.logoURL,
      representativeName: props.representativeName,
      representativePhone: props.representativePhone,
      representativeGender: props.representativeGender,
      representativeBirthDate: props.representativeBirthDate,
      representativeEmail: props.representativeEmail,
      representativeNote: props.representativeNote,
      representativePosition: props.representativePosition,
      classifySupplier: {
        location: props.location,
        companyType: props.companyType,
        job: props.job,
        unit: props.unit,
      },
    };

    const id = this.props.match.params.id;
    if (id === 'add') this.props.postSupplier(data);
    else this.props.putSupplier(id, data);
  };

  onSelectImg = e => {
    const urlAvt = URL.createObjectURL(e.target.files[0]);
    this.props.changeImage({ logoURL: urlAvt, logo: e.target.files[0] });
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  render() {
    const props = this.props;
    return (
      <div>
        <Helmet>
          <title>Thêm mới Nhà cung cấp</title>
          <meta name="description" content="Description of AddCustomerPage" />
        </Helmet>
        <Paper style={{ marginBottom: '20px' }}>
          <Breadcrumbs style={{ padding: 10 }} aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/crm">
              CRM
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/crm/suppliers">
              Danh sách nhà cung cấp
            </Link>
            <Typography color="textPrimary">Thêm mới nhà cung cấp</Typography>
          </Breadcrumbs>
        </Paper>
        <ValidatorForm onSubmit={this.onSave}>
          <Paper
            style={{
              padding: 20,
              marginBottom: 20,
            }}
          >
            <GridUI container item md={12}>
              <GridUI item md={6}>
                <Typography
                  component="p"
                  style={{
                    fontWeight: 550,
                    fontSize: '18px',
                  }}
                >
                  <Edit style={{ fontSize: '20px', marginBottom: '5px' }} /> Thông tin nhà cung cấp{' '}
                  <span
                    style={{
                      color: '#A4A4A4',
                      fontStyle: 'italic',
                      fontWeight: 500,
                    }}
                  >
                    Các trường có dấu * là bắt buộc
                  </span>
                </Typography>

                <TextValidator
                  required
                  validators={['required']}
                  errorMessages={['Không được bỏ trống']}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="supplierCode"
                  value={props.addSupplierPage.supplierCode}
                  onChange={props.changeName('supplierCode')}
                  label="Mã nhà cung cấp"
                />
                <TextValidator
                  required
                  validators={['required']}
                  errorMessages={['Không được bỏ trống']}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="name"
                  value={props.addSupplierPage.name}
                  onChange={props.changeName('name')}
                  label="Tên"
                />
                <TextValidator
                  required
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="email"
                  value={props.addSupplierPage.email}
                  onChange={props.changeName('email')}
                  label="Email"
                  validators={['required', 'isEmail']}
                  errorMessages={['Không được bỏ trống', 'Không đúng định dạng Email']}
                />
                <TextField
                  value={props.addSupplierPage.website}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="website"
                  onChange={props.changeName('website')}
                  label="Website"
                />
                <TextValidator
                  required
                  value={props.addSupplierPage.phone}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="phone"
                  onChange={props.changeName('phone')}
                  label="Điện thoại"
                  validators={['required', 'matchRegexp:^0[0-9]{9,11}$']}
                  errorMessages={['Không được bỏ trống', 'Định dạng số điện thoai không đúng']}
                />

                <TextField
                  value={props.addSupplierPage.address}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  type="text"
                  name="address"
                  onChange={props.changeName('address')}
                  label="Địa chỉ"
                />

                <TextField
                  value={props.addSupplierPage.bankAccountNumber}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  type="number"
                  name="bankAccountNumber"
                  onChange={props.changeName('bankAccountNumber')}
                  label="Số tài khoản"
                />

                <TextField
                  value={props.addSupplierPage.taxCode}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="taxCode"
                  onChange={props.changeName('taxCode')}
                  label="Mã số thuế"
                />
                <TextField
                  value={props.addSupplierPage.createdAtSupplier}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="createdAtSupplier"
                  onChange={props.changeName('createdAtSupplier')}
                  label="Ngày thành lập"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  value={props.addSupplierPage.charterCapital}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="charterCapital"
                  onChange={props.changeName('charterCapital')}
                  label="Vốn điều lệ"
                />
                <TextField
                  value={props.addSupplierPage.businessRegistrationNumber}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="businessRegistrationNumber"
                  onChange={props.changeName('businessRegistrationNumber')}
                  label="Số đăng ký kinh doanh"
                />
                <TextField
                  value={props.addSupplierPage.dateRange}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="dateRange"
                  onChange={props.changeName('dateRange')}
                  label="Ngày cấp"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  multiline
                  rows={4}
                  value={props.addSupplierPage.note}
                  style={{
                    width: '95%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  name="note"
                  onChange={props.changeName('note')}
                  label="Ghi chú"
                />
              </GridUI>
              <GridUI item md={6}>
                <Typography
                  component="p"
                  style={{
                    fontWeight: 550,
                    fontSize: '18px',
                  }}
                >
                  <Person style={{ fontSize: '20px', marginBottom: '5px' }} /> Chọn ảnh đại diện
                </Typography>
                <Avatar
                  alt="Ảnh đại diện"
                  src={props.addSupplierPage.logoURL || props.addSupplierPage.logo || avatarDefault}
                  style={{
                    marginTop: 20,
                    width: 200,
                    height: 200,
                  }}
                />
                <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple onChange={this.onSelectImg} type="file" />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      marginLeft: 16,
                      // textAlign: 'center',
                      marginTop: 10,
                    }}
                  >
                    Thêm ảnh đại diện
                  </Button>
                </label>

                <Typography
                  component="p"
                  style={{
                    fontWeight: 550,
                    fontSize: '18px',
                    marginTop: 20,
                  }}
                >
                  <Edit style={{ fontSize: '20px', marginBottom: 7 }} /> Chi tiết thông tin{' '}
                  <span
                    style={{
                      color: '#A4A4A4',
                      fontStyle: 'italic',
                      fontWeight: 500,
                    }}
                  >
                    Các trường có dấu * là cần nhập
                  </span>
                </Typography>
                <Tabs value={this.state.tab} onChange={this.handleChangeTab} indicatorColor="primary" variant="scrollable" scrollButtons="on">
                  <Tab disableRipple label="Phân loại nhà cung cấp" />
                  <Tab disableRipple label="Người đại diện" />
                </Tabs>
                <SwipeableViews index={this.state.tab} onChangeIndex={this.handleChangeIndex}>
                  <TabContainer>
                    <InputLabel style={{ fontSize: 14, display: 'block' }}>Loại đơn vị</InputLabel>
                    <Select
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      value={props.addSupplierPage.unit}
                      name="unit"
                      onChange={props.changeName('unit')}
                    >
                      <MenuItem value={0}>Đơn vị tổ chức</MenuItem>
                      <MenuItem value={1}>Đơn vị luật</MenuItem>
                    </Select>
                    <InputLabel style={{ fontSize: 14, display: 'block' }}>Khu vực</InputLabel>
                    <Select
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      value={props.addSupplierPage.location}
                      name="location"
                      onChange={props.changeName('location')}
                    >
                      <MenuItem value={0}>Hà nội</MenuItem>
                      <MenuItem value={1}>Đà Nẵng</MenuItem>
                      <MenuItem value={2}>Hồ Chí Minh</MenuItem>
                    </Select>
                    <InputLabel style={{ fontSize: 14, display: 'block' }}>Ngành nghề kinh doanh</InputLabel>
                    <Select
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      value={props.addSupplierPage.job}
                      name="job"
                      onChange={props.changeName('job')}
                    >
                      <MenuItem value={0}>Vật liệu cơ bản</MenuItem>
                      <MenuItem value={1}>Hàn xì</MenuItem>
                      <MenuItem value={2}>Phân phối hạt giống</MenuItem>
                      <MenuItem value={3}>Đại lí cấp 3</MenuItem>
                      <MenuItem value={4}>Khách lẻ</MenuItem>
                    </Select>

                    <InputLabel style={{ fontSize: 14, display: 'block', marginTop: 10 }}>Hình thức công ty</InputLabel>
                    <Select
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      value={props.addSupplierPage.companyType}
                      name="referralSource"
                      onChange={props.changeName('companyType')}
                    >
                      <MenuItem value={0}>Cổ phần</MenuItem>
                      <MenuItem value={1}>TNHH</MenuItem>
                    </Select>

                    <Typography
                      component="p"
                      style={{
                        fontWeight: 550,
                        fontSize: '18px',
                        marginTop: 20,
                      }}
                    >
                      Chọn bộ thuộc tính
                    </Typography>
                    <Select
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      value={this.state.attributes}
                      name="attributes"
                      onChange={this.handleChange('attributes')}
                    >
                      <MenuItem value={0}>---Chọn bộ thuộc tính---</MenuItem>
                      <MenuItem value={1}>Thuộc tính chung</MenuItem>
                      <MenuItem value={1}>Thuộc tính màu sắc</MenuItem>
                      <MenuItem value={1}>Thuộc tính nhà cung cấp</MenuItem>
                      <MenuItem value={1}>Thuộc tính khách hàng</MenuItem>
                    </Select>
                  </TabContainer>
                  <TabContainer>
                    <TextField
                      value={props.addSupplierPage.representativeName}
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      name="representativeName"
                      onChange={props.changeName('representativeName')}
                      label="Tên"
                    />
                    <TextField
                      value={props.addSupplierPage.representativePhone}
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      name="representativePhone"
                      onChange={props.changeName('representativePhone')}
                      label="Số điện thoại"
                    />
                    <InputLabel style={{ fontSize: 14, display: 'block' }}>Giới tính</InputLabel>
                    <Select
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      value={props.addSupplierPage.representativeGender}
                      name="representativeGender"
                      onChange={props.changeName('representativeGender')}
                    >
                      <MenuItem value="male">Nam</MenuItem>
                      <MenuItem value="female">Nữ</MenuItem>
                    </Select>
                    <TextField
                      value={props.addSupplierPage.representativeBirthDate}
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      type="date"
                      name="representativeBirthDate"
                      onChange={props.changeName('representativeBirthDate')}
                      label="Ngày sinh"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      value={props.addSupplierPage.representativeEmail}
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      name="representativeEmail"
                      onChange={props.changeName('representativeEmail')}
                      label="Email"
                    />
                    <TextField
                      value={props.addSupplierPage.representativePosition}
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      name="representativePosition"
                      onChange={props.changeName('representativePosition')}
                      label="Chức vụ"
                    />
                    <TextField
                      value={props.addSupplierPage.representativeNote}
                      style={{
                        width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      multiline
                      rows={4}
                      name="representativeNote"
                      onChange={props.changeName('representativeNote')}
                      label="Ghi chú"
                    />
                    <Typography
                      component="p"
                      style={{
                        fontWeight: 550,
                        fontSize: '18px',
                        marginTop: 20,
                      }}
                    >
                      <Edit style={{ fontSize: '20px', marginBottom: 7 }} /> Thông tin người đầu mối
                    </Typography>
                    <DataGrid id="gridContainer" dataSource={this.state.rows} ders repaintChangesOnly>
                      <Paging enabled={false} />
                      <Editing refreshMode="repaint" mode="cell" allowUpdating allowDeleting allowAdding />
                      <Column dataField="id" caption="STT" width={55} />
                      <Column dataField="name" caption="Họ tên" />
                      <Column dataField="phone" caption="SĐT" />
                      <Column dataField="email" caption="Email" />
                      <Column dataField="department" caption="Phòng ban" />
                      <Column dataField="note" caption="Ghi chú" />
                    </DataGrid>
                  </TabContainer>
                </SwipeableViews>
                <Button type="submit" variant="contained" color="primary">
                  Lưu
                </Button>
              </GridUI>
            </GridUI>
          </Paper>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  addSupplierPage: makeSelectAddSupplierPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    postSupplier: data => dispatch(postSupplier(data)),
    putSupplier: (id, data) => dispatch(putSupplier(id, data)),
    getSupplier: id => dispatch(getSupplier(id)),
    changeName: name => event => dispatch(changeValue({ name, value: event.target.value })),
    changeImage: data => dispatch(changeImage(data)),
    setDefaultState: () => dispatch(setDefaultState()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addSupplierPage', reducer });
const withSaga = injectSaga({ key: 'addSupplierPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddSupplierPage);
