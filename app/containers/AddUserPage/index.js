/**
 *
 * AddUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Table from '@material-ui/core/Table';
import Tab from '@material-ui/core/Tab';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withSnackbar } from 'notistack';

import { Breadcrumbs } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TextField, Button, List, ListItem, ListItemIcon, Collapse, Paper, FormControl, FormHelperText } from '@material-ui/core';
import CameraAlt from '@material-ui/icons/CameraAlt';
import makeSelectAddUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import avatarA from '../../images/avatar.png';
import styles from './styles';
import { addUserAction, getDepartmentAct, resetNoti, editUserAct, getUserAct } from './actions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const currencies = [
  {
    value: '1',
    label: 'Nhóm 1',
  },
  {
    value: '2',
    label: 'Nhóm 2',
  },
  {
    value: '3',
    label: 'Nhóm 3',
  },
  {
    value: '4',
    label: 'Nhóm 4',
  },
  {
    value: 'Admin',
    label: 'Quản trị viên',
  },
  {
    value: 'user',
    label: 'Quyền Xem',
  },
];
const phanQuyenChucNang = [
  {
    id: 1,
    name: 'Khách hàng',
    xem: true,
    them: true,
    sua: true,
    xoa: true,
    xuat: true,
    inport: true,
  },
  {
    id: 2,
    name: 'Hợp đồng',
    xem: true,
    them: false,
    sua: true,
    xoa: true,
    xuat: false,
    inport: true,
  },
  {
    id: 3,
    name: 'Dịch vụ',
    xem: false,
    them: true,
    sua: false,
    xoa: true,
    xuat: true,
    inport: true,
  },
  {
    id: 4,
    name: 'Báo cáo',
    xem: true,
    them: true,
    sua: true,
    xoa: true,
    xuat: true,
    inport: false,
  },
];
const phanQuyenBaoCao = [
  {
    id: 1,
    name: 'Báo cáo hoạt động kinh doanh',
    xem: true,
    xuat: true,
  },
  {
    id: 2,
    name: 'Báo cáo cá nhân',
    xem: true,
    xuat: true,
  },
  {
    id: 3,
    name: 'Báo cáo quản trị phòng',
    xem: true,
    xuat: true,
  },
];
const BaoCaoPheDuyet = [
  {
    name: 'Phê duyệt báo cáo',
    checked: true,
  },
  {
    name: 'Phê duyệt',
    checked: true,
    childrens: [
      {
        name: 'Phê duyệt nghỉ phép',
        checked: true,
      },
      {
        name: 'Phê duyệt bằng lương',
        checked: false,
      },
      {
        name: 'Phê duyệt chi',
        checked: false,
      },
      {
        name: 'Phê duyệt thu',
        checked: true,
      },
      {
        name: 'Phê duyệt điều chuyển công tác',
        checked: false,
      },
    ],
  },
  {
    name: 'Cảnh báo',
    checked: false,
    childrens: [
      {
        name: 'Cảnh báo nhân sự nghỉ quá nhiều',
        checked: true,
      },
      {
        name: 'Cảnh báo công việc chậm tiến độ',
        checked: false,
      },
    ],
  },
];

/* eslint-disable react/prefer-stateless-function */
export class AddUserPage extends React.PureComponent {
  state = {
    expanded: 'panel1',
    avatarURL: '',
    avatar: '',
    value: 0,
    code: '',
    name: '',
    gender: 0,
    email: '',
    mobileNumber: '',
    timeToJoin: '',
    dob: '',
    address: '',
    IDcard: '',
    positions: '',
    organizationUnit: '',
    note: '',
    // roles: '',
    username: '',
    rePassword: '',
    password: '',
    listOrganizationUnit: [],
    active: false,
    errorName: false,
    errorCode: false,
    errorEmail: false,
    errorUsername: false,
    errorNotMatch: false,
    errorPassword: false,
    user: null,
  };

