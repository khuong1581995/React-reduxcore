/**
 *
 * RoleGroupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
  TableColumnResizing,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import { NavLink, Link } from 'react-router-dom';
import { Button, TablePagination, Checkbox, Fab, Typography, Paper } from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import GridUI from '@material-ui/core/Grid';
import { Settings, Edit, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ModelTableDisplaySetting from '../../components/ModelTableDisplaySetting';
import makeSelectRoleGroupPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */

let allId = [];
export class RoleGroupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Tên' },
        { name: 'memberNameOfRole', title: 'Tên thành viên' },
        { name: 'area', title: 'Khu vực' },
        { name: 'description', title: 'Mô tả' },
      ], // các cột được hiển thị
      // defaultOrder: [], // sắp xếp thứ tự hiển thị của các cột
      defaultColumnWidths: [
        { columnName: 'checkbox', width: 100 },
        { columnName: 'id', width: 100 },
        { columnName: 'name', width: 200 },
        { columnName: 'memberNameOfRole', width: 250 },
        { columnName: 'area', width: 350 },
        { columnName: 'description', width: 500 },
        { columnName: 'action', width: 90 },
      ], // chiều ngang mặc định của các cột
      rows: [
        {
          id: 1,
          name: 'Quản trị',
          memberNameOfRole: 'Chiến, Thắng',
          area: 'Hội Sở Chính, Đà Nẵng, Hồ Chí Minh, Đà Nẵng',
          description: 'GĐ, PGĐ thì xem được toàn bộ hệ thống',
        },
        {
          id: 2,
          name: 'Nhóm 1',
          memberNameOfRole: 'Lê Mạnh Hùng , Lê Mạnh Hùng , Lê Mạnh Hùng , Trưởng phòng ĐN',
          area: 'Hội Sở Chính, Hội Sở Chính, Hồ Chí Minh, Hồ Chí Minh',
          description: 'TP, PP, GĐ CN, PGĐ CN được xem được dữ liệu chi nhánh phụ trách',
        },
        {
          id: 3,
          name: 'Nhóm 2',
          memberNameOfRole: 'Nguyễn Mạnh Hùng, Lương Thúy Ngân, Lê Ngọc Hiếu, Trưởng phòng HCM',
          area: 'Hội Sở Chính, Đà Nẵng, Đà Nẵng, Hồ Chí Minh, Hội Sở Chính, Hội Sở Chính',
          description: 'Chuyên viên',
        },
        {
          id: 4,
          name: 'Nhóm 3',
          memberNameOfRole: 'Nguyễn Thiện Toàn, Nhân viên ĐN 1, Nhân Viên ĐN 2, Nhân viên HCM 1, Nguyễn Thị Hà, Trần Quang Trung',
          area: 'Hội Sở Chính, Đà Nẵng, Hồ Chí Minh, Hội Sở Chính',
          description: '',
        },
      ], // dữ liệu hiển thị
      columnOrder: ['id', 'name', 'memberNameOfRole', 'area', 'description', 'action'],
      //   pageSizes: [5, 10, 15],
      rowsPerPage: 5, // số hàng hiển thị trên một bảng
      page: 0, // trang hiện tại
      openDialogTableSetting: false, // hiển thị dialog
      selected: [], // các hàng được lựa chọn
      rightColumns: ['action'], // cột fixed bên phải
      // defaultColumnWidths: [], // chiều ngang mặc định của các cột
      // leftColumns: ['checkbox'], //  cột fixed bên trái
      // rightColumns: ['action'], // cột fixed bên phải
    };
  }

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page, columns, columnOrder } = this.state;
    allId = [];
    const newRows = rows.map(row => {
      const action = (
        <Fab size="small" title="Chỉnh sửa" style={{ marginLeft: 10 }} color="primary" onClick={this.handleDeletes}>
          <Edit color="default" />
        </Fab>
      );
      const checkbox = this.addCheckbox(row.id);
      allId.push(row.id);
      return { ...row, action, checkbox };
    });
    const newColumns = [...columns, { name: 'checkbox', title: this.addCheckboxAll() }, { name: 'action', title: 'Cập nhật' }];
    return (
      <div>
        <Helmet>
          <title>Nhóm quyền </title>
          <meta name="description" content="Description of RoleGroupPage" />
        </Helmet>
        <Paper className={classes.breadcrumbs}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/setting/user">
              Danh sách nhân sự
            </Link>
            <Typography color="textPrimary">Danh sách nhóm quyền</Typography>
          </Breadcrumbs>
        </Paper>
        <GridUI container>
          <GridUI item md={11}>
            <Button component={NavLink} to="/setting/roleGroup/add" style={{ marginBottom: 10, marginRight: 10 }} variant="contained" color="primary">
              Thêm mới nhóm quyền
            </Button>
          </GridUI>
          <GridUI container justify="flex-end" item md={1}>
            {this.state.selected.length !== 0 ? (
              <Fab size="small" title="Xóa mục đã chọn" style={{ marginRight: 10 }} color="secondary" onClick={this.handleDeletes}>
                <Delete style={{ color: 'white' }} />
              </Fab>
            ) : null}
            <Fab size="small" title="Thiết lập hiển thị" onClick={() => this.handleChangeDialogTableSetting(this.state.openDialogTableSetting)}>
              <Settings />
            </Fab>
          </GridUI>
        </GridUI>

        <Paper className={classes.tableContainer} id="table-full-width">
          <Grid rows={newRows} columns={newColumns} style={{ width: '100%' }}>
            <DragDropProvider />
            {/* <IntegratedFiltering />
            <IntegratedSorting /> */}
            <Table />
            {columnOrder.length !== 0 ? <TableColumnReordering defaultOrder={columnOrder} /> : null}
            {columnOrder.length !== 0 ? <TableColumnResizing defaultColumnWidths={this.state.defaultColumnWidths} /> : null}

            <TableHeaderRow />
            {/* <SortingState defaultSorting={[{ columnName: 'name', direction: 'asc' }]} /> */}
            {/* <SearchState defaultValue="" /> */}
            <TableFixedColumns rightColumns={this.state.rightColumns} />
          </Grid>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Trang trước',
            }}
            nextIconButtonProps={{
              'aria-label': 'Trang tiếp theo',
            }}
            labelRowsPerPage="Hiển thị: "
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>

        <ModelTableDisplaySetting
          handleChangeDialogTableSetting={this.handleChangeDialogTableSetting}
          columns={this.state.columns}
          openDialogTableSetting={this.state.openDialogTableSetting}
        />
      </div>
    );
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  addCheckbox = id => <Checkbox checked={this.state.selected.includes(id)} color="primary" value={id} onClick={() => this.handleSelect(id)} />;

  addCheckboxAll = () => <Checkbox checked={this.state.selectAll} onClick={() => this.handleSelectAll()} />;

  // Thay đổi số dòng trên một trang
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSelectAll = () => {
    const selectAll = !this.state.selectAll;
    if (this.state.selectAll) {
      this.setState({ selected: [], selectAll });
    } else {
      this.setState({ selected: allId, selectAll });
    }
  };

  // Thay đổi các trường hiện trên table
  handleChangeDialogTableSetting = open => {
    this.setState({ openDialogTableSetting: !open });
    // if (save) {
    //   console.log(save);
    //   // body.columns = this.state.columns.filter(item => item.name !== 'checkbox' && item.name !== 'stt' && item.name !== 'action');
    // }
  };

  handleSelect = id => {
    const { selected } = this.state;
    const index = this.state.selected.findIndex(i => i === id);
    if (index === -1) selected.push(id);
    else selected.splice(index, 1);
    this.setState({ selected });
  };
}

RoleGroupPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  roleGroupPage: makeSelectRoleGroupPage(),
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

const withReducer = injectReducer({ key: 'roleGroupPage', reducer });
const withSaga = injectSaga({ key: 'roleGroupPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(RoleGroupPage);
