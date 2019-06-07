/**
 *
 * SystemConfigPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { CameraAlt } from '@material-ui/icons';
import { Breadcrumbs } from '@material-ui/lab';
import {
  Paper,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Checkbox,
  ListItemText,
  FilledInput,
  Button,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSystemConfigPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */
export class SystemConfigPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Cấu hình hệ thống</title>
          <meta name="description" content="Cấu hình hệ thống" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/setting">
              Thiết lập
            </Link>
            <Typography color="textPrimary">Cấu hình chung</Typography>
          </Breadcrumbs>
        </Paper>
        <Grid container>
          <Grid justify="center" md={6}>
            <Paper container justify="center" className={classes.paper} alignItems="center" direction="row">
              <FormControl className={classes.textField}>
                <TextField
                  label="Tên công ty"
                  onChange={this.handleChangeInput}
                  // className={classes.textField}
                  // value={this.state.companyName}
                  // name="companyName"
                  margin="normal"
                  variant="outlined"
                  defaultValue="LifeTek.vn"
                />
                <FormHelperText id="component-error-text1" style={{ margin: '10px' }}>
                  Tên công ty không được để trống
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.textField}>
                <TextField
                  label="Tên công ty hiển thị trên thanh tiêu đề"
                  onChange={this.handleChangeInput}
                  style={{ marginTop: '10px' }}
                  className={classes.textField}
                  // value={this.state.nameDisplay}
                  // name="nameDisplay"
                  variant="outlined"
                  defaultValue="LifeTek Cong Nghe"
                  margin="normal"
                />
                <FormHelperText id="component-error-text1">Tên công ty hiển thị trên thanh tiêu đề không được để trống</FormHelperText>
              </FormControl>
              <FormControl className={classes.textField}>
                <TextField
                  label="Tên Website"
                  onChange={this.handleChangeInput}
                  style={{ marginTop: '10px' }}
                  className={classes.textField}
                  // value={this.state.nameDisplay}
                  // name="nameDisplay"
                  variant="outlined"
                  defaultValue="LifeTek.vn"
                  margin="normal"
                />
                <FormHelperText id="component-error-text1">Website k được bỏ</FormHelperText>
              </FormControl>
              <FormControl className={classes.textField}>
                <TextField
                  label="Email Adm"
                  onChange={this.handleChangeInput}
                  style={{ marginTop: '10px' }}
                  className={classes.textField}
                  // value={this.state.nameDisplay}
                  // name="nameDisplay"
                  variant="outlined"
                  defaultValue="LifeTek@gmail.com"
                  margin="normal"
                />
                <FormHelperText id="component-error-text1"> Email sai định dạng</FormHelperText>
              </FormControl>
              <InputLabel className={classes.textField}>Định dạng ngày tháng năm</InputLabel>

              <Select
                className={classes.textField}
                // value={values.age}
                // onChange={handleChange}
                name="dateFormat"
                input={<OutlinedInput labelWidth={0} id="select-checkbox" />}
              >
                <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                <MenuItem value="YYYY/MM/DD">YYYY/MM/DD</MenuItem>
              </Select>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Định dạng thời gian</FormLabel>
                <RadioGroup aria-label="Gender" name="gender1" className={classes.group}>
                  <FormControlLabel value="female" control={<Radio />} label="12h" />
                  <FormControlLabel value="male" control={<Radio />} label="24h" />
                </RadioGroup>
              </FormControl>
              <InputLabel className={classes.textField} style={{ display: 'block' }}>
                Ngày đầu tiên trong tuần
              </InputLabel>
              <Select
                className={classes.textField}
                // value={values.age}
                // onChange={handleChange}
                name="startDay"
                input={<OutlinedInput labelWidth={0} id="select" />}
              >
                <MenuItem value="Chủ nhật">Chủ nhật</MenuItem>
                <MenuItem value="Thứ 2">Thứ 2</MenuItem>
              </Select>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <FormLabel style={{ fontSize: 12, margin: '0px 25 px' }}>Thời gian làm việc</FormLabel>
                <TextField
                  // id="outlined-uncontrolled"
                  label="bắt đầu"
                  defaultValue="06:30 AM"
                  margin="normal"
                  variant="outlined"
                  disabled
                />
                <span style={{ margin: '0px 10px' }}>đến</span>
                <TextField
                  // id="outlined-uncontrolled"
                  label="kết thúc"
                  defaultValue="05:30 PM"
                  margin="normal"
                  variant="outlined"
                  disabled
                />
              </Grid>

              <InputLabel className={classes.textField} style={{ display: 'block', fontSize: '12' }}>
                Ngày trong tuần
              </InputLabel>
              <Select
                multiple
                value={[]}
                name="daysInWeek"
                className={classes.textField}
                // onChange={this.handleChangeInput}
                // input={<Input id="select-multiple-checkbox" />}
                // renderValue={selected => selected.join(', ')}
                // MenuProps={MenuProps}
                input={<OutlinedInput labelWidth={0} id="select-multiple-checkbox" />}
              >
                <MenuItem value="thứ 2">
                  <Checkbox />
                  <ListItemText primary="Thứ 2" />
                </MenuItem>
                <MenuItem value="thứ 3">
                  <Checkbox />
                  <ListItemText primary="Thứ 3" />
                </MenuItem>
                <MenuItem value="thứ 4">
                  <Checkbox />
                  <ListItemText primary="Thứ 4" />
                </MenuItem>
                <MenuItem value="thứ 5">
                  <Checkbox />
                  <ListItemText primary="Thứ 5" />
                </MenuItem>
                <MenuItem value="thứ 6">
                  <Checkbox />
                  <ListItemText primary="Thứ 6" />
                </MenuItem>
                <MenuItem value="thứ 7">
                  <Checkbox />
                  <ListItemText primary="Thứ 7" />
                </MenuItem>
                <MenuItem value="Chủ nhật">
                  <Checkbox />
                  <ListItemText primary="Chủ nhật" />
                </MenuItem>
              </Select>

              <TextField
                id="outlined-uncontrolled"
                label="Ngày nghỉ lễ(cách nhau bằng dấu (,) )"
                defaultValue="12/4/2019"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <InputLabel className={classes.textField} style={{ display: 'block', fontSize: '12' }}>
                Ngôn ngữ
              </InputLabel>
              <Select
                name="language"
                className={classes.textField}
                // onChange={this.handleChangeInput}
                input={<FilledInput name="Language" />}
              >
                <MenuItem value="vn">Việt Nam</MenuItem>
                <MenuItem value="en">EngLish</MenuItem>
                <MenuItem value="us">USA</MenuItem>
              </Select>
              <Button variant="contained" color="primary" className={classes.button}>
                Lưu
              </Button>
              <Button variant="contained" color="secondary" className={classes.button}>
                Hủy
              </Button>
            </Paper>
          </Grid>

          <Grid style={{ height: 200 }} md={6} justify="center" container alignItems="center" wrap="wrap">
            <Avatar
              // size={{ with: 300, height: 300 }}
              alt="ảnh tâm trạng"
              src="http://thuthuat123.com/uploads/2018/01/27/Avatar-dep-nhat-43_112148.jpg"
              className={classes.avatar}
            />
            <input
              className={classes.textFieldAva}
              onChange={this.onSelectImg}
              accept="image/*"
              name="avatar"
              type="file"
              style={{ cursor: 'pointer', opacity: 1, width: '300px', position: 'absolute', zIndex: '-1', margin: '0px' }}
            />
            <span>
              <CameraAlt className={classes.spanAva} />
            </span>
            <Grid container justify="center">
              <span>LOGO</span>
            </Grid>
            <Grid container justify="center">
              <span>(Nhấp vào ảnh để thay đổi logo công ty)</span>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// SystemConfigPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  systemConfigPage: makeSelectSystemConfigPage(),
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

const withReducer = injectReducer({ key: 'systemConfigPage', reducer });
const withSaga = injectSaga({ key: 'systemConfigPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(SystemConfigPage);
