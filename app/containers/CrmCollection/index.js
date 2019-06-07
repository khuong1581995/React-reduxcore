/**
 *
 * CrmCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/ItemGrid';
// import Button from 'components/CustomButtons/Button';
// import TradingList from 'components/TradingList';
// import { Fade, Collapse, Fab, Input, IconButton, InputBase, Button as ButtonUI } from '@material-ui/core';
import RegularCard from 'components/Cards/RegularCard';
import { withStyles, AppBar, Tabs, Tab, Fab, Badge, Menu, MenuItem } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
// import messages from './messages';
import { Storage, Settings, BorderAll } from '@material-ui/icons';
import saga from './saga';
import reducer from './reducer';
import makeSelectCrmCollection from './selectors';
import Kanban from '../../components/Kanban';
import Calendar from '../../components/Calendar';
import Report from '../../components/Report/TradingReport';
import Automation from '../../components/Automation';

import styles from './styles';
import { getAllCollection } from './actions';

import ContractsPage from '../ContractPage/index';
import BusinessOpportunities from '../BusinessOpportunities';
import Customer from '../CustomersPage/index';
import Workflow from '../WorkFlowPage';
import SalesPolicy from '../SalesPolicy';
import AddCustomerPage from '../AddCustomerPage';
import CRMConfig from '../CrmConfigPage';
import SuppliersPage from '../SuppliersPage';
const routeFake = [
  {
    name: 'Cơ hội kinh doanh',
    code: 'business-opportunities',
    component: BusinessOpportunities,
    isDisplay: true,
  },
  {
    name: 'Trao đổi thỏa thuận',
    code: 'trading',
    component: BusinessOpportunities,
    isDisplay: true,
  },
  {
    name: 'Khách hàng',
    code: 'customers',
    component: Customer,
    isDisplay: true,
  },
  {
    name: 'Nhà cung cấp',
    code: 'suppliers',
    component: SuppliersPage,
    isDisplay: true,
  },
  {
    name: 'Báo giá',
    code: 'price-confirm',
    component: SuppliersPage,
    isDisplay: true,
  },
  {
    name: 'Hợp đồng',
    code: 'contracts',
    component: ContractsPage,
    isDisplay: true,
  },
  {
    name: 'Phê duyệt (workflow)',
    code: 'workfolow',
    component: Workflow,
    isDisplay: true,
  },

  {
    name: 'Báo cáo',
    code: 'report',
    component: Report,
    isDisplay: true,
  },
];
// routes cho các màn hình không hiển thị trên menu ngang (add, edit, menu left)
const hiddenRoutes = [
  {
    name: 'Thêm mới khách hàng',
    code: 'customers/add',
    component: AddCustomerPage,
    isDisplay: true,
  },
  {
    name: 'Chính sách bán hàng',
    code: 'sale-polices',
    component: SalesPolicy,
    isDisplay: true,
  },
  {
    name: 'Cấu hình CRM',
    code: 'config',
    component: CRMConfig,
    isDisplay: true,
  },
];
class CrmCollection extends React.Component {
  state = {
    // select: 2,
    tab: 'PL_VIEW_LIST',
    // check: true,
    // size: 'sm',
    // color: 'gradient',
    // defaultColor: 'simple',
    anchorEl: null,
    current: {
      name: '',
      code: '',
    },
    // value: '',
  };

  handleTab(tab) {
    this.setState({ tab });
  }

  //   handleChange = (event, value) => {
  //     // this.setState({ value });
  //   };

  componentDidMount() {
    this.props.getCollection();
    const code = window.location.pathname.split('/')[2];
    const collection = [...routeFake, ...hiddenRoutes];
    const current = collection.find(item => item.code === code);

    this.setState({ current });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentWillUpdate(props) {
    const { crmCollection } = props;
    const collection = crmCollection.allCRMCollection || [];
    if (window.location.pathname.split('/').length === 3 || collection.length !== 0) {
      const code = window.location.pathname.split('/')[2];
      this.state.current = collection.find(item => item.code === code);
    } else if (collection.length !== 0 && !this.state.current.code) {
      this.state.current = collection[0];
    }
  }

  handleOnClickSelectCRM = code => {
    const { crmCollection } = this.props;
    // const collection = crmCollection.allCRMCollection || [];
    // const collection = routeFake;
    const collection = [...crmCollection.allCRMCollection, ...routeFake];
    const current = collection.find(item => item.code === code);

    this.setState({ current });
    this.props.history.push(`/crm/${code}`);
  };

  render() {
    // const { tab, size, defaultColor, color, current, anchorEl } = this.state;

    const { tab, current, anchorEl } = this.state;
    const collection = this.props.crmCollection.allCRMCollection || [];
    // );
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>CRM</title>
        </Helmet>
        <AppBar position="relative" color="default">
          <Tabs
            style={{ width: '95%' }}
            value={current && current.code}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {routeFake.map(item => (
              <Tab
                key={item.code}
                className={classes.tabRoot}
                value={item.code}
                onClick={() => this.handleOnClickSelectCRM(item.code)}
                label={
                  <Badge color="primary" badgeContent={50}>
                    {item.name}
                  </Badge>
                }
              />
            ))}
            {collection.map(item => (
              <Tab
                className={classes.tabRoot}
                value={item.code}
                onClick={() => this.handleOnClickSelectCRM(item.code)}
                label={
                  <Badge color="primary" badgeContent={50}>
                    {item.name}
                  </Badge>
                }
              />
            ))}
          </Tabs>

          <Fab onClick={this.handleClick} style={{ position: 'absolute', right: '5px', top: 5 }} color="primary" size="small">
            <Storage />
          </Fab>
        </AppBar>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>
            <BorderAll />
            <Link to="/crm/add">Cài đặt hiển thị</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Settings />
            <Link to="/crm/config">Cấu hình CRM</Link>
          </MenuItem>
        </Menu>
        <RegularCard
          content={
            <GridContainer>
              {/* <GridItem md={12} sm={12}>
                {current && current.plugins && current.plugins.map(item => <Bt tab={item.code}>{item.name}</Bt>)}
              </GridItem> */}
              <GridItem md={12} sm={12}>
                {tab === 'PL_VIEW_KANBAN' ? <Kanban /> : null}
                {/* {tab === 'PL_VIEW_LIST' ? <TradingList /> : null} */}

                {tab === 'PL_WIDGET_CALENDAR' ? <Calendar /> : null}
                {tab === 'PL_VIEW_REPORT' ? <Report /> : null}
                {tab === 'PL_SERVICES_AUTOMATION' ? <Automation /> : null}
                {/* <Kanban /> */}
                <Switch>
                  {routeFake.map(item => (
                    <Route key={item.code} exact path={`/crm/${item.code}`} component={item.component} />
                  ))}
                  {hiddenRoutes.map(item => (
                    <Route key={item.code} exact path={`/crm/${item.code}`} component={item.component} />
                  ))}
                  {/* <Route exact path="/crm/customers/add" component={CustomersAddPage} /> */}
                </Switch>
              </GridItem>
            </GridContainer>
          }
        />
      </div>
    );
  }
}

CrmCollection.propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  crmCollection: makeSelectCrmCollection(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    getCollection: () => {
      dispatch(getAllCollection());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'crmCollection', reducer });
const withSaga = injectSaga({ key: 'crmCollection', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(CrmCollection);
