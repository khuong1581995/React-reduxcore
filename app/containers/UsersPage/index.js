/**
 *
 * UsersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import {
  Button,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import GridUI from '@material-ui/core/Grid';
import TableUI from '@material-ui/core/Table';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { NavLink, Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LoadingIndicator from '../../components/LoadingIndicator';
import makeSelectUsersPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchAllUserAction, fetchConfigAction, fetchUpdateConfigAction, fetchDeleteUsersAction, resetNoti, fetchListDepartment } from './actions';
import styles from './styles';
import HOCTable from '../HocTable';
/* eslint-disable react/prefer-stateless-function */

export class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      data: [],
      arrAvatar: [],
      onDelete: false,
      arrDelete: [],
    };
  }

  componentWillMount() {
    this.props.onGetAllUser('');
    this.props.onGetListDepartment();
  }

  componentWillReceiveProps(props) {
    if (props !== this.props) {
      const { usersPage } = props;
      if (usersPage.arrUser && usersPage.success) {
        this.state.data = usersPage.arrUser || [];
        const xAvar = [];
        usersPage.arrUser.forEach(e => {
          xAvar.push({
            value: e.avatar,
            code: <Avatar style={{ margin: '0 auto' }} src={e.avatar} />,
          });
        });
        this.state.arrAvatar = xAvar;
        this.props.onResetNoti();
      }
    }
  }

  componentDidUpdate() {
    const { usersPage } = this.props;
    if (usersPage.successDelete) {
      this.props.enqueueSnackbar('Thao tác thành công!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      this.onDeleteSuccess();
      this.state.onDelete = false;
      this.props.onResetNoti();
    }
    if (usersPage.error) {
      this.props.enqueueSnackbar('Thao tác thất bại!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      this.props.onResetNoti();
    }
  }

  render() {
    const { classes, usersPage } = this.props;
    const level = 0;
    const arrDepartment = usersPage.arrDepartment || [];
    // if (this.state.changeOpen === true) {
    //   this.state.changeOpen = false;
    // console.log(rowsPerPage * page, rowsPerPage * page + rowsPerPage);
    this.state.content = arrDepartment.map(depart => {
      if (depart.child && depart.child.length > 0) {
        return (
          <React.Fragment key={depart._id}>
            <TableRow onClick={() => this.selectDepartment(depart)} className={classes.tbRow}>
              <TableCell onClick={() => this.clickOpen(depart)}>
                {depart.open ? <ExpandLess /> : <ExpandMore />}
                &nbsp;
                {depart.name}
              </TableCell>
            </TableRow>
            {depart.open ? this.displayTableContent(depart.child, level + 20) : null}
          </React.Fragment>
        );
      }
      return (
        // <React.Fragment>
        <TableRow key={depart._id} onClick={() => this.selectDepartment(depart)} className={classes.tbRow}>
          <TableCell>{depart.name}</TableCell>
        </TableRow>
        // </React.Fragment>
      );
    });
    this.state.content.unshift(
      <TableRow onClick={() => this.selectDepartment('')} className={classes.tbRow}>
        <TableCell>Tất cả nhân viên</TableCell>
      </TableRow>,
    );
    return usersPage.arrUser ? (
      <div>
        <Helmet>
          <title>Nhân sự phòng ban</title>
          <meta name="description" content="Description of AddUserPage" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Typography color="textPrimary">Danh sách nhân sự</Typography>
          </Breadcrumbs>
        </Paper>
        <GridUI container>
          <GridUI item md={11}>
            <Button component={NavLink} to="/setting/roleGroup" style={{ marginBottom: 10, marginRight: 10 }} variant="contained" color="primary">
              Phân quyền nhóm
            </Button>
            <Button
              component={NavLink}
              to="/setting/user/department"
              style={{ marginBottom: 10, marginRight: 10 }}
              variant="contained"
              color="primary"
            >
              Danh sách đơn vị
            </Button>
            {/* <Button component={NavLink} to="/setting/user/add" style={{ marginBottom: 10, marginRight: 10 }} variant="contained" color="primary">
              Thêm mới nhân sự
            </Button> */}
          </GridUI>
        </GridUI>

        <Paper className={classes.tableContainer} id="table-full-width" style={{ padding: 10 }}>
          <GridUI container item md={12} spacing={32}>
            <GridUI item md={3}>
              <TableUI className={classes.table} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Tên phòng ban</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.state.content ? this.state.content : ''}</TableBody>
              </TableUI>
            </GridUI>
            <GridUI item md={9}>
              <HOCTable
                // ref={this.child}
                onRef={ref => (this.child = ref)}
                handleEditClick={this.handleEditClick}
                handleAddClick={this.handleAddClick}
                handleDeleteClick={this.handleDeleteClick}
                customColumns={[
                  {
                    columnName: 'avatar',
                    component: this.state.arrAvatar,
                  },
                  {
                    columnName: 'status',
                    component: [
                      { value: 1, code: <div style={{ color: '#40FF00' }}>Hoạt động</div> },
                      { value: 0, code: <div style={{ color: 'red' }}>Không hoạt động</div> },
                    ],
                  },
                  {
                    columnName: 'gender',
                    component: [{ value: 'male', code: <div>Nam</div> }, { value: 'female', code: <div>Nữ</div> }],
                  },
                ]}
                path="/setting/user"
                data={this.state.data}
                enableEdit
              />
            </GridUI>
          </GridUI>
        </Paper>
        <Dialog
          open={this.state.onDelete}
          onClose={this.handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Bạn có chắc chắn muốn xóa?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleDelete()}>
              Đồng ý
            </Button>
            <Button onClick={this.handleCloseDelete} color="primary" autoFocus>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
        {usersPage.loading ? <LoadingIndicator /> : ''}
      </div>
    ) : (
      <LoadingIndicator />
    );
  }

  onDeleteSuccess = () => {
    this.child.callBack('delete-success');
  };

  handleAddClick = () => {
    const { history } = this.props;
    history.push('/setting/user/add');
  };

  handleDelete = () => {
    this.props.onDeleteUsers(this.state.arrDelete);
  };

  handleCloseDelete = () => {
    this.setState({ onDelete: false });
  };

  handleEditClick = item => {
    const { history } = this.props;
    history.push(`/setting/user/add/${item._id}`);
  };

  handleDeleteClick = item => {
    const { data } = this.state;
    const arrDelete = [];
    item.forEach(n => {
      arrDelete.push(data[n]._id);
    });
    this.setState({ onDelete: true, arrDelete });
  };

  clickOpen = depart => {
    /* eslint-disable */
    if (!depart.open) {
      depart.open = true;
    } else {
      depart.open = false;
    }
    this.setState({ changeOpen: true });
    /* eslint-enable */
  };

  selectDepartment = depart => {
    if (depart !== '') {
      this.props.onGetAllUser(depart._id);
    } else {
      this.props.onGetAllUser('');
    }
  };

  displayTableContent = (dataList, level) => {
    // eslint-disable-line
    const { classes } = this.props;
    this.state.changeOpen = false;
    return dataList.map(department => {
      if (department.child && department.child.length > 0) {
        return (
          <React.Fragment key={department._id}>
            <TableRow onClick={() => this.selectDepartment(department)} className={classes.tbRow}>
              <TableCell onClick={() => this.clickOpen(department)}>
                <span style={{ padding: `${level}px` }} />
                {department.open ? <ExpandLess /> : <ExpandMore />}
                &nbsp;
                {department.name}
              </TableCell>
            </TableRow>

            {department.open ? this.displayTableContent(department.child, level + 20) : null}
          </React.Fragment>
        );
      }
      return (
        // <React.Fragment>
        <TableRow key={department._id} onClick={() => this.selectDepartment(department)} className={classes.tbRow}>
          <TableCell>
            <span style={{ padding: `${level}px` }} />
            {department.name}
          </TableCell>
        </TableRow>
        // </React.Fragment>
      );
    });
  };
}

UsersPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onGetAllUser: PropTypes.func.isRequired,
  classes: PropTypes.object,
  onDeleteUsers: PropTypes.func.isRequired,
  usersPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  usersPage: makeSelectUsersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetAllUser: id => {
      dispatch(fetchAllUserAction(id));
    },
    onGetConfig: () => {
      dispatch(fetchConfigAction());
    },
    onUpdateConfig: body => {
      dispatch(fetchUpdateConfigAction(body));
    },
    onDeleteUsers: body => {
      dispatch(fetchDeleteUsersAction(body));
    },
    onResetNoti: () => {
      dispatch(resetNoti());
    },
    onGetListDepartment: () => {
      dispatch(fetchListDepartment());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'usersPage', reducer });
const withSaga = injectSaga({ key: 'usersPage', saga });

export default compose(
  withSnackbar,
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(UsersPage);
