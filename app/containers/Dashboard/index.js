import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

// material-ui components
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';

// core components
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import Snackbar from 'components/Snackbar';

import dashRoutes from 'routes/dashboard';

import appStyle from 'assets/jss/material-dashboard-pro-react/layouts/dashboardStyle';

import image from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/logo-white.svg';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { closeSnackbar } from './actions';
// import { getSuppliers, deleteSuppliers } from './actions';

// export const AppContext = React.createContext();

const switchRoutes = (
  <Switch>
    {dashRoutes.map(prop => {
      if (prop.redirect) return <Redirect from={prop.path} to={prop.pathTo} key={prop.path} />;
      if (prop.collapse) {
        const menu = [<Route exact path={prop.path} component={prop.component} key={prop.path} />];
        const submenu = prop.views.map(prop => <Route exact path={prop.path} component={prop.component} key={prop.path} />);
        menu.push(submenu);
        return menu;
      }
      return <Route exact path={prop.path} component={prop.component} key={prop.path} />;
    })}
  </Switch>
);

let ps;

class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
    miniActive: false,
    // open: false,
    // message: 'hh',
    // onClose: () => this.setState({ open: false }),
    // onChangeMessage: mes => this.setState({ message: mes, open: true }),
  };
  /* eslint-disable */
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== '/maps/full-screen-maps';
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }

  render() {
    const { classes, dashboardPage, ...rest } = this.props;
    const mainPanel = `${classes.mainPanel} ${cx({
      [classes.mainPanelSidebarMini]: this.state.miniActive,
      [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    })}`;
    return (
      // <AppContext.Provider value={this.state}>
      <div className={classes.wrapper}>
        <Snackbar open={dashboardPage.status} variant={dashboardPage.variant} message={dashboardPage.message} onClose={this.props.closeSnackbar} />
        <Sidebar
          routes={dashRoutes}
          logoText="Lifetek.vn"
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={() => this.sidebarMinimize()}
            miniActive={this.state.miniActive}
            routes={dashRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>
      </div>
      // </AppContext.Provider>
    );
  }
  /* eslint-enable */
}

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    closeSnackbar: () => dispatch(closeSnackbar()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(appStyle),
)(Dashboard);
