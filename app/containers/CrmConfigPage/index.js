/**
 *
 * CrmConfigPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper, Button, Divider } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Breadcrumbs } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCrmConfigPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import TabContainer from '../../components/TabContainer';
import BusinessStatus from '../../components/BusinessStatus/index';
import Status from '../../components/Status';
import { fetchAllStatusAction, addStatusAction, resetNotis, deleteStatusAction, updateStatusAction, updateStatusIndexAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class CrmConfigPage extends React.Component {
  state = {
    activeIndex: 0,
    listStatus: undefined,
    sourcce: [
      {
        name: 'Giới thiệu',
        index: 1,
      },
      {
        name: 'Gọi điện',
        index: 2,
      },
      {
        name: 'Email',
        index: 3,
      },
      {
        name: 'Quảng cáo',
        index: 4,
      },
      {
        name: 'Website',
        index: 5,
      },
      {
        name: 'Khách hàng hiện tại',
        index: 6,
      },
      {
        name: 'Theo khuyến nghị',
        index: 7,
      },
      {
        name: 'Triển lãm',
        index: 8,
      },
      {
        name: 'CRM form (Nhập dữ liệu từ website đổ về)',
        index: 9,
      },
      {
        name: 'Gọi lại',
        index: 10,
      },
      {
        name: 'Tăng doanh số',
        index: 11,
      },
      {
        name: 'Kho hàng trực tuyến',
        index: 12,
      },
      {
        name: 'Khác',
        index: 13,
      },
    ],
  };

  componentDidMount() {
    this.props.onGetCRMStatus();
  }

  componentWillReceiveProps(props) {
    const { crmConfigPage } = props;
    this.state.listStatus = crmConfigPage.status;

    if (crmConfigPage.callAPIStatus === 1) {
      this.props.enqueueSnackbar(crmConfigPage.notiMessage, {
        persist: false,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'success',
      });
    }
    if (crmConfigPage.callAPIStatus === 0) {
      this.props.enqueueSnackbar(crmConfigPage.notiMessage, {
        persist: false,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'error',
      });
    }
    this.props.onResetNotis();
  }

  handleChange = (_, activeIndex) => this.setState({ activeIndex });

  callBack = (cmd, data, param) => {
    switch (cmd) {
      case 'add-status':
        this.props.onAddCRMStatus(data, param._id);
        break;
      case 'delete-status':
        this.props.onDeleteCRMStatus(data, param._id);
        break;
      case 'update-status':
        this.props.onUpdateCRMStatus(data, param._id);
        break;
      case 'update-status-index':
        this.props.onUpdateCRMStatusIndex(data, param._id);
        break;
      default:
        break;
    }
  };

  render() {
    // console.log(this.state.listStatus);
    const { activeIndex } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Cấu hình CRM</title>
          <meta name="description" content="Cấu hình CRM" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/setting/user">
              CRM
            </Link>
            <Typography color="textPrimary">Cấu hình CRM</Typography>
          </Breadcrumbs>
        </Paper>

        <div
          className="my-3"
          style={{
            display: 'flex',
          }}
        >
          <Paper className="py-3" style={{ height: '100%' }}>
            <VerticalTabs value={activeIndex} onChange={this.handleChange}>
              {/* <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Địa điểm" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Tiền tệ" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Thuế" /> */}
              {/* <Divider className="my-3" /> */}
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái cơ hội kinh doanh" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái báo giá" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái trao đổi thỏa thuận" />
              {/* <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Loại trao đổi thóa thuận" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái báo giá" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái trao đổi thỏa thuận" />

              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái cơ hội kinh doanh" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái báo giá" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái trao đổi thỏa thuận" /> */}

              <Divider className="my-3" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Nguồn" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Loại hợp đồng" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Loại doanh nghiệp" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Nhân viên" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Ngành nghề" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Loại trao đổi / thảo thuận" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái hóa đơn" />

              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Giao dịch mới" />

              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái hợp đồng" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Trạng thái gọi điện" />
              <VerticalTab style={{ textAlign: 'left', textTransform: 'none' }} label="Loại sự kiện" />
              <Button color="primary" size="small" variant="outlined">
                <Add /> Thêm mới
              </Button>
            </VerticalTabs>
          </Paper>

          {activeIndex === 0 && (
            <TabContainer>{this.state.listStatus ? <BusinessStatus callBack={this.callBack} data={this.state.listStatus[1]} /> : null}</TabContainer>
          )}
          {activeIndex === 1 && (
            <TabContainer>{this.state.listStatus ? <BusinessStatus callBack={this.callBack} data={this.state.listStatus[0]} /> : null}</TabContainer>
          )}
          {activeIndex === 2 && (
            <TabContainer>{this.state.listStatus ? <BusinessStatus callBack={this.callBack} data={this.state.listStatus[2]} /> : null}</TabContainer>
          )}
          {activeIndex === 3 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Loại  doanh nghiệp" />
            </TabContainer>
          )}
          {activeIndex === 4 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Nhân viên" />
            </TabContainer>
          )}
          {activeIndex === 5 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Ngành nghề" />
            </TabContainer>
          )}
          {activeIndex === 6 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Loại trao đổi /thảo thuận" />
            </TabContainer>
          )}
          {activeIndex === 7 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Trạng thái hóa đơn" />
            </TabContainer>
          )}
          {activeIndex === 8 && (
            <TabContainer>
              {/* <Status items={this.state.sourcce} title="Trạng thái Trạng thái trao đổi / thảo thuận" /> */}
              <BusinessStatus items={this.state.business} />
            </TabContainer>
          )}
          {activeIndex === 9 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Giao dịch mới" />
            </TabContainer>
          )}
          {activeIndex === 10 && (
            <TabContainer>
              {/* <Status items={this.state.sourcce} title="Trạng thái báo giá" /> */}
              <BusinessStatus items={this.state.business} />
            </TabContainer>
          )}
          {activeIndex === 11 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Trạng thái hợp đồng" />
            </TabContainer>
          )}
          {activeIndex === 12 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Trạng thái gọi điện" />
            </TabContainer>
          )}
          {activeIndex === 13 && (
            <TabContainer>
              <Status items={this.state.sourcce} title="Loại sự kiện" />
            </TabContainer>
          )}
        </div>
      </div>
    );
  }
}
const VerticalTabs = withStyles(() => ({
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
}))(Tabs);

const VerticalTab = withStyles(() => ({
  selected: {
    color: 'white',
    backgroundColor: `#2196F3`,
    borderRadius: '5px',
    boxShadow: '3px 5.5px 7px rgba(0, 0, 0, 0.15)',
  },
  root: {},
}))(Tab);

CrmConfigPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  crmConfigPage: makeSelectCrmConfigPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetCRMStatus: () => {
      dispatch(fetchAllStatusAction());
    },
    onAddCRMStatus: (data, id) => {
      dispatch(addStatusAction(data, id));
    },
    onDeleteCRMStatus: (statusId, id) => {
      dispatch(deleteStatusAction(statusId, id));
    },
    onUpdateCRMStatus: (data, id) => {
      dispatch(updateStatusAction(data, id));
    },
    onUpdateCRMStatusIndex: (data, id) => {
      dispatch(updateStatusIndexAction(data, id));
    },
    onResetNotis: () => {
      dispatch(resetNotis());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'crmConfigPage', reducer });
const withSaga = injectSaga({ key: 'crmConfigPage', saga });

export default compose(
  withSnackbar,
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(CrmConfigPage);