  componentWillMount() {
    this.props.onResetNoti();
    this.props.onGetOrganizationUnit();
    const { match } = this.props;
    if (match.params.id) {
      this.props.onGetUser(match.params.id);
    }
  }

  // componentWillUnmount() {
  //   const { addUserPage } = this.props;
  //   if (addUserPage.successCreate === true) {
  //     this.state.user = null;
  //     localStorage.removeItem('user');
  //     this.props.onResetNoti();
  //   }
  // }

  componentDidMount() {
    const { addUserPage } = this.props;
    this.state.listOrganizationUnit = [];
    // if (addUserPage.listOrganizationUnit) {
    addUserPage.listOrganizationUnit.forEach(unit => {
      const newItem = {
        id: unit.id,
        name: unit.name,
      };
      this.state.listOrganizationUnit.push(newItem);
      if (unit.child && unit.child.length > 0) {
        this.listChil(unit.child, 20);
      }
    });
    const { listOrganizationUnit } = this.state;

    if (listOrganizationUnit.length > 0) {
      const id = listOrganizationUnit[0].id;
      this.setState({ organizationUnit: id });
    }
    this.props.onResetNoti();
    // const user = addUserPage.user || null;
    // console.log(user)
    // if (user !== null && user.id === this.props.match.params.id) {
    //   this.state.address = user.address;
    //   this.state.timeToJoin = moment(user.beginWork).format('YYYY-MM-DD');
    //   this.state.code = user.code;
    //   this.state.email = user.email;
    //   this.state.dob = moment(user.dob).format('YYYY-MM-DD');
    //   this.state.gender = user.gender === 'male' ? 0 : 1;
    //   this.state.id = user._id;
    //   this.state.IDcard = user.identityCardNumber;
    //   this.state.name = user.name;
    //   this.state.note = user.note;
    //   this.state.organizationUnit = user.organizationUnit;
    //   this.state.mobileNumber = user.phoneNumber;
    //   this.state.positions = user.positions;
    //   this.state.active = user.status === 1;
    //   this.state.user = user;
    //   this.state.avatarURL = user.avatar;
    // }
    // }
  }

