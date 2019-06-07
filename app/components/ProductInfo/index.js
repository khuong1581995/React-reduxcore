/**
 *
 * ProductInfo
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Grid,
  TextField,
  withStyles,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Input,
} from '@material-ui/core';
import { Creatable } from 'react-select';
import { withSnackbar } from 'notistack';
import { compose } from 'redux';
import { CameraAlt } from '@material-ui/icons';
import classNames from 'classnames';
import styles from './styles';
import AvatarImg from '../../images/product.png';
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
class ProductInfo extends React.Component {
  state = {
    productCate: [],
    avatar: null,
    // name: '',
    // avatarURL: null,
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onHoverIn = () => {
    this.setState({ showAva: true });
  };

  onHoverOut = () => {
    this.setState({ showAva: false });
  };

  // eslint-disable-next-line consistent-return
  onSelectImg = e => {
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    const file = e.target.files[0];
    // k có file
    if (!file) return false;

    let checkFile = true;
    let txt = '';
    // check image type
    if (types.every(type => file.type !== type)) {
      checkFile = false;
      txt = 'File bạn vừa chọn không đúng định dạng';
      // check image size > 3mb
    } else if (file.size / 1024 / 1024 > 3) {
      checkFile = false;
      txt = 'Dung lượng file tối đa là 3MB';
    }

    // confirm logo
    if (!checkFile) {
      this.props.enqueueSnackbar(txt, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    } else {
      const urlAvt = URL.createObjectURL(e.target.files[0]);
      this.setState({ avatar: urlAvt }); // avatarURL: file
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid md={2}>
            <div
              style={{
                // width: 200,
                // height: 200,
                display: 'flex',
                justifyContent: 'center',
                marginTop: 50,
                position: 'relative',
                borderRadius: 5,
                boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img src={this.state.avatar || AvatarImg} alt="Ảnh sản phẩm" className={classes.avatar} />
              <input
                accept="image/*"
                className={classes.inputAvt}
                type="file"
                onChange={this.onSelectImg}
                onMouseEnter={this.onHoverIn}
                onMouseLeave={this.onHoverOut}
                name="avatar"
              />
              <span className={classes.spanAva} style={this.state.showAva ? { opacity: 100 } : {}}>
                <CameraAlt className={classes.iconCam} />
              </span>
            </div>
          </Grid>
          <Grid md={5}>
            <TextField
              id="standard-name"
              label="Tên sản phẩm"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
            <FormControl className={classes.checkBoxGroup} style={{ marginTop: 37 }}>
              <FormControlLabel control={<Checkbox color="primary" />} label="Là dịch vụ(Không có số lượng)" />
              <FormControlLabel control={<Checkbox color="primary" />} label="Cho phép mô tả" />
              <FormControlLabel control={<Checkbox color="primary" />} label="Hiển thị giá vốn trong quá trình bán hàng" />
              <FormControlLabel control={<Checkbox color="primary" />} label="Mặt hàng có số seri" />
            </FormControl>
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="age-simple">Đơn vị tính</InputLabel>
              <Select
              // value={this.state.age}
              // onChange={this.handleChange}
              // inputProps={{
              //   name: 'age',
              //   id: 'age-simple',
              // }}
              >
                <MenuItem value={10}>Mặc định</MenuItem>
                <MenuItem value={20}>Dịch vụ</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classNames(classes.textField, classes.selectBox)}>
              <InputLabel htmlFor="age-simple" style={{ marginLeft: 7 }}>
                Danh mục sản phẩm
              </InputLabel>
              <Select
                multiple
                value={this.state.productCate}
                name="productCate"
                className={classes.textField}
                onChange={this.handleChangeInput}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                <MenuItem value="Dày dép">
                  <Checkbox color="primary" checked={this.state.productCate.indexOf('Dày dép') > -1} />
                  <ListItemText primary="Dày dép" />
                </MenuItem>
                <MenuItem value="Quần áo">
                  <Checkbox color="primary" checked={this.state.productCate.indexOf('Quần áo') > -1} />
                  <ListItemText primary="Quần áo" />
                </MenuItem>
                <MenuItem value="Cặp sách">
                  <Checkbox color="primary" checked={this.state.productCate.indexOf('Cặp sách') > -1} />
                  <ListItemText primary="Cặp sách" />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid md={5}>
            <TextField
              label="Mã sản phẩm"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              label="Mã vạch"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              label="Nhãn"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
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
            <TextField
              label="Kích thước"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              label="Nhà cung cấp"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              label="Mô tả"
              className={classes.textField}
              multiline
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProductInfo.propTypes = {
  classes: PropTypes.object,
  enqueueSnackbar: PropTypes.object,
};

// export default withStyles(styles)(ProductInfo);
export default compose(
  withStyles(styles),
  withSnackbar,
)(ProductInfo);
