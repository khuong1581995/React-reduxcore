import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// material-ui components
import { Menu, withStyles, MenuItem, MenuList, ClickAwayListener, Paper, Grow, IconButton, Hidden, Typography } from '@material-ui/core';

// material-ui-icons
import { Person, Notifications, Dashboard, Search, AccountCircle, Input } from '@material-ui/icons';

// core components
import CustomInput from 'components/CustomInput/CustomInput';
import SearchButton from 'components/CustomButtons/IconButton';

import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';

class HeaderLinks extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenProfile = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseProfile = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push('/login');
  };

  render() {
    const { classes, rtlActive } = this.props;
    const { open, anchorEl } = this.state;
    const searchButton = `${classes.top} ${classes.searchButton} ${classNames({
      [classes.searchRTL]: rtlActive,
    })}`;
    const dropdownItem = `${classes.dropdownItem} ${classNames({
      [classes.dropdownItemRTL]: rtlActive,
    })}`;
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive,
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true,
    });
    return (
      <div className={wrapper}>
        <CustomInput
          rtlActive={rtlActive}
          formControlProps={{
            className: `${classes.top} ${classes.search}`,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
              className: classes.searchInput,
            },
          }}
        />
        <SearchButton color="white" aria-label="edit" customClass={searchButton}>
          <Search className={classes.searchIcon} />
        </SearchButton>
        <IconButton
          color="inherit"
          aria-label="Dashboard"
          className={classes.buttonLink}
          classes={{
            label: '',
          }}
        >
          <Dashboard className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </IconButton>
        <div className={managerClasses}>
          <IconButton
            color="inherit"
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : null}
            aria-haspopup="true"
            // onClick={this.handleClick}
            className={classes.buttonLink}
            classes={{
              label: '',
            }}
          >
            <Notifications className={classes.links} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp>
              <p className={classes.linkText}>Thông báo</p>
            </Hidden>
          </IconButton>
        </div>
        <div className={open ? classes.notificationsOpen : classes.notificationsClose}>
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
              <Paper className={classes.dropdown}>
                <MenuList role="menu">
                  <MenuItem onClick={this.handleClose} className={dropdownItem}>
                    Mike John responded to your email
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} className={dropdownItem}>
                    You have 5 new tasks
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} className={dropdownItem}>
                    You are now friend with Andrew
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} className={dropdownItem}>
                    Another Notification
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} className={dropdownItem}>
                    Another One
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </div>
        <div className={managerClasses}>
          <span type="button" onClick={this.handleOpenProfile}>
            <IconButton
              color="inherit"
              aria-label="Person"
              className={classes.buttonLink}
              classes={{
                label: '',
              }}
            >
              <Person className={classes.links} />
              <Hidden mdUp>
                <p className={classes.linkText}>Thông tin cá nhân</p>
              </Hidden>
            </IconButton>
          </span>
        </div>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleCloseProfile}>
          <MenuItem onClick={this.handleCloseProfile}>
            <Typography>
              <AccountCircle />
              Thông tin cá nhân
            </Typography>
          </MenuItem>
          <MenuItem onClick={this.handleLogOut}>
            <Typography>
              <Input />
              Đăng xuất
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object,
  rtlActive: PropTypes.bool,
  history: PropTypes.object,
};

export default withStyles(headerLinksStyle)(HeaderLinks);
