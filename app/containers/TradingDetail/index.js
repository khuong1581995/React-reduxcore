/**
 *
 * TradingDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Step, StepLabel, Stepper, Typography, AppBar, Toolbar, IconButton, Tabs, Tab, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Icon from '@material-ui/core/Icon';

import { observer } from 'mobx-react';

import { observable } from 'mobx';
import saga from './saga';
import reducer from './reducer';
import makeSelectTradingDetail from './selectors';
import './styles.scss';
// Import Component

import TDTGeneral from '../../components/TdtGeneral';
import TDTProduct from '../../components/TdtProduct';
/* eslint-disable react/prefer-stateless-function */
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  step: {
    // '& $completed': {
    //   color: 'lightgreen',
    // },
    // '& $active': {
    //   color: 'pink',
    // },
    // '& $disabled': {
    //   color: 'red',
    // },
  },
  icon: {
    color: 'red !important',
  },
});
@observer
export class TradingDetail extends React.Component {
  @observable
  isOpenMenuBtn1 = false;

  @observable
  isOpenMenuBtn2 = false;

  state = {
    value: 0,
  };

  steps = [
    { name: 'Công việc mới', status: false },
    { name: 'Đang xử lý', status: false },
    { name: 'Đã xử lý xong', status: false },
    { name: 'Phát sinh', status: false },
    { name: 'Hoàn thành', status: false },
  ];

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div id="trading-detail" className="transition-item">
        <AppBar position="static">
          <Toolbar>
            <Typography style={{ flex: 1 }} className="" variant="h6" color="inherit" noWrap>
              Dự án xe tăng nguyên tử <Icon>star</Icon>
            </Typography>

            <div style={{ flex: 1, alignItems: 'center' }}>
              <div className="float-right mt-1 ">
                <Button
                  className="text-light border-light"
                  aria-owns={this.isOpenMenuBtn1 ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={event => {
                    this.isOpenMenuBtn1 = event.currentTarget;
                  }}
                  variant="outlined"
                >
                  Biểu mẫu
                </Button>
                {/* <Menu
                  onClose={() => {
                    this.isOpenMenuBtn1 = null;
                  }}
                  id="simple-menu"
                  anchorEl={this.isOpenMenuBtn1}
                  open={this.isOpenMenuBtn1}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu> */}
              </div>
              <div className="float-right mt-1 mx-2">
                <Button
                  className="text-light border-light"
                  aria-owns={this.isOpenMenuBtn2 ? 'simple-menu2' : undefined}
                  aria-haspopup="true"
                  onClick={event => {
                    this.isOpenMenuBtn1 = event.currentTarget;
                  }}
                  variant="outlined"
                >
                  Deal
                </Button>
                {/* <Menu
                  onClose={() => {
                    this.isOpenMenuBtn2 = null;
                  }}
                  id="simple-menu2"
                  anchorEl={this.isOpenMenuBtn2}
                  open={this.isOpenMenuBtn2}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu> */}
              </div>
              <div className="float-right">
                <IconButton disabled>
                  <Icon>phone_in_talk</Icon>
                </IconButton>
                <IconButton disabled>
                  <Icon>mail</Icon>
                </IconButton>
                <IconButton disabled>
                  <Icon>textsms</Icon>
                </IconButton>
                <IconButton>
                  <Icon>settings</Icon>
                </IconButton>
              </div>
              <div className="clearfix" />
            </div>
          </Toolbar>
        </AppBar>
        <Stepper activeStep={1}>
          {this.steps.map(item => (
            <Step key={item.name}>
              <StepLabel
                style={{ color: 'red' }}
                StepIconProps={{
                  classes: {
                    active: classes.icon,
                  },
                }}
              >
                {item.name}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="Thông tin chung" />
          <Tab label="Sản phẩm/Dịch vụ" />
          <Tab label="Báo giá" />
          <Tab label="Hợp đồng" />
          <Tab label="Hóa đơn" />
          <Tab label="Yêu cầu mùa hàng (PO)" />
          <Tab label="Nguồn gốc" />
          <Tab label="Lịch sử" />
        </Tabs>
        <SwipeableViews
          style={{ backgroundColor: '#e5e6eb' }}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <TDTGeneral enableSelectField />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TDTProduct />
          </TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
        <div className="p-3 text-center">
          <Button
            variant="outlined"
            className="text-success border-success mx-2"
            onClick={() => {
              this.props.callback('close');
            }}
          >
            Lưu
          </Button>
          <Button
            variant="outlined"
            className="text-danger border-danger mx-2"
            onClick={() => {
              this.props.callback('close');
            }}
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }
}

TradingDetail.propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tradingDetail: makeSelectTradingDetail(),
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

const withReducer = injectReducer({ key: 'tradingDetail', reducer });
const withSaga = injectSaga({ key: 'tradingDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles, { withTheme: true }),
)(TradingDetail);
