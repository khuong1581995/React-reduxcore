import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";

// material-ui components
import { withStyles } from '@material-ui/core';

// core components
import PagesHeader from 'components/Header/PagesHeader';
import Footer from 'components/Footer/Footer';

import pagesRoutes from 'routes/pages';

import pagesStyle from 'assets/jss/material-dashboard-pro-react/layouts/pagesStyle';

import bgImage from 'assets/img/register.jpeg';

// var ps;

class Pages extends React.Component {
  componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps = new PerfectScrollbar(this.refs.wrapper, {
    //     suppressScrollX: true,
    //     suppressScrollY: false
    //   });
    // }
  }

  componentWillUnmount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps.destroy();
    // }
  }

  handleAuthencation(user) {
    this.props.authentication(user);
  }

  render() {
    const { classes, ...rest } = this.props;
    /* eslint-disable */
    return (
      <div>
        <PagesHeader {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage}>
            <Switch>
              {pagesRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                }
                return <Route path={prop.path} render={() => <prop.component {...rest} authentication={user => this.handleAuthencation(user)} />} key={key} />;
              })}
              {/* <Route path="/" props={this.props}  render={() => <Redirect to="/login" />} /> */}
            </Switch>
            <Footer white />
            <div className={classes.fullPageBackground} style={{ backgroundImage: `url(${bgImage})` }} />
          </div>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(pagesStyle)(Pages);
