import React, { Component } from 'react';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
// material-ui components
import { withStyles, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, Collapse } from '@material-ui/core';

// core components
import HeaderLinks from 'components/Header/HeaderLinks';

import sidebarStyle from 'assets/jss/material-dashboard-pro-react/components/sidebarStyle';

import avatar from 'assets/img/faces/lang.jpg';
import SidebarWrapper from './SidebarWrapper';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openComponents: this.activeRoute('/components'),
      openForms: this.activeRoute('/forms'),
      openTables: this.activeRoute('/tables'),
      openMaps: this.activeRoute('/maps'),
      openPages: this.activeRoute('-page'),
      miniActive: true,
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1;
  }

  openCollapse(collapse) {
    const st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push('/');
  };

  render() {
    const { classes, color, logo, image, logoText, routes, bgColor, rtlActive } = this.props;
    const itemText = `${classes.itemText} ${cx({
      [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
      [classes.itemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.itemTextRTL]: rtlActive,
    })}`;
    const collapseItemText = `${classes.collapseItemText} ${cx({
      [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
      [classes.collapseItemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.collapseItemTextRTL]: rtlActive,
    })}`;
    const userWrapperClass = `${classes.user} ${cx({
      [classes.whiteAfter]: bgColor === 'white',
    })}`;
    const caret = `${classes.caret} ${cx({
      [classes.caretRTL]: rtlActive,
    })}`;
    const collapseItemMini = `${classes.collapseItemMini} ${cx({
      [classes.collapseItemMiniRTL]: rtlActive,
    })}`;
    const photo = `${classes.photo} ${cx({
      [classes.photoRTL]: rtlActive,
    })}`;

    // Thông tin người dùng

    const user = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={`${classes.item} ${classes.userItem}`}>
            <NavLink to="#" className={`${classes.itemLink} ${classes.userCollapseButton}`} onClick={() => this.openCollapse('openAvatar')}>
              <ListItemText
                primary="Admin"
                secondary={<b className={`${caret} ${classes.userCaret} ${this.state.openAvatar ? classes.caretActive : ''}`} />}
                disableTypography
                className={`${itemText} ${classes.userItemText}`}
              />
            </NavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={`${classes.list} ${classes.collapseList}`}>
                <ListItem className={classes.collapseItem}>
                  <NavLink to="#" className={`${classes.itemLink} ${classes.userCollapseLinks}`}>
                    <span className={collapseItemMini}>MP</span>
                    <ListItemText primary="Thông tin cá nhân" disableTypography className={collapseItemText} />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink to="#" className={`${classes.itemLink} ${classes.userCollapseLinks}`}>
                    <span className={collapseItemMini}>EP</span>
                    <ListItemText primary="Cập nhập thông tin" disableTypography className={collapseItemText} />
                  </NavLink>
                </ListItem>
                {/* <ListItem className={classes.collapseItem}>
                  <NavLink to="#" className={`${classes.itemLink} ${classes.userCollapseLinks}`}>
                    <span className={collapseItemMini}>S</span>
                    <ListItemText primary="Settings" disableTypography className={collapseItemText} />
                  </NavLink>
                </ListItem> */}
                <ListItem className={classes.collapseItem} onClick={this.logout}>
                  <NavLink to="/login" className={`${classes.itemLink} ${classes.userCollapseLinks}`}>
                    <span className={collapseItemMini}>S</span>
                    <ListItemText onClick={this.logout} primary="Đăng xuất" disableTypography className={collapseItemText} />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );

    // Link

    const links = (
      <List className={classes.list}>
        {routes.filter(item => !item.empty).map((prop, key) => {
          if (prop.redirect) {
            return null;
          }
          if (prop.collapse) {
            const navLinkClasses = `${classes.itemLink} ${cx({
              [` ${classes.collapseActive}`]: this.activeRoute(prop.path),
            })}`;
            const itemText = `${classes.itemText} ${cx({
              [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
              [classes.itemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.itemTextRTL]: rtlActive,
            })}`;
            const collapseItemText = `${classes.collapseItemText} ${cx({
              [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextRTL]: rtlActive,
            })}`;
            const itemIcon = `${classes.itemIcon} ${cx({
              [classes.itemIconRTL]: rtlActive,
            })}`;
            const caret = `${classes.caret} ${cx({
              [classes.caretRTL]: rtlActive,
            })}`;
            return (
              <ListItem key={key} className={classes.item}>
                {/* <NavLink to={prop.path} className={navLinkClasses} onClick={() => this.openCollapse(prop.state)}> */}
                <div className={navLinkClasses} onClick={() => this.openCollapse(prop.state)} style={{ cursor: 'pointer' }}>
                  <ListItemIcon className={itemIcon}>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={prop.name.toUpperCase()}
                    secondary={<b className={`${caret} ${this.state[prop.state] ? classes.caretActive : ''}`} />}
                    disableTypography
                    className={itemText}
                  />
                </div>
                {/* </NavLink> */}
                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={`${classes.list} ${classes.collapseList}`}>
                    {prop.views.map((prop, key) => {
                      if (prop.redirect || prop.hide) {
                        return null;
                      }
                      const navLinkClasses = `${classes.collapseItemLink} ${cx({
                        [` ${classes[color]}`]: this.activeRoute(prop.path),
                      })}`;
                      const collapseItemMini = `${classes.collapseItemMini} ${cx({
                        [classes.collapseItemMiniRTL]: rtlActive,
                      })}`;
                      return (
                        <ListItem key={key} className={classes.collapseItem}>
                          <NavLink to={prop.path} className={navLinkClasses}>
                            <span className={collapseItemMini}>{prop.mini}</span>
                            <ListItemText primary={prop.name} disableTypography className={collapseItemText} />
                          </NavLink>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          }
          const navLinkClasses = `${classes.itemLink} ${cx({
            [` ${classes[color]}`]: this.activeRoute(prop.path),
          })}`;
          const itemText = `${classes.itemText} ${cx({
            [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
            [classes.itemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
            [classes.itemTextRTL]: rtlActive,
          })}`;
          const itemIcon = `${classes.itemIcon} ${cx({
            [classes.itemIconRTL]: rtlActive,
          })}`;
          return (
            <ListItem key={key} className={classes.item}>
              <NavLink to={prop.path} className={navLinkClasses}>
                <ListItemIcon className={itemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText primary={prop.name.toUpperCase()} disableTypography className={itemText} />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );

    // Endlink

    const logoNormal = `${classes.logoNormal} ${cx({
      [classes.logoNormalSidebarMini]: this.props.miniActive && this.state.miniActive,
      [classes.logoNormalSidebarMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.logoNormalRTL]: rtlActive,
    })}`;
    const logoMini = `${classes.logoMini} ${cx({
      [classes.logoMiniRTL]: rtlActive,
    })}`;
    const logoClasses = `${classes.logo} ${cx({
      [classes.whiteAfter]: bgColor === 'white',
    })}`;
    const brand = (
      <div className={logoClasses}>
        <a href="http://www.lifetek.vn" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="http://www.lifetek.vn" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
    const drawerPaper = `${classes.drawerPaper} ${cx({
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      [classes.drawerPaperRTL]: rtlActive,
    })}`;
    const sidebarWrapper = `${classes.sidebarWrapper} ${cx({
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    })}`;

    // RETURN
    return (
      <div ref="mainPanel">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper className={sidebarWrapper} user={user} headerLinks={<HeaderLinks rtlActive={rtlActive} />} links={links} />
            {image !== undefined ? <div className={classes.background} style={{ backgroundImage: `url(${image})` }} /> : null}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={rtlActive ? 'right' : 'left'}
            variant="permanent"
            open
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
            }}
          >
            {brand}
            <SidebarWrapper className={sidebarWrapper} user={user} links={links} />

            {image !== undefined ? <div className={classes.background} style={{ backgroundImage: `url(${image})` }} /> : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: 'blue',
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf(['white', 'red', 'orange', 'green', 'blue', 'purple', 'rose']),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
};

export default withStyles(sidebarStyle)(Sidebar);
