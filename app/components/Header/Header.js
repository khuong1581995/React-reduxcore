import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// material-ui components
import { withStyles, AppBar, Toolbar, IconButton, Button, Hidden } from '@material-ui/core';

// material-ui icons
import { Menu, MoreVert, ViewList } from '@material-ui/icons';

// core components

import CustomIconButton from 'components/CustomButtons/IconButton';

import headerStyle from 'assets/jss/material-dashboard-pro-react/components/headerStyle';
import HeaderLinks from './HeaderLinks';

function Header({ ...props }) {
  function makeBrand() {
    let name;
    props.routes.map(prop => {
      if (prop.collapse) {
        prop.views.map(prop => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      }
      if (prop.path === props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }
  const { classes, color, rtlActive, ...other } = props;
  const appBarClasses = cx({
    [` ${classes[color]}`]: color,
  });
  const sidebarMinimize = `${classes.sidebarMinimize} ${cx({
    [classes.sidebarMinimizeRTL]: rtlActive,
  })}`;
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <CustomIconButton color="white" onClick={props.sidebarMinimize}>
                <ViewList className={classes.sidebarMiniIcon} />
              </CustomIconButton>
            ) : (
              <CustomIconButton color="white" onClick={props.sidebarMinimize}>
                <MoreVert className={classes.sidebarMiniIcon} />
              </CustomIconButton>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title}>
            {makeBrand() || ''}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks rtlActive={rtlActive} {...other} />
        </Hidden>
        <Hidden mdUp>
          <IconButton className={classes.appResponsive} color="inherit" aria-label="open drawer" onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
};

export default withStyles(headerStyle)(Header);
