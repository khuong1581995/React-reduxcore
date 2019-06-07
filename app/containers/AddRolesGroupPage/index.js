/**
 *
 * AddRolesGroupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Paper, Typography, TextField, Button, Tabs, Tab, Grid, Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import TreeView from 'devextreme-react/tree-view';
import { Edit, Settings } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Link } from 'react-router-dom';
import makeSelectAddRolesGroupPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AddRolesGroupPage extends React.Component {
  state = {
    roleName: '',
    roleDes: '',
    departmentList: [
      // danh sách các hành động trong quyền
      {
        id: '1',
        text: 'Section',
        expanded: true,
        items: [
          {
            id: '1_1',
            text: 'Phòng kinh doanh:',
            items: [
              {
                id: '1_1_1',
                text: 'Phòng kinh doanh 1',
              },
              {
                id: '1_1_2',
                text: 'Phòng kinh doanh 2',
              },
            ],
          },
          {
            id: '1_2',
            text: 'Phòng nhân sự:  ',
            items: [
              {
                id: '1_2_1',
                text: 'Phòng nhân sự 1',
              },
              {
                id: '1_2_2',
                text: 'Phòng nhân sự 2',
              },
              {
                id: '1_2_3',
                text: 'Phòng nhân sự 3',
              },
            ],
          },
          {
            id: '1_3',
            text: 'Phòng IT:',
            items: [
              {
                id: '1_3_1',
                text: 'Phòng IT 1',
              },
              {
                id: '1_3_2',
                text: 'Phòng IT 2',
              },
            ],
          },
        ],
      },
    ],
    selectAllDepartment: false,
    valueForTabs: 0,
    valueForSubTabs: 0,
    customerRole: {
      view: false,
      add: false,
      edit: false,
      delete: false,
      export: false,
      import: false,
    },
    contractRole: {
      view: false,
      add: false,
      edit: false,
      delete: false,
      export: false,
      import: false,
    },
    serviceRole: {
      view: false,
      add: false,
      edit: false,
      delete: false,
      export: false,
      import: false,
    },
    reportRole: {
      view: false,
      add: false,
      edit: false,
      delete: false,
      export: false,
      import: false,
    },
    businessReportRole: {
      view: false,
      export: false,
    },
    personalReportRole: {
      view: false,
      export: false,
    },
    waringList: [
      {
        id: '1',
        text: 'Cảnh báo',
        expanded: true,
        items: [
          {
            id: '1_1',
            text: 'Cảnh báo nhân sự nghỉ quá nhiều',
          },
          {
            id: '1_2',
            text: 'Cảnh báo công việc chậm tiến độ',
          },
        ],
      },
    ],
    approveList: [
      {
        id: '1',
        text: 'Phê duyệt',
        expanded: true,
        items: [
          {
            id: '1_1',
            text: 'Phê duyệt nghỉ phép',
          },
          {
            id: '1_2',
            text: 'Phê duyệt bảng lương',
          },
          {
            id: '1_3',
            text: 'Phê duyệt chi',
          },
          {
            id: '1_4',
            text: 'Phê duyệt thu',
          },
          {
            id: '1_5',
            text: 'Phê duyệt điều chuyển công tác',
          },
        ],
      },
    ],
    departmentCheckedList: [],
    waringCheckedList: [],
    approveCheckedList: [],
  };

  render() {
    const { classes, theme } = this.props;
    const {
      roleName,
      roleDes,
      valueForTabs,
      customerRole,
      contractRole,
      serviceRole,
      reportRole,
      businessReportRole,
      personalReportRole,
      valueForSubTabs,
    } = this.state;
    return (
      <div>
        <Helmet>
          <title>Tạo mới nhóm quyền</title>
          <meta name="description" content="Description of AddRolesGroupPage" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/setting/user">
              Danh sách nhân sự
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/setting/roleGroup">
              Danh sách nhóm quyền
            </Link>
            <Typography color="textPrimary">Thêm mới nhóm quyền</Typography>
          </Breadcrumbs>
        </Paper>
        <Paper className={classes.paper}>
          <Typography component="p" className={classes.paperTitle}>
            <Edit style={{ fontSize: '20px', marginBottom: '5px' }} /> Thông tin cơ bản vai trò{' '}
            <span className={classes.spanTitle}>Các trường màu đỏ là cần nhập</span>
          </Typography>
          <TextField value={roleName} className={classes.textField} name="roleName" onChange={this.handleChange} label="Tên vai trò" />
          <TextField
            value={roleDes}
            label="Mô tả vai trò"
            name="roleDes"
            className={classes.textField}
            onChange={this.handleChange}
            multiline
            rows="3"
          />
          <Button variant="contained" color="primary" className={classes.btn}>
            Lưu vai trò
          </Button>
        </Paper>
        <Paper className={classes.paper}>
          <Typography component="p" className={classes.paperTitle}>
            <Settings style={{ fontSize: '20px', marginBottom: '5px' }} /> Phân quyền truy cập cho vai trò
          </Typography>
          {/* <TreeView
            className={classes.treeView}
            items={this.state.rolesList}
            showCheckBoxesMode="normal"
            onItemSelectionChanged={this.selectionChanged}
            // itemRender={this.renderTreeViewItem}
          /> */}
          <Tabs value={this.state.valueForTabs} onChange={this.handleChangeTab} indicatorColor="primary" scrollButtons="on" variant="scrollable">
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Phân quyền chức năng" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Phân quyền phòng ban" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Phân quyền báo cáo" />
            <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Phân quyền cảnh báo & phê duyệt" />
          </Tabs>
          <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={valueForTabs} onChangeIndex={this.handleChangeIndex}>
            <TabContainer dir={theme.direction}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phân quyền chức năng</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Xem</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Thêm</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Sửa</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Xóa</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Xuất file</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Import file</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={customerRole.view}
                        onChange={this.handleChangeCheckbox('customerRole', 'view')}
                        value="customerRole view"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={customerRole.add}
                        onChange={this.handleChangeCheckbox('customerRole', 'add')}
                        value="customerRole add"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={customerRole.edit}
                        onChange={this.handleChangeCheckbox('customerRole', 'edit')}
                        value="customerRole edit"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={customerRole.delete}
                        onChange={this.handleChangeCheckbox('customerRole', 'delete')}
                        value="customerRole delete"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={customerRole.export}
                        onChange={this.handleChangeCheckbox('customerRole', 'export')}
                        value="customerRole export"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={customerRole.import}
                        onChange={this.handleChangeCheckbox('customerRole', 'import')}
                        value="customerRole import"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hợp đồng</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={contractRole.view}
                        onChange={this.handleChangeCheckbox('contractRole', 'view')}
                        value="contractRole view"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={contractRole.add}
                        onChange={this.handleChangeCheckbox('contractRole', 'add')}
                        value="contractRole add"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={contractRole.edit}
                        onChange={this.handleChangeCheckbox('contractRole', 'edit')}
                        value="contractRole edit"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={contractRole.delete}
                        onChange={this.handleChangeCheckbox('contractRole', 'delete')}
                        value="contractRole delete"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={contractRole.export}
                        onChange={this.handleChangeCheckbox('contractRole', 'export')}
                        value="contractRole export"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={contractRole.import}
                        onChange={this.handleChangeCheckbox('contractRole', 'import')}
                        value="contractRole import"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dịch vụ</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={serviceRole.view}
                        onChange={this.handleChangeCheckbox('serviceRole', 'view')}
                        value="serviceRole view"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={serviceRole.add}
                        onChange={this.handleChangeCheckbox('serviceRole', 'add')}
                        value="serviceRole add"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={serviceRole.edit}
                        onChange={this.handleChangeCheckbox('serviceRole', 'edit')}
                        value="serviceRole edit"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={serviceRole.delete}
                        onChange={this.handleChangeCheckbox('serviceRole', 'delete')}
                        value="serviceRole delete"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={serviceRole.export}
                        onChange={this.handleChangeCheckbox('serviceRole', 'export')}
                        value="serviceRole export"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={serviceRole.import}
                        onChange={this.handleChangeCheckbox('serviceRole', 'import')}
                        value="serviceRole import"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Báo cáo</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={reportRole.view}
                        onChange={this.handleChangeCheckbox('reportRole', 'view')}
                        value="reportRole view"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={reportRole.add}
                        onChange={this.handleChangeCheckbox('reportRole', 'add')}
                        value="reportRole add"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={reportRole.edit}
                        onChange={this.handleChangeCheckbox('reportRole', 'edit')}
                        value="reportRole edit"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={reportRole.delete}
                        onChange={this.handleChangeCheckbox('reportRole', 'delete')}
                        value="reportRole delete"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={reportRole.export}
                        onChange={this.handleChangeCheckbox('reportRole', 'export')}
                        value="reportRole export"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={reportRole.import}
                        onChange={this.handleChangeCheckbox('reportRole', 'import')}
                        value="reportRole import"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <TreeView
                className={classes.treeView}
                items={this.state.departmentList}
                showCheckBoxesMode="normal"
                name="departmentTree"
                onItemSelectionChanged={this.selectionChanged('departmentTree')}
                // itemRender={this.renderTreeViewItem}
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Báo cáo</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Xem</TableCell>
                    <TableCell style={{ paddingLeft: 40 }}>Xuất báo cáo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Báo cáo hoạt động kinh doanh</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={businessReportRole.view}
                        onChange={this.handleChangeCheckbox('businessReportRole', 'view')}
                        value="businessReportRole view"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={businessReportRole.export}
                        onChange={this.handleChangeCheckbox('businessReportRole', 'export')}
                        value="businessReportRole export"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Báo cáo hoạt động kinh doanh</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={personalReportRole.view}
                        onChange={this.handleChangeCheckbox('personalReportRole', 'view')}
                        value="personalReportRole view"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={personalReportRole.export}
                        onChange={this.handleChangeCheckbox('personalReportRole', 'export')}
                        value="personalReportRole export"
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <Tabs value={this.state.valueForSubTabs} onChange={this.handleChangeTabSub} indicatorColor="primary">
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Phân loại khách hàng" />
                <Tab disableRipple classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Người đại diện" />
              </Tabs>
              <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={valueForSubTabs} onChangeIndex={this.handleChangeIndexSub}>
                <TabContainer dir={theme.direction}>
                  <TreeView
                    className={classes.treeView}
                    items={this.state.waringList}
                    showCheckBoxesMode="normal"
                    onItemSelectionChanged={this.selectionChanged('warningTree')}
                    name="warningTree"
                    // itemRender={this.renderTreeViewItem}
                  />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <TreeView
                    className={classes.treeView}
                    items={this.state.approveList}
                    showCheckBoxesMode="normal"
                    name="approveTree"
                    onItemSelectionChanged={this.selectionChanged('approveTree')}
                    // itemRender={this.renderTreeViewItem}
                  />
                </TabContainer>
              </SwipeableViews>
            </TabContainer>
          </SwipeableViews>
        </Paper>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeCheckAll = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeCheckbox = (role, subRole) => event => {
    // role[subRole] = event.target.checked;
    /* eslint-disable */
    const target = this.state[role];
    /* eslint-enable */
    target[subRole] = event.target.checked;
    this.setState({ [role]: target });
  };

  handleChangeTab = (event, value) => {
    this.setState({ valueForTabs: value });
  };

  handleChangeIndex = index => {
    this.setState({ valueForTabs: index });
  };

  handleChangeTabSub = (event, value) => {
    this.setState({ valueForSubTabs: value });
  };

  handleChangeIndexSub = index => {
    this.setState({ valueForSubTabs: index });
  };

  selectionChanged = name => e => {
    const value = e.node;
    if (this.isRole(value)) {
      this.processRoles(
        {
          id: value.key,
          text: value.text,
          itemData: value.itemData,
          selected: value.selected,
          category: value.parent.text,
        },
        name,
      );
    } else {
      value.items.forEach(role => {
        this.processRoles(
          {
            id: role.key,
            text: role.text,
            itemData: role.itemData,
            selected: role.selected,
            category: value.text,
          },
          name,
        );
      });
    }
  };

  isRole = data => !data.items.length;

  processRoles = (role, name) => {
    /* eslint-disable */
    this.setState(prevState => {
      if (name === 'approveTree') {
        let itemIndex = -1;
        const { approveCheckedList } = prevState;
        approveCheckedList.forEach((item, index) => {
          if (item.id === role.id) {
            itemIndex = index;
            return false;
          }
        });
        if (role.selected && itemIndex === -1) {
          approveCheckedList.push(role);
        } else if (!role.selected) {
          approveCheckedList.splice(itemIndex, 1);
        }
        return { approveCheckedList: approveCheckedList.slice(0) };
      }
      if (name === 'warningTree') {
        let itemIndex = -1;
        const { waringCheckedList } = prevState;
        waringCheckedList.forEach((item, index) => {
          if (item.id === role.id) {
            itemIndex = index;
            return false;
          }
        });
        if (role.selected && itemIndex === -1) {
          waringCheckedList.push(role);
        } else if (!role.selected) {
          waringCheckedList.splice(itemIndex, 1);
        }
        return { waringCheckedList: waringCheckedList.slice(0) };
      }
      if (name === 'departmentTree') {
        let itemIndex = -1;
        const { departmentCheckedList } = prevState;
        departmentCheckedList.forEach((item, index) => {
          if (item.id === role.id) {
            itemIndex = index;
            return false;
          }
        });
        if (role.selected && itemIndex === -1) {
          departmentCheckedList.push(role);
        } else if (!role.selected) {
          departmentCheckedList.splice(itemIndex, 1);
        }
        return { departmentCheckedList: departmentCheckedList.slice(0) };
      }
    });
    /* eslint-enable */
  };

  renderTreeViewItem = value => <div style={{ padding: 5 }}>{value.text}</div>;
}

function TabContainer({ children, dir }) {
  return (
    <Grid item md={12} dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Grid>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

AddRolesGroupPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addRolesGroupPage: makeSelectAddRolesGroupPage(),
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

const withReducer = injectReducer({ key: 'addRolesGroupPage', reducer });
const withSaga = injectSaga({ key: 'addRolesGroupPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles, { withTheme: true }),
)(AddRolesGroupPage);
