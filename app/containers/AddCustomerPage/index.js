/* eslint-disable prettier/prettier */
/**
 *
 * AddCustomerPage
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
  Input,
  Avatar,
  FormControl,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  // Input,
  Tabs,
  Tab,
  ListItemText,
  InputAdornment,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import GridUI from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
import { Creatable } from 'react-select';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Edit, GpsFixed, Person, ExpandMore } from '@material-ui/icons';
import ReactGoogleMap from 'react-google-map';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import axios from 'axios';
import Snackbar from 'components/Snackbar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import locationIcon from '../../images/location.png';
import { API_KEY } from '../../config/urlConfig';
import makeSelectAddCustomerPage, { makeSelectExpand } from './selectors';
import reducer from './reducer';
import saga from './saga';
import avatarDefault from '../../images/avatar.jpg';

import { getInfo, postCustomer, putCustomer, handleChangeName, snackbar, changeSelect, changeExpanded, getAttribute } from './actions';
// import messages from './messages';
import styles from './styles';

// Validate max date
const d = new Date();
const currentMonth = (d.getMonth() + 1).toString();
const currentDay = d.getDate().toString();
const month = currentMonth.length === 1 ? `0${currentMonth}` : currentMonth;
const day = currentDay.length === 1 ? `0${currentDay}` : currentDay;
const year = d.getFullYear();
const max = `${year}-${month}-${day}`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
/* eslint-disable react/prefer-stateless-function */
export class AddCustomerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarURL: '',
      code: '',
      name: '',
      email: '',
      phoneNumber: '',
      gender: 'male',
      locationAddress: '',
      location: { lat: 0, lng: 0 },
      zoom: 18,
      search: '',
      cityCircle: {},
      birthDay: '',
      // address: 'Hanoi VietNam',
      website: '',
      avatar: '',
      fax: '',
      idetityCardNumber: '',
      passportNumber: '',
      bank: '',
      bankAccountNumber: '',
      taxCode: '',
      isTax: false,
      certifiedNoTaxNumber: '',
      businessRegistrationNumber: '',
      directManager: '',
      position: '',
      valueForTabs: 0,
      typeOfCustomer: 0,
      group: 0,
      branches: [],
      geographicalArea: [{ label: 'Hà Nội', value: 'hanoi', id: 1 }, { label: 'Đà Nẵng', value: 'danang', id: 2 }],
      productType: ['Nhà hàng'],
      businessItems: '',
      exchangeForm: ['Gửi mail'],
      referralSource: 0,
      introPerson: '',
      phoneIntroPerson: '',
      introducedNote: '',
      representativeName: '',
      representativePhone: '',
      representativeGender: 'male',
      representativeDob: '',
      representativeEmail: '',
      representativePosition: '',
      representativeNote: '',
      rows: [], // dữ liệu hiển thị
      isTaxTitle: false,
      valueArea: [],
      status: false,
    };
  }

  findAttribute = (attributes, id) => {
    const attribute = attributes.find(item => item.id === id).attributeGroups;

    if (attribute)
      return attribute.map(item => (
        <ExpansionPanel style={{ padding: 5 }}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography>{item.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {item.attributes.map(at => {
              switch (at.type) {
                case 'text':
                  return <TextField fullWidth label={at.name} margin="normal" />;
                case 'select':
                case 'list':
                  return (
                    <FormControl fullWidth>
                      <InputLabel htmlFor={at.code}>{at.name}</InputLabel>
                      <Select
                        fullWidth
                        native
                        inputProps={{
                          name: at.code,
                        }}
                      >
                        <option value="" />
                        {at.options.map(option => (
                          <option value={option.value}>{option.name}</option>
                        ))}
                      </Select>
                    </FormControl>
                  );
                default:
                  return <TextField fullWidth label={at.name} margin="normal" />;
              }
            })}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ));
    return null;
  };

  render() {
    const { classes } = this.props;
    const sn = this.props.addCustomerPage.snackbar;
    const { search, locationAddress, valueForTabs } = this.state;
    let { cityCircle } = this.state;
    const status = this.props.match.params.id === 'add' ? true : this.state.status;
    return (
      <div style={!status ? { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' } : { display: 'intinial' }}>
        {!status ? (
          <CircularProgress />
        ) : (
          <div>
            <Helmet>
              <title>Thêm mới khách hàng</title>
              <meta name="description" content="Description of AddCustomerPage" />
            </Helmet>

            <Paper className={classes.breadcrumbs}>
              <Breadcrumbs aria-label="Breadcrumb">
                <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
                  Dashboard
                </Link>
                <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/crm">
                  CRM
                </Link>
                <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/crm/customers">
                  Danh sách khách hàng
                </Link>
                <Typography color="textPrimary">Thêm mới khách hàng</Typography>
              </Breadcrumbs>
            </Paper>
            <ValidatorForm onSubmit={this.onSave}>
              <Paper className={classes.paper}>
                <GridUI container item md={12}>
                  <GridUI item md={6}>
                    <Typography component="p" className={classes.paperTitle}>
                      <Edit style={{ fontSize: '20px', marginBottom: '5px' }} /> Thông tin khách hàng{' '}
                      <span className={classes.spanTitle}>Các trường có dấu * là cần nhập</span>
                    </Typography>
                    <TextValidator
                      // eslint-disable-next-line no-useless-escape
                      validators={['required', 'matchRegexp:^[a-zA-Z0-9]{3,20}$']}
                      errorMessages={['Không được bỏ trống', 'Mã khách hàng chỉ bao gồm ký tự chữ hoặc số hoặc ký tự "-" ']}
                      value={this.state.code}
                      className={classes.textField}
                      name="code"
                      onChange={this.handleChange('code')}
                      label="Mã"
                      required
                    />
                    <TextValidator
                      validators={['required']}
                      errorMessages={['Không được bỏ trống']}
                      className={classes.textField}
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                      label="Tên"
                      required
                    />

                    <TextValidator
                      value={this.state.phoneNumber}
                      className={classes.textField}
                      name="phoneNumber"
                      onChange={this.handleChange('phoneNumber')}
                      label="Điện thoại"
                      validators={['required', 'matchRegexp:^[0-9]{10,12}$']}
                      errorMessages={['Không được bỏ trống', 'Định dạng số điện thoai không đúng']}
                      required
                    />
                    <TextValidator
                      className={classes.textField}
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      label="Email"
                      validators={['required', 'isEmail']}
                      errorMessages={['Không được bỏ trống', 'Không đúng định dạng Email']}
                      required
                    />
                    <InputLabel style={{ fontSize: 14, display: 'block' }}>Giới tính</InputLabel>
                    <Select className={classes.textField} value={this.state.gender} name="gender" onChange={this.handleChangeSelect}>
                      <MenuItem value="male">Nam</MenuItem>
                      <MenuItem value="female">Nữ</MenuItem>
                    </Select>
                    <TextField
                      value={this.state.birthDay}
                      className={classes.textField}
                      type="date"
                      name="birthDay"
                      onChange={this.handleChange('birthDay')}
                      label="Ngày sinh"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ max }}
                    />

                    <ReactGoogleMapLoader
                      params={{
                        key: API_KEY,
                        libraries: 'places,geocode',
                      }}
                      render={googleMaps =>
                        googleMaps && (
                          <div>
                            <ReactGooglePlacesSuggest
                              autocompletionRequest={{ input: search }}
                              googleMaps={googleMaps}
                              onSelectSuggest={this.handleSelectSuggest}
                            >
                              <Input
                                // className="input phone"
                                className={classes.addField}
                                // floatingLabelText="Vị trí"
                                placeholder="Vị trí"
                                type="text"
                                ref={ref => {
                                  this.desc = ref;
                                }}
                                style={{ marginTop: 20, marginBottom: 20 }}
                                value={locationAddress}
                                // floatingLabelStyle={styles.label}
                                // floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                onChange={this.handleInputChange}
                                fullWidth
                                endAdornment={
                                  <InputAdornment position="end" onClick={this.handleClickCurrentLocation}>
                                    <IconButton aria-label="Tìm địa điểm">{this.state.locationAddress ? <GpsFixed /> : ''}</IconButton>
                                  </InputAdornment>
                                }
                              />
                            </ReactGooglePlacesSuggest>

                            <div style={{ height: '300px' }} className={classes.addField}>
                              <ReactGoogleMap
                                googleMaps={googleMaps}
                                center={this.state.location}
                                zoom={this.state.zoom}
                                coordinates={[
                                  {
                                    title: 'Vị trí của bạn',
                                    icon: locationIcon,
                                    draggable: true,
                                    position: this.state.location,
                                    // eslint-disable-next-line no-shadow
                                    onLoaded: (googleMaps, map, marker) => {
                                      // vòng vị trí
                                      if (Object.entries(cityCircle).length === 0) {
                                        cityCircle = new googleMaps.Circle({
                                          strokeColor: '#57aad7',
                                          strokeOpacity: 0.8,
                                          strokeWeight: 1,
                                          fillColor: '#69c0ef',
                                          fillOpacity: 0.35,
                                          map,
                                          center: this.state.location,
                                          radius: 50,
                                        });
                                      } else {
                                        cityCircle.setMap(map);
                                        cityCircle.setCenter(this.state.location);
                                      }

                                      // hiển thị market ra giữa map
                                      map.panTo(this.state.location);

                                      // Set Marker animation
                                      // marker.setAnimation(googleMaps.Animation.BOUNCE)

                                      // Define Marker InfoWindow
                                      const infoWindow = new googleMaps.InfoWindow({
                                        content: `
                                  <div>
                                    <h5>${this.state.locationAddress}<h5>
                                  </div>
                                `,
                                      });

                                      //  OpenInfoWindow when Marker will be clicked
                                      googleMaps.event.addListener(marker, 'click', () => {
                                        infoWindow.open(map, marker);
                                      });

                                      // Change icon when Marker will be hovered
                                      googleMaps.event.addListener(marker, 'mouseover', () => {
                                        marker.setIcon(locationIcon);
                                      });

                                      googleMaps.event.addListener(marker, 'mouseout', () => {
                                        marker.setIcon(locationIcon);
                                      });

                                      googleMaps.event.addListener(marker, 'dragend', event => {
                                        this.onMarkerDragEnd(event);
                                        if (Object.entries(cityCircle).length !== 0) {
                                          cityCircle.setMap(null);
                                        }
                                      });
                                      // Open InfoWindow directly
                                      // infoWindow.open(map, marker);
                                    },
                                  },
                                ]}
                              />
                            </div>
                          </div>
                        )
                      }
                    />

                    <TextField
                      value={this.state.website}
                      className={classes.textField}
                      name="website"
                      onChange={this.handleChange('website')}
                      label="Website"
                    />
                    <TextField value={this.state.fax} className={classes.textField} name="fax" onChange={this.handleChange('fax')} label="FAX" />
                    <TextField
                      value={this.state.idetityCardNumber}
                      className={classes.textField}
                      name="idetityCardNumber"
                      onChange={this.handleChange('idetityCardNumber')}
                      label="Chứng minh thư"
                      type="number"
                    />
                    <TextField
                      value={this.state.passportNumber}
                      className={classes.textField}
                      name="passportNumber"
                      onChange={this.handleChange('passportNumber')}
                      label="Số hộ chiếu"
                    />
                    <InputLabel style={{ display: 'block', marginTop: '15px !important', fontSize: '14px' }}>Tên ngân hàng</InputLabel>
                    <Select className={classes.textField} value={this.state.bank} displayEmpty name="bank" onChange={this.handleChangeSelect}>
                      {/* <MenuItem value={0}>---Chọn ngân hàng---</MenuItem> */}
                      <MenuItem disabled value="">
                        ---Chọn ngân hàng---
                      </MenuItem>
                      <MenuItem value={0}>Ngân hàng cổ phần Ngoại thương Việt Nam(VCB)</MenuItem>
                      <MenuItem value={1}>Ngân hàng cổ phần Sài Gòn Thương tín(SCB)</MenuItem>
                    </Select>
                    <TextField
                      value={this.state.bankAccountNumber}
                      className={classes.textField}
                      type="number"
                      name="bankAccountNumber"
                      onChange={this.handleChange('bankAccountNumber')}
                      label="Số tài khoản"
                    />
                    <TextField
                      value={this.state.taxCode}
                      className={classes.textField}
                      name="taxCode"
                      onChange={this.handleChange('taxCode')}
                      label="Mã số thuế"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ marginLeft: 10 }}
                          checked={this.state.isTax}
                          onChange={this.handleChangeCheckbox('isTax')}
                          color="primary"
                        />
                      }
                      label="Thuế thu nhập"
                    />
                    {this.state.isTax === false ? (
                      <TextField
                        value={this.state.certifiedNoTaxNumber}
                        className={classes.textField}
                        name="certifiedNoTaxNumber"
                        onChange={this.handleChange('certifiedNoTaxNumber')}
                        label="Số giấy chứng nhận không thuế"
                      />
                    ) : (
                      ''
                    )}
                    <TextField
                      value={this.state.position}
                      className={classes.textField}
                      name="position"
                      onChange={this.handleChange('position')}
                      label="Chức vụ khách hàng"
                    />
                    <TextField
                      value={this.state.businessRegistrationNumber}
                      className={classes.textField}
                      name="businessRegistrationNumber"
                      onChange={this.handleChange('businessRegistrationNumber')}
                      label="Số đăng kí kinh doanh"
                    />
                    <TextField
                      value={this.state.directManager}
                      className={classes.textField}
                      name="directManager"
                      onChange={this.handleChange('directManager')}
                      label="Nhân viên quản lý"
                    />
                    <TextField
                      value={this.state.peopleCanView}
                      className={classes.textField}
                      name="peopleCanView"
                      onChange={this.handleChange('peopleCanView')}
                      label="Người được xem"
                    />
                    <TextField
                      multiline
                      rows={4}
                      value={this.state.note}
                      className={classes.textField}
                      name="note"
                      onChange={this.handleChange('note')}
                      label="Ghi chú"
                      InputLabelProps={{ shrink: true }}
                    />
                  </GridUI>
                  <GridUI item md={6}>
                    <Typography component="p" className={classes.paperTitle}>
                      <Person style={{ fontSize: '20px', marginBottom: '5px' }} /> Chọn ảnh đại diện
                    </Typography>
                    <Avatar alt="Ảnh đại diện" src={this.state.avatarURL || this.state.avatar || avatarDefault} className={classes.avatar} />
                    <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple onChange={this.onSelectImg} type="file" />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span" className={classes.button}>
                        Thêm ảnh đại diện
                      </Button>
                    </label>

                    <Typography component="p" className={classes.paperTitle} style={{ marginTop: 20 }}>
                      <Edit style={{ fontSize: '20px', marginBottom: 7 }} /> Chi tiết thông tin{' '}
                      <span className={classes.spanTitle}>Các trường có dấu * là cần nhập</span>
                    </Typography>
                    <Tabs
                      value={this.state.valueForTabs}
                      onChange={this.handleChangeTab}
                      indicatorColor="primary"
                      variant="scrollable"
                      scrollButtons="on"
                    >
                      <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Phân loại khách hàng" />
                      <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Người đại diện" />
                      <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Tùy chọn" />
                    </Tabs>
                    <SwipeableViews
                      // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      // style={{ overflowX: 'hidden !important' }}
                      index={valueForTabs}
                      onChangeIndex={this.handleChangeIndex}
                    >
                      <TabContainer>
                        <InputLabel style={{ fontSize: 14, display: 'block' }}>Loại khách hàng</InputLabel>
                        <Select
                          className={classes.textField}
                          value={this.state.typeOfCustomer}
                          name="typeOfCustomer"
                          onChange={this.handleChangeSelect}
                        >
                          <MenuItem value={0}>Công ty</MenuItem>
                          <MenuItem value={1}>Cá nhân</MenuItem>
                        </Select>
                        <InputLabel style={{ fontSize: 14, display: 'block' }}>Nhóm khách hàng</InputLabel>
                        <Select className={classes.textField} value={this.state.group} name="group" onChange={this.handleChangeSelect}>
                          <MenuItem value="none">Không</MenuItem>
                          <MenuItem value="gold">Khách hàng hạng vàng</MenuItem>
                          <MenuItem value="sliver">Khách hàng hạng bạc</MenuItem>
                        </Select>
                        <InputLabel style={{ fontSize: 14, display: 'block' }}>Phân cấp khách hàng</InputLabel>
                        <Select multiple className={classes.textField} value={this.state.branches} name="branches" onChange={this.handleChangeSelect}>
                          <MenuItem value={0}>Không</MenuItem>
                          <MenuItem value={1}>Đại lí cấp 1</MenuItem>
                          <MenuItem value={2}>Đại lí cấp 2</MenuItem>
                          <MenuItem value={3}>Đại lí cấp 3</MenuItem>
                          <MenuItem value={4}>Khách lẻ</MenuItem>
                        </Select>
                        <InputLabel style={{ display: 'block' }}>Ngành nghề kinh doanh</InputLabel>
                        <Select
                          multiple
                          value={this.state.productType}
                          name="productType"
                          className={classes.textField}
                          onChange={this.handleChangeSelect}
                          input={<Input id="select-multiple-checkbox" />}
                          renderValue={selected => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="Nhà hàng">
                            <Checkbox checked={this.state.productType.indexOf('Nhà hàng') > -1} />
                            <ListItemText primary="Nhà hàng" />
                          </MenuItem>
                          <MenuItem value="Ngân hàng">
                            <Checkbox checked={this.state.productType.indexOf('Ngân hàng') > -1} />
                            <ListItemText primary="Ngân hàng" />
                          </MenuItem>
                          <MenuItem value="Đại lí bán buôn">
                            <Checkbox checked={this.state.productType.indexOf('Đại lí bán buôn') > -1} />
                            <ListItemText primary="Đại lí bán buôn" />
                          </MenuItem>
                          <MenuItem value="Đại lí bán lẻ">
                            <Checkbox checked={this.state.productType.indexOf('Đại lí bán lẻ') > -1} />
                            <ListItemText primary="Đại lí bán lẻ" />
                          </MenuItem>
                        </Select>
                        <TextField
                          value={this.state.businessItems}
                          className={classes.textField}
                          name="businessItems"
                          onChange={this.handleChange('businessItems')}
                          label="Mặt hàng kinh doanh"
                        />
                        <InputLabel style={{ display: 'block' }}>Hình thức trao đổi</InputLabel>
                        <Select
                          multiple
                          value={this.state.exchangeForm}
                          name="exchangeForm"
                          className={classes.textField}
                          onChange={this.handleChangeSelect}
                          input={<Input id="select-multiple-checkbox" />}
                          renderValue={selected => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="Gửi mail">
                            <Checkbox checked={this.state.exchangeForm.indexOf('Gửi mail') > -1} />
                            <ListItemText primary="Gửi mail" />
                          </MenuItem>
                          <MenuItem value="Gọi điện">
                            <Checkbox checked={this.state.exchangeForm.indexOf('Gọi điện') > -1} />
                            <ListItemText primary="Gọi điện" />
                          </MenuItem>
                          <MenuItem value="Gặp mặt">
                            <Checkbox checked={this.state.exchangeForm.indexOf('Gặp mặt') > -1} />
                            <ListItemText primary="Gặp mặt" />
                          </MenuItem>
                          <MenuItem value="SMS">
                            <Checkbox checked={this.state.exchangeForm.indexOf('SMS') > -1} />
                            <ListItemText primary="SMS" />
                          </MenuItem>
                          <MenuItem value="Facebook">
                            <Checkbox checked={this.state.exchangeForm.indexOf('Facebook') > -1} />
                            <ListItemText primary="Facebook" />
                          </MenuItem>
                        </Select>
                        <InputLabel style={{ display: 'block', marginBottom: 10 }}>Khu vực địa lý</InputLabel>
                        <Creatable
                          isAllowCreate
                          className={classes.creatable}
                          // onInputChange={inputValue => (this.inputValue = inputValue)}
                          options={this.state.geographicalArea}
                          // optionRenderer={this.renderOption}
                          onChange={this.setValue}
                          value={this.state.valueArea}
                          // valueRenderer={this.state[curLabelData] ? this.renderValue: this.renderStr }
                          isMulti
                        />
                        <InputLabel style={{ fontSize: 14, display: 'block', marginTop: 10 }}>Nguồn</InputLabel>
                        <Select
                          className={classes.textField}
                          value={this.state.referralSource}
                          name="referralSource"
                          onChange={this.handleChangeSelect}
                        >
                          <MenuItem value={0}>Facebook</MenuItem>
                          <MenuItem value={1}>Google</MenuItem>
                          <MenuItem value={2}>Giới thiệu</MenuItem>
                          <MenuItem value={3}>SMS Maketing</MenuItem>
                          <MenuItem value={4}>Email Maketing</MenuItem>
                        </Select>
                        <TextField
                          value={this.state.introPerson}
                          className={classes.textField}
                          name="introPerson"
                          onChange={this.handleChange('introPerson')}
                          label="Người giới thiệu"
                        />

                        <TextValidator
                          value={this.state.phoneIntroPerson}
                          className={classes.textField}
                          name="phoneIntroPerson"
                          onChange={this.handleChange('phoneIntroPerson')}
                          label="SĐT người giới thiệu"
                          validators={['matchRegexp:^[0-9]{10,12}$']}
                          errorMessages={['Định dạng số điện thoai không đúng']}
                        />
                        <TextField
                          value={this.state.introducedNote}
                          className={classes.textField}
                          name="introducedNote"
                          multiline
                          rows={4}
                          onChange={this.handleChange('introducedNote')}
                          label="Ghi chú"
                        />
                        <Typography component="p" className={classes.paperTitle} style={{ marginTop: 20 }}>
                          Chọn bộ thuộc tính
                        </Typography>
                        <Select
                          className={classes.textField}
                          value={this.props.addCustomerPage.attributeSelect}
                          name="attributes"
                          onChange={this.props.handleChangeSelect}
                        >
                          {this.props.addCustomerPage.attributes.map(item => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))}
                        </Select>
                        {this.props.addCustomerPage.attributeSelect
                          ? this.findAttribute(this.props.addCustomerPage.attributes, this.props.addCustomerPage.attributeSelect)
                          : null}
                      </TabContainer>
                      <TabContainer>
                        <TextField
                          // value={this.state.fax}
                          className={classes.textField}
                          value={this.state.representativeName}
                          name="representativeName"
                          onChange={this.handleChange('representativeName')}
                          label="Tên"
                        />

                        <TextValidator
                          value={this.state.representativePhone}
                          className={classes.textField}
                          name="representativePhone"
                          onChange={this.handleChange('representativePhone')}
                          label="Điện thoại"
                          validators={['matchRegexp:^[0-9]{10,12}$']}
                          errorMessages={['Định dạng số điện thoai không đúng']}
                        />
                        <InputLabel style={{ fontSize: 14, display: 'block' }}>Giới tính</InputLabel>
                        <Select
                          className={classes.textField}
                          value={this.state.representativeGender}
                          name="representativeGender"
                          onChange={this.handleChangeSelect}
                        >
                          <MenuItem value="male">Nam</MenuItem>
                          <MenuItem value="female">Nữ</MenuItem>
                        </Select>
                        <TextField
                          // value={this.state.dob}
                          className={classes.textField}
                          type="date"
                          value={this.state.representativeDob}
                          onChange={this.handleChange('representativeDob')}
                          label="Ngày sinh"
                          InputLabelProps={{ shrink: true }}
                        />

                        <TextValidator
                          value={this.state.representativeEmail}
                          className={classes.textField}
                          name="representativeEmail"
                          onChange={this.handleChange('representativeEmail')}
                          label="Email"
                          validators={['isEmail']}
                          errorMessages={['Định dạng số email không đúng']}
                        />
                        <TextField
                          // value={this.state.fax}
                          className={classes.textField}
                          value={this.state.representativePosition}
                          name="representativePosition"
                          onChange={this.handleChange('representativePosition')}
                          label="Chức vụ"
                        />
                        <TextField
                          // value={this.state.fax}
                          className={classes.textField}
                          value={this.state.representativeNote}
                          multiline
                          rows={4}
                          name="representativeNote"
                          onChange={this.handleChange('representativeNote')}
                          label="Ghi chú"
                        />
                        <Typography component="p" className={classes.paperTitle} style={{ marginTop: 20 }}>
                          <Edit style={{ fontSize: '20px', marginBottom: 7 }} /> Thông tin người đầu mối
                        </Typography>
                        <DataGrid id="gridContainer" dataSource={this.state.rows} ders repaintChangesOnly>
                          <Paging enabled={false} />
                          <Editing
                            refreshMode="repaint"
                            mode="cell"
                            texts={{ confirmDeleteMessage: 'Bạn có muốn xóa hàng này không?' }}
                            allowUpdating
                            allowDeleting
                            allowAdding
                          />

                          <Column dataField="id" caption="STT" width={55} />
                          <Column dataField="name" caption="Họ tên" />
                          <Column dataField="phoneNumber" caption="SĐT" />
                          <Column dataField="email" caption="Email" />
                          <Column dataField="department" caption="Phòng ban" />
                          <Column dataField="note" caption="Ghi chú" />
                        </DataGrid>
                      </TabContainer>
                      <TabContainer>
                        <TextField
                          value={this.state.debitAccount}
                          className={classes.textField}
                          name="debitAccount"
                          onChange={this.handleChange('debitAccount')}
                          label="TK Khách Nợ"
                          type="number"
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          value={this.state.customDebitAccount}
                          className={classes.textField}
                          name="customDebitAccount"
                          onChange={this.handleChange('customDebitAccount')}
                          label="TK Nợ Khách"
                          type="number"
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          value={this.state.debtLimit}
                          className={classes.textField}
                          name="debtLimit"
                          onChange={this.handleChange('debtLimit')}
                          label="Hạn mức công nợ"
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          value={this.state.saleCount}
                          className={classes.textField}
                          name="saleCount"
                          onChange={this.handleChange('saleCount')}
                          label="Số lần mua hàng còn lại để được giảm giá"
                          type="number"
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          value={this.state.debitAge}
                          className={classes.textField}
                          name="debitAge"
                          onChange={this.handleChange('debitAge')}
                          label="Tuổi nợ"
                          InputLabelProps={{ shrink: true }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ marginLeft: 10 }}
                              checked={this.state.isTaxTitle}
                              onChange={this.handleChangeCheckbox('isTaxTitle')}
                              value="isTaxTitle"
                              color="primary"
                            />
                          }
                          label="Tiêu đề mặc đinh thuế trong bán hàng "
                        />
                        {this.state.isTaxTitle ? (
                          <div>
                            <div style={{ display: 'block' }}>
                              <InputLabel style={{ display: 'inline', verticalAlign: 'middle', marginRight: 20, marginBottom: 30 }}>
                                Thuế 1:{' '}
                              </InputLabel>
                              <TextField
                                // value={this.state.fax}
                                style={{ width: '30%', display: 'inline', marginRight: 30 }}
                                inputRef={e => {
                                  this.taxName1 = e;
                                  return true;
                                }}
                                name="taxName1"
                                onChange={this.handleChange('taxName1')}
                                label="Tên thuế"
                              />
                              <TextField
                                // value={this.state.fax}
                                style={{ width: '30%' }}
                                inputRef={e => {
                                  this.taxPercent1 = e;
                                  return true;
                                }}
                                name="taxPercent1"
                                onChange={this.handleChange('taxPercent1')}
                                label="Phần trăm thuế"
                              />
                            </div>
                            <div style={{ display: 'block' }}>
                              <InputLabel style={{ display: 'inline', verticalAlign: 'middle', marginRight: 20, marginBottom: 30 }}>
                                Thuế 2:{' '}
                              </InputLabel>
                              <TextField
                                // value={this.state.fax}
                                style={{ width: '30%', display: 'inline', marginRight: 30 }}
                                inputRef={e => {
                                  this.taxName2 = e;
                                  return true;
                                }}
                                name="taxName2"
                                onChange={this.handleChange('taxName2')}
                                label="Tên thuế"
                              />
                              <TextField
                                // value={this.state.fax}
                                style={{ width: '30%' }}
                                inputRef={e => {
                                  this.taxPercent2 = e;
                                  return true;
                                }}
                                name="taxPercent2"
                                onChange={this.handleChange('taxPercent2')}
                                label="Phần trăm thuế"
                              />
                            </div>
                            <div style={{ display: 'block' }}>
                              <InputLabel style={{ display: 'inline', verticalAlign: 'middle', marginRight: 20, marginBottom: 30 }}>
                                Thuế 3:{' '}
                              </InputLabel>
                              <TextField
                                // value={this.state.fax}
                                style={{ width: '30%', display: 'inline', marginRight: 30 }}
                                inputRef={e => {
                                  this.taxName3 = e;
                                  return true;
                                }}
                                name="taxName3"
                                onChange={this.handleChange('taxName3')}
                                label="Tên thuế"
                              />
                              <TextField
                                // value={this.state.fax}
                                style={{ width: '30%' }}
                                inputRef={e => {
                                  this.taxPercent3 = e;
                                  return true;
                                }}
                                name="taxPercent3"
                                onChange={this.handleChange('taxPercent3')}
                                label="Phần trăm thuế"
                              />
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </TabContainer>
                    </SwipeableViews>
                    <Button type="submit" variant="contained" color="primary">
                      Lưu
                    </Button>
                  </GridUI>
                </GridUI>
              </Paper>
            </ValidatorForm>
            <Snackbar
              onClose={() => this.props.snackbar(sn)}
              open={this.props.addCustomerPage.snackbar.status}
              message={this.props.addCustomerPage.snackbar.message}
              variant={this.props.addCustomerPage.snackbar.variant}
            />
            {/* <FormattedMessage {...messages.header} /> */}
          </div>
        )}
      </div>
    );
  }

  // componentWillMount() {
  //   this.getLocationByLatLng(this.state.location.lat, this.state.location.lng, 'default');
  // }

  onLoadSuccess(customerInfo) {
    this.setState({ name: customerInfo.name });
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'add') {
      this.props.getInfo(this.props.match.params.id);
    } else this.props.getAttribute();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id === 'add') return null;
    const status = props.addCustomerPage.loading ? 'loading' : props.addCustomerPage.success ? 'success' : null;
    if (props.addCustomerPage.loading) {
      return {
        status,
      };
    }
    if (props.addCustomerPage.success && state.status === 'success') {
      return null;
    }
    if (props.addCustomerPage.success) {
      const data = props.addCustomerPage.data.customerInfo;
      const { represent, typeCustomer, options } = props.addCustomerPage.data.detailInfo;

      return {
        code: data.code,
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        gender: data.gender,
        birthDay: data.birthDay,
        website: data.website,
        avatar: data.avatar,
        fax: data.fax,
        idetityCardNumber: data.idetityCardNumber,
        passportNumber: data.passportNumber,
        bank: data.bank,
        bankAccountNumber: data.bankAccountNumber,
        taxCode: data.taxCode,
        isTax: data.isTax,
        businessRegistrationNumber: data.businessRegistrationNumber,
        certifiedNoTaxNumber: data.certifiedNoTaxNumber,
        position: data.position,
        managerEmployee: data.managerEmployee,
        status,
        note: data.note,
        locationAddress: data.address,
        representativeName: represent.name,
        representativePhone: represent.phoneNumber,
        representativeGender: represent.gender,
        representativeDob: represent.birthDay,
        representativeEmail: represent.email,
        representativePosition: represent.position,
        representativeNote: represent.note,
        rows: represent.localPersonInfo,
        debitAccount: options.debitAccount,
        customDebitAccount: options.customDebitAccount,
        debtLimit: options.debtLimit,
        saleCount: options.saleCount,
        debitAge: options.debitAge,
        isTaxTitle: options.isTaxTitle,
        introPerson: typeCustomer.introPerson,
        phoneIntroPerson: typeCustomer.phoneIntroPerson,
        introducedNote: typeCustomer.introducedNote,
      };
    }

    return null;
  }

  setValue = valueArea => {
    this.setState({ valueArea });
  };

  handleChangeTab = (event, value) => {
    this.setState({ valueForTabs: value });
  };

  handleChangeIndex = index => {
    this.setState({ valueForTabs: index });
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleChangeProps = name => e => {
    this.props.handleChange({ [name]: e.target.value });
  };

  handleChangeSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSave = () => {
    const state = this.state;
    const id = this.props.match.params.id;
    const data = {
      customerInfo: {
        code: state.code,
        name: state.name,
        phoneNumber: state.phoneNumber,
        email: state.email,
        gender: state.gender,
        birthDay: state.birthDay,
        website: state.website,
        fax: state.fax,
        idetityCardNumber: state.idetityCardNumber,
        passportNumber: state.passportNumber,
        bank: state.bank,
        bankAccountNumber: state.bankAccountNumber,
        taxCode: state.taxCode,
        isTax: state.isTax,
        address: state.locationAddress,
        certifiedNoTaxNumber: state.certifiedNoTaxNumber,
        position: state.position,
        // managerEmployee: state.directManager,
        viewableEmployees: '5cdcde82038ab06284d3fc7c',
        note: state.note,
        avatar: state.avatar,
        avatarURL: state.avatarURL,
      },
      detailInfo: {
        typeCustomer: {
          typeOfCustomer: 'String',
          group: 'gold',
          branches: [],
          productType: 'String',
          contactWays: [],
          areas: [],
          introducedWay: 'String',
          introPerson: state.introPerson,
          phoneIntroPerson: state.phoneIntroPerson,
          introducedNote: state.introducedNote,
          setAttribute: 'String',
        },
        represent: {
          name: state.representativeName,
          phoneNumber: state.representativePhone,
          gender: state.representativeGender,
          birthDay: state.representativeDob,
          email: state.representativeEmail,
          position: state.representativePosition,
          note: state.representativeNote,
          localPersonInfo: state.rows,
        },
        options: {
          debitAccount: state.debitAccount,
          customDebitAccount: state.customDebitAccount,
          debtLimit: state.debtLimit,
          saleCount: state.saleCount,
          debitAge: state.debitAge,
          isTaxTitle: state.isTaxTitle,
          taxTitle: [
            {
              name: 'bac',
              percent: 10,
            },
          ],
        },
      },
    };

    if (id === 'add') {
      this.props.postCustomer(data);
    } else this.props.putCustomer(id, data);
  };

  onSelectImg = e => {
    const urlAvt = URL.createObjectURL(e.target.files[0]);
    this.setState({ avatarURL: urlAvt, avatar: e.target.files[0] });
  };

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value, locationAddress: e.target.value });
  };

  handleSelectSuggest = suggest => {
    const lat = suggest.geometry.location.lat();
    const lng = suggest.geometry.location.lng();
    this.setState({ search: '', locationAddress: suggest.formatted_address, location: { lat, lng } });
  };

  handleClickCurrentLocation = () => {
    const { lat, lng } = this.state.location;
    this.getLocationByLatLng(lat, lng, 'default');
  };
  /* eslint-disable */
  onMarkerDragEnd = evt => {
    if (window.google) {
      const cityCircle = new google.maps.Circle({
        strokeColor: '#57aad7',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#69c0ef',
        fillOpacity: 0.35,
        // map,
        // center: this.state.location,
        radius: 50,
      });
      this.state.cityCircle = cityCircle;
    }
    this.getLocationByLatLng(evt.latLng.lat(), evt.latLng.lng());
  };

  /* eslint-enable */
  getLocationByLatLng(latitude, longitude, df = false) {
    const self = this;
    let location = null;
    if (window.navigator && window.navigator.geolocation) {
      location = window.navigator.geolocation;
    }
    if (location) {
      location.getCurrentPosition(position => {
        let lat = latitude;
        let lng = longitude;
        if (df === 'default') {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAXhItM5DtDeNF7uesxuyhEGd3Wb_5skTg`;
        axios.get(url).then(data => {
          const { results } = data.data;
          if (!!results && !!results.length) {
            /* eslint camelcase: ["error", {ignoreDestructuring: true}] */
            /* eslint-disable */
            const { formatted_address } = results[0];
            self.setState({
              locationAddress: formatted_address,
              location: { lat, lng },
            });
          }
        });
      });
    }
  }
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

AddCustomerPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addCustomerPage: makeSelectAddCustomerPage(),
  expanded: makeSelectExpand(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getInfo: id => dispatch(getInfo(id)),
    postCustomer: data => dispatch(postCustomer(data)),
    putCustomer: (id, data) => dispatch(putCustomer(id, data)),
    handleChange: data => dispatch(handleChangeName(data)),
    snackbar: snack => dispatch(snackbar(snack)),
    handleChangeSelect: e => dispatch(changeSelect(e.target.value)),
    changeExpanded: id => dispatch(changeExpanded(id)),
    getAttribute: () => dispatch(getAttribute()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addCustomerPage', reducer });
const withSaga = injectSaga({ key: 'addCustomerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(AddCustomerPage);