  componentDidUpdate() {
    const { addUserPage } = this.props;
    if (addUserPage.successCreate === true) {
      this.props.enqueueSnackbar('Thao tác thành công!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      this.props.history.push('/setting/user');
      this.props.onResetNoti();
    }
    if (addUserPage.error) {
      this.props.enqueueSnackbar('Thao tác thất bại!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      this.props.onResetNoti();
    }
  }

  componentWillReceiveProps(props) {
    if (props !== this.props) {
      const { addUserPage } = props;
      // let { listOrganizationUnit } = this.state;
      this.state.listOrganizationUnit = [];
      // if (addUserPage.listOrganizationUnit) {
      addUserPage.listOrganizationUnit.forEach(unit => {
        const newItem = {
          id: unit._id,
          name: unit.name,
          padding: 0,
        };
        this.state.listOrganizationUnit.push(newItem);
        if (unit.child && unit.child.length > 0) {
          this.listChil(unit.child, 20);
        }
      });
      const { listOrganizationUnit } = this.state;
      if (listOrganizationUnit.length > 0) {
        const id = listOrganizationUnit[0].id;
        if (this.state.user === null) {
          this.setState({ organizationUnit: id });
        } else {
          const { user } = this.state;
          this.setState({ organizationUnit: user.organizationUnit });
        }
      }
      const user = addUserPage.user || null;
      if (user !== null && user._id === this.props.match.params.id) {
        this.state.address = user.address;
        this.state.timeToJoin = moment(user.beginWork).format('YYYY-MM-DD');
        this.state.code = user.code;
        this.state.email = user.email;
        this.state.dob = moment(user.dob).format('YYYY-MM-DD');
        this.state.gender = user.gender === 'male' ? 0 : 1;
        this.state.id = user.id;
        this.state.IDcard = user.identityCardNumber;
        this.state.name = user.name;
        this.state.note = user.note;
        this.state.organizationUnit = user.organizationUnit;
        this.state.mobileNumber = user.phoneNumber;
        this.state.positions = user.positions;
        this.state.active = user.status === 1;
        this.state.user = user;
        this.state.avatarURL = user.avatar;
        this.state.username = user.username;
      }
    }
  }

  listChil = (chil, level) => {
    if (chil.length > 0) {
      chil.forEach(item => {
        const newItem = {
          id: item._id,
          name: item.name,
          padding: `${level}`,
        };
        this.state.listOrganizationUnit.push(newItem);
        if (item.child && item.child.length > 0) {
          this.listChil(item.child, level + 20);
        }
      });
    }
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChangeCheckbox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  // self = this;

  handleClickAddNewUser = () => {
    const body = {};

    this.props.onAddNewUser(body);
  };

  handleChangeInput = e => {
    // console.log(this.code.value);
    if (
      e.target.name === 'name' ||
      e.target.name === 'code' ||
      e.target.name === 'email' ||
      e.target.name === 'username' ||
      e.target.name === 'password' ||
      e.target.name === 'rePassword'
    ) {
      if (e.target.name === 'name') {
        this.state.errorName = false;
      }
      if (e.target.name === 'code') {
        this.state.errorCode = false;
      }
      if (e.target.name === 'email') {
        this.state.errorEmail = false;
      }
      if (e.target.name === 'username') {
        this.state.errorUsername = false;
      }
      if (e.target.name === 'password') {
        this.state.errorPassword = false;
      }
      if (e.target.name === 'rePassword') {
        this.state.errorNotMatch = false;
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectImg = e => {
    // const types = ['image/png', 'image/jpeg', 'image/gif'];
    // const file = e.target.files[0];
    // k có file
    // if (!file) return false;

    // // let checkFile = true;
    // // let txt = '';

    // // // check image type
    // // if (types.every(type => file.type !== type)) {
    // //   checkFile = false;
    // //   txt = 'File bạn vừa chọn không đúng định dạng';
    // //   // check image size > 3mb
    // // } else if (file.size / 1024 / 1024 > 3) {
    // //   checkFile = false;
    // //   txt = 'Dung lượng file tối đa là 3MB';
    // // }

    // // confirm logo
    // if (!checkFile) {
    //   // this.props.enqueueSnackbar(txt, {
    //   //   variant: 'error',
    //   //   anchorOrigin: {
    //   //     vertical: 'bottom',
    //   //     horizontal: 'right',
    //   //   },
    //   //   autoHideDuration: 3000,
    //   // });
    // } else {
    //   const urlAvt = URL.createObjectURL(e.target.files[0]);
    //   this.setState({ avatarURL: urlAvt });
    // }
    const urlAvt = URL.createObjectURL(e.target.files[0]);
    this.setState({ avatarURL: urlAvt, avatar: e.target.files[0] }); // avatar: e.target.files[0]
  };

  render() {
    const { classes } = this.props;
    const { expanded, value } = this.state;
    const showDataTable = data => {
      const tag = [];
      data.forEach(row => {
        tag.push(
          <ListItem>
            <ListItemIcon>
              {/* <InboxIcon /> */}
              <Checkbox checked={row.checked} />
            </ListItemIcon>
            <span style={{ fontSize: '0.75rem' }}>{row.name}</span>
          </ListItem>,
        );
        if (row.childrens)
          row.childrens.forEach(child => {
            tag.push(
              <Collapse style={{ marginLeft: 40 }} in>
                <List component="div" disablePadding>
                  <ListItem button className={{ marginLeft: 10, height: 20 }}>
                    <ListItemIcon>
                      <Checkbox checked={child.checked} />
                    </ListItemIcon>
                    <span style={{ fontSize: '0.75rem' }}>{child.name}</span>
                  </ListItem>
                </List>
              </Collapse>,
            );
          });
      });
      return tag;
    };
    return (
      <div className={classes.root}>
        <Helmet>
          {this.state.user === null ? <title>Thêm mới nhân sự</title> : <title>Sửa nhân sự</title>}
          <meta name="description" content="Description of AddUserPage" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/setting/user">
              Danh sách nhân sự
            </Link>
            {this.state.user === null ? (
              <Typography color="textPrimary">Thêm mới nhân sự</Typography>
            ) : (
              <Typography color="textPrimary">Sửa nhân sự</Typography>
            )}
          </Breadcrumbs>
        </Paper>
        {/* <Typography h1>Thêm mới nhân sự</Typography> */}
        <Grid container>
          <Grid item md={8}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Thông tin cơ bản nhân viên</Typography>
                <Typography className={classes.secondaryHeading}>Các trường có dấu * là bắt buộc</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid justify="flex-start" container item md={6}>
                    <FormControl className={classes.textField1} error>
                      <TextField
                        id="code"
                        label="Mã nhân sự (*) : "
                        onChange={this.handleChangeInput}
                        type="text"
                        className={classes.textField}
                        value={this.state.code}
                        name="code"
                        // inputRef={input => (this.code = input)}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {this.state.errorCode ? (
                        <FormHelperText id="component-error-text1" style={{ marginTop: -5 }}>
                          Mã nhân viên không được để trống
                        </FormHelperText>
                      ) : (
                        ''
                      )}
                    </FormControl>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Giới tính"
                      name="gender"
                      className={classes.textField}
                      value={this.state.gender}
                      onChange={this.handleChangeInput}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      // helperText="Please select your currency"
                      margin="normal"
                    >
                      <MenuItem key="0" value={0}>
                        Nam
                      </MenuItem>
                      <MenuItem key="1" value={1}>
                        Nữ
                      </MenuItem>
                    </TextField>
                    <FormControl className={classes.textField1} style={{ padding: 0 }} error>
                      <TextField
                        id="email"
                        label="Email : "
                        // inputRef={input => (this.email = input)}
                        type="text"
                        name="email"
                        className={classes.textField}
                        onChange={this.handleChangeInput}
                        value={this.state.email}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />

                      {this.state.errorEmail ? (
                        <FormHelperText id="component-error-text1" style={{ marginTop: -5 }}>
                          Email không hợp lệ
                        </FormHelperText>
                      ) : (
                        ''
                      )}
                    </FormControl>
                    <TextField
                      id="phoneNumber"
                      label="Số điện thoại: "
                      value={this.state.mobileNumber}
                      name="mobileNumber"
                      onChange={this.handleChangeInput}
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      name="timeToJoin"
                      label="Thời gian vào: "
                      type="date"
                      value={this.state.timeToJoin}
                      className={classes.textField}
                      onChange={this.handleChangeInput}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="standard-select-currency"
                      // select
                      name="positions"
                      label="Cấp bậc:"
                      onChange={this.handleChangeInput}
                      className={classes.textField}
                      value={this.state.positions}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      // helperText="Please select your currency"
                      margin="normal"
                    />
                  </Grid>
                  <Grid container justify="flex-end" item md={6}>
                    <FormControl className={classes.textField} style={{ padding: 0 }} error>
                      <TextField
                        id="name"
                        label="Họ và tên (*): "
                        value={this.state.name}
                        name="name"
                        onChange={this.handleChangeInput}
                        type="text"
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                      {this.state.errorName ? (
                        <FormHelperText id="component-error-text1" style={{ marginTop: -5 }}>
                          Họ và tên không được để trống
                        </FormHelperText>
                      ) : (
                        ''
                      )}
                    </FormControl>
                    <TextField
                      id="dob"
                      label="Ngày sinh: "
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleChangeInput}
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="cmtnd"
                      label="Số CMND/CCCD : "
                      name="IDcard"
                      // value={this.state.age}
                      onChange={this.handleChangeInput}
                      type="number"
                      className={classes.textField}
                      value={this.state.IDcard}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="address"
                      label="Địa chỉ liên hệ: "
                      value={this.state.address}
                      name="address"
                      onChange={this.handleChangeInput}
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Đơn vị"
                      name="organizationUnit"
                      className={classes.textField}
                      value={this.state.organizationUnit}
                      onChange={this.handleChangeInput}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      // helperText="Please select your currency"
                      margin="normal"
                    >
                      {this.state.listOrganizationUnit.map(item => (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          style={item.padding !== 0 ? { paddingLeft: `${parseInt(item.padding, 10) * 1.5}px` } : {}}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="note"
                      label="Ghi chú: "
                      value={this.state.note}
                      onChange={this.handleChangeInput}
                      name="note"
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Thông tin nhân viên đăng nhập</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid container item justify="flex-start" md={6}>
                    <FormControl className={classes.textField1} style={{ padding: 0 }} error>
                      <TextField
                        id="username"
                        label="Tài khoản: "
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChangeInput}
                        type="text"
                        disabled={this.state.user !== null}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                      {this.state.errorUsername ? (
                        <FormHelperText id="component-error-text1" style={{ marginTop: -5 }}>
                          Tài khoản cần trên 5 kí tự
                        </FormHelperText>
                      ) : (
                        ''
                      )}
                    </FormControl>
                    {this.state.user === null ? (
                      <FormControl className={classes.textField1} style={{ padding: 0 }} error>
                        <TextField
                          id="repasss"
                          label="Nhập lại mật khẩu: "
                          value={this.state.rePassword}
                          name="rePassword"
                          onChange={this.handleChangeInput}
                          type="password"
                          disabled={this.state.user !== null}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                        />
                        {this.state.errorNotMatch ? (
                          <FormHelperText id="component-error-text1" style={{ marginTop: -5 }}>
                            Mật khẩu không trùng khớp
                          </FormHelperText>
                        ) : (
                          ''
                        )}
                      </FormControl>
                    ) : (
                      ''
                    )}
                    <TextField
                      id="standard-multiline-static"
                      label="Lý do không tham gia hoạt động"
                      multiline
                      rows="4"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container item justify="flex-end" md={6}>
                    {this.state.user === null ? (
                      <FormControl className={classes.textField1} style={{ padding: 0 }} error>
                        <TextField
                          id="pass"
                          label="Mật khẩu : "
                          value={this.state.password}
                          name="password"
                          onChange={this.handleChangeInput}
                          type="password"
                          className={classes.textField}
                          disabled={this.state.user !== null}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                        />

                        {this.state.errorPassword ? (
                          <FormHelperText id="component-error-text1" style={{ marginTop: -5 }}>
                            Mật khẩu cần từ trên 7 kí tự
                          </FormHelperText>
                        ) : (
                          ''
                        )}
                      </FormControl>
                    ) : (
                      ''
                    )}
                    <TextField
                      id="date"
                      label="Ngày kết thúc"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {/* <div style={{ width: '100%' }}>
                      <FormControlLabel control={<Checkbox color="primary" value="checkedA" />} label="Không hoạt động :" labelPlacement="start" />
                    </div> */}
                  </Grid>
                  <Grid>
                    <FormGroup row className={classes.tetxCheckBox}>
                      {/* <Typography>Bắt buộc thay đổi mật khẩu khi lần đầu đăng nhập</Typography> */}
                      <FormControlLabel control={<Checkbox />} label="Bắt buộc thay đổi mật khẩu khi lần đầu đăng nhập" labelPlacement="end" />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.active} />}
                        label="Active"
                        labelPlacement="end"
                        value={this.state.active}
                        name="active"
                        onChange={this.handleChangeCheckbox}
                      />
                      <FormControlLabel control={<Checkbox />} label="Deleted" labelPlacement="end" />
                      <FormControlLabel control={<Checkbox />} label="User cổng thông tin nhân sự" labelPlacement="end" />
                    </FormGroup>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Phân quyền truy cập cho nhân viên</Typography>
                <Typography className={classes.secondaryHeading}>Tích vào các tính năng mà bạn muốn nhân viên truy cập</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item md={12}>
                  <TextField
                    className={classes.textField}
                    id="standard-select-currency"
                    select
                    label="Nhóm phân quyền"
                    value={this.state.currency}
                    onChange={this.handleChange('currency')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    // helperText="Please select your currency"
                    margin="normal"
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div style={{ width: '100%' }}>
                    <AppBar position="static">
                      <Tabs value={value} onChange={this.handleChangeValue}>
                        <Tab className={classes.btnAppBar} label="Phân quyền chức năng" />
                        <Tab className={classes.btnAppBar} label="Phân quyền phòng ban" />
                        <Tab className={classes.btnAppBar} label="Phân quyền báo cáo" />
                        <Tab className={classes.btnAppBar} label="Phân quyền báo cáo và phê duyệt" />
                      </Tabs>
                    </AppBar>
                    {value === 0 && (
                      <TabContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Phân quyền chức năng</TableCell>
                              <TableCell>Xem</TableCell>
                              <TableCell>Thêm</TableCell>
                              <TableCell>Sửa</TableCell>
                              <TableCell>Xóa</TableCell>
                              <TableCell>Xuất file</TableCell>
                              <TableCell>Import file</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {phanQuyenChucNang.map(row => (
                              <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xem} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.them} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.sua} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xoa} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xuat} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.inport} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabContainer>
                    )}
                    {value === 2 && (
                      <TabContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Báo cáo</TableCell>
                              <TableCell>Xem</TableCell>
                              <TableCell>Xuất báo cáo</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {phanQuyenBaoCao.map(row => (
                              <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xem} />
                                </TableCell>
                                <TableCell>
                                  <Checkbox checked={row.xuat} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabContainer>
                    )}
                    {value === 1 && <TabContainer>Phân quyền phòng ban</TabContainer>}
                    {value === 3 && (
                      <TabContainer>
                        <TabContainer>{showDataTable(BaoCaoPheDuyet)}</TabContainer>
                      </TabContainer>
                    )}
                  </div>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {this.state.user === null ? (
              <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={this.onSubmit}>
                Thêm mới
              </Button>
            ) : (
              <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={this.onEditBtn}>
                Sửa
              </Button>
            )}
            <Button variant="contained" onClick={this.goBack} style={{ marginTop: 20, marginLeft: 20 }}>
              Hủy
            </Button>
          </Grid>
          <Grid style={{ height: 200 }} item md={4} container justify="center">
            <Avatar style={{ width: 300, height: 300 }} src={avatarA} className={classes.avatar} srcSet={this.state.avatarURL} />
            <input
              className={classes.textFieldAva}
              onChange={this.onSelectImg}
              accept="image/*"
              name="avatar"
              type="file"
              style={{ cursor: 'pointer', opacity: 0, width: '300px', position: 'absolute', zIndex: '999', margin: '0px' }}
            />
            <span className={classes.spanAva}>
              <CameraAlt className={classes.iconCam} />
            </span>
            <Grid container justify="center">
              <span>Ảnh đại diện</span>
            </Grid>
            <Grid container justify="center">
              <span>(Nhấp vào ảnh để thay đổi ảnh đại diện)</span>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  handleChangeValue = (event, value) => {
    this.setState({ value });
  };

  goBack = () => {
    this.state.user = null;
    localStorage.removeItem('user');
    this.props.history.goBack();
  };

  onSubmit = () => {
    const rex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {
      name,
      code,
      email,
      password,
      organizationUnit,
      rePassword,
      username,
      timeToJoin,
      IDcard,
      gender,
      address,
      dob,
      positions,
      note,
      mobileNumber,
      active,
      avatar,
    } = this.state;
    if (name.length <= 0 || code.length <= 0 || username.length < 6 || password.length < 8) {
      if (name.length <= 0) {
        this.setState({ errorName: true });
      }
      if (code.length <= 0) {
        this.setState({ errorCode: true });
      }
      if (username.length < 6) {
        this.setState({ errorUsername: true });
      }
      if (password.length < 8) {
        this.setState({ errorPassword: true });
      }
    } else if (!rex.test(email.trim()) || email === '') {
      this.setState({ errorEmail: true });
    } else if (!(password === rePassword)) {
      this.setState({ errorNotMatch: true });
    } else {
      let beginWork;
      let dobDate;
      if (timeToJoin === '') {
        beginWork = new Date();
      } else {
        beginWork = new Date(timeToJoin);
      }
      if (dob === '') {
        dobDate = new Date();
      } else {
        dobDate = new Date(dob);
      }
      // const dobDate = new Date(dob).getTime();
      const genderRaw = gender === 0 ? 'male' : 'female';
      const status = active ? 1 : 0;
      const body = {
        organizationUnit,
        code,
        name,
        email,
        avatar,
        status,
        dob: dobDate,
        beginWork,
        gender: genderRaw,
        IDcard,
        mobileNumber,
        address,
        note,
        positions,
        username,
        password,
      };
      this.props.onAddNewUser(body);
    }
  };

  onEditBtn = () => {
    const rex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {
      name,
      code,
      email,
      organizationUnit,
      timeToJoin,
      // id,
      IDcard,
      gender,
      address,
      dob,
      user,
      positions,
      note,
      mobileNumber,
      active,
      avatar,
      avatarURL,
    } = this.state;
    if (name.length <= 0 || code.length <= 0) {
      if (name.length <= 0) {
        this.setState({ errorName: true });
      }
      if (code.length <= 0) {
        this.setState({ errorCode: true });
      }
    } else if (!rex.test(email.trim())) {
      this.setState({ errorEmail: true });
    } else {
      let beginWork;
      let dobDate;
      if (timeToJoin === '') {
        beginWork = new Date();
      } else {
        beginWork = new Date(timeToJoin);
      }
      if (dob === '') {
        dobDate = new Date();
      } else {
        dobDate = new Date(dob);
      }
      // const dobDate = new Date(dob).getTime();
      const genderRaw = gender === 0 ? 'male' : 'female';
      const status = active ? 1 : 0;
      const body = {
        organizationUnit,
        code,
        name,
        email,
        // avatar: 'https://i.imgur.com/mnpT3wz.jpg',
        status,
        avatar,
        avatarURL,
        dob: dobDate,
        beginWork,
        gender: genderRaw,
        IDcard,
        id: this.props.match.params.id,
        user: user.user,
        mobileNumber,
        address,
        note,
        positions,
      };
      this.props.onEdit(body);
    }
  };

  handleChangeSelect = selectedOption => {
    this.setState({ organizationUnit: selectedOption });
  };
}

AddUserPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onAddNewUser: PropTypes.func.isRequired,
  onResetNoti: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addUserPage: makeSelectAddUserPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAddNewUser: body => {
      dispatch(addUserAction(body));
    },
    onGetOrganizationUnit: () => {
      dispatch(getDepartmentAct());
    },
    onResetNoti: () => {
      dispatch(resetNoti());
    },
    onEdit: body => {
      dispatch(editUserAct(body));
    },
    onGetUser: id => {
      dispatch(getUserAct(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addUserPage', reducer });
const withSaga = injectSaga({ key: 'addUserPage', saga });

export default compose(
  withSnackbar,
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(AddUserPage);
