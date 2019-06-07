/**
 *
 * AddNewProductPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles, Grid, Paper, Typography, Tab, Tabs, Button } from '@material-ui/core';
import { Breadcrumbs } from '@material-ui/lab';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import SwipeableViews from 'react-swipeable-views';
// import Accordion from 'components/Accordion/Accordion';
import { Link } from 'react-router-dom';
// import ImageUpload from 'components/CustomUpload/ImageUpload';
import saga from './saga';
import reducer from './reducer';
import makeSelectDetailProductPage from './selectors';
import styles from './styles';
import ProductInfo from '../../components/ProductInfo';
import SetOfAttribute from '../../components/SetOfAttribute';
import PricePolicy from '../../components/PricePolicy';
import CustomSellingPoint from '../../components/CustomSellingPoint';
import ExtendedInformation from '../../components/ExtendedInformation';
import { getTagsAct } from './actions';
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3, overflow: 'hidden' }}>
      {children}
    </Typography>
  );
}
/* eslint-disable react/prefer-stateless-function */
export class AddNewProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      value: 0,
      tagsList: [],
      suppliersList: [],
      propertiesSet: [],
      // name: '',
      // optionsInfo: {
      //   isServices: false,
      //   isDescribe: false,
      //   displayCaptital: false,
      //   isSeri: false,
      // },
      // code: '',
      // barcode: '',
    };
  }

  componentWillMount() {
    this.props.onGetTags();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentWillReceiveProps(props) {
    if (props !== this.props) {
      const { addNewProductPage } = props;
      if (addNewProductPage.tagsList && addNewProductPage.propertiesSet && addNewProductPage.suppliersList) {
        this.setState({
          tagsList: addNewProductPage.tagsList,
          suppliersList: addNewProductPage.suppliersList,
          propertiesSet: addNewProductPage.propertiesSet,
        });
      }
    }
  }

  render() {
    const { value } = this.state;
    const { classes, theme } = this.props;
    return (
      <div>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/stock">
              Kho
            </Link>
            <Typography color="textPrimary">Chi tiết sản phẩm</Typography>
          </Breadcrumbs>
        </Paper>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper className={classes.paper}>
              <Tabs
                value={value}
                variant="scrollable"
                scrollButtons="on"
                onChange={this.handleChange}
                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
              >
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Thông tin sản phẩm" />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Bộ thuộc tính" />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Chính sách giá" />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Tùy chỉnh điểm bán hàng" />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Thông tin mở rộng" />
              </Tabs>
              <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
                <TabContainer dir={theme.direction}>
                  <ProductInfo tagsList={this.state.tagsList} suppliersList={this.state.suppliersList} />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <SetOfAttribute propertiesSet={this.state.propertiesSet} />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <PricePolicy />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <CustomSellingPoint />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <ExtendedInformation />
                </TabContainer>
              </SwipeableViews>
            </Paper>
            <Button variant="contained" color="primary" className={classes.button}>
              Lưu
            </Button>
            <Button variant="contained" className={classes.button}>
              Hủy
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AddNewProductPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object,
};
TabContainer.propTypes = {
  children: PropTypes.object,
  dir: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  addNewProductPage: makeSelectDetailProductPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetTags: () => {
      dispatch(getTagsAct());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addNewProductPage', reducer });
const withSaga = injectSaga({ key: 'addNewProductPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles, { withTheme: true }),
)(AddNewProductPage);
