/**
 *
 * AddNewCrmCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import classNames from 'classnames';
import {
  Paper,
  withStyles,
  Typography,
  Button,
  Grid as GridUI,
  Checkbox,
  Fab,
  TablePagination,
  Drawer,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Settings, Edit, Delete, ViewList, CheckBox, TableChart, CloudDownload, DeleteForever, Timeline } from '@material-ui/icons';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Helmet } from 'react-helmet';
import { SortingState, IntegratedSorting, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { Grid, DragDropProvider, Table, TableHeaderRow, TableColumnReordering } from '@devexpress/dx-react-grid-material-ui';

import PositionedSnackbar from 'components/PositionedSnackbar';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import styles from './styles';

import makeSelectAddNewCrmCollection from './selectors';
import saga from './saga';
import { getAllCollection, postAddNewCollection, defaultAction } from './actions';
import CrmCollectionDetail from '../../components/CrmCollectionDetail';
let allId = [];
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AddNewCrmCollection extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      openDetail: false,
      anchorEl: false,
      columns: [
        { name: 'name', title: 'Tên' },
        { name: 'code', title: 'Mã' },
        { name: 'owner', title: 'Người tạo' },
        { name: 'status', title: 'Trạng thái' },
        { name: 'plugins', title: 'Plugins' },
        { name: 'action', title: 'Thao tác', width: 100 },
      ],
      tableColumnExtensions: [{ columnName: 'codePro', width: 100 }],
      rows: [
        {
          _id: '5cb6d29274d670191f7bd7c3',
          name: 'ghost',
          code: 'a',
          collectionSchema: {
            name: 'Linghtstick',
            dob: 'date',
          },
          owner: null,

          status: 1,
          plugins: ['Danh sách', 'Báo cáo'],
        },
        {
          _id: '5cb6d31774d670191f7bd7c7',
          name: 'ghost',
          code: 'b',
          collectionSchema: {
            name: 'Linghtstick',
            dob: 'date',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb6d35a74d670191f7bd7cc',
          name: 'Bài viết',
          code: 'DC_POST',
          collectionSchema: {
            name: 'String',
            dob: 'date',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb6d3eb74d670191f7bd7d0',
          name: 'Sản phẩm',
          code: 'DC_PRODUCTS',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb6d41974d670191f7bd7d3',
          name: 'Sản phẩm',
          code: 'DC_PRODUCT2',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb6d8c8deb5d52d24701167',
          name: 'Sản phẩm 4',
          code: 'DC_PRODUCT3',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d3655d99f44e51d1a1a2',
          name: '*',
          code: '1',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d36f5d99f44e51d1a1a3',
          name: '*',
          code: '-4',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d3785d99f44e51d1a1a4',
          name: '*',
          code: '#',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d37d5d99f44e51d1a1a5',
          name: '*',
          code: '?',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d3875d99f44e51d1a1a6',
          name: '*',
          code: '**',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d38f5d99f44e51d1a1a7',
          name: '*',
          code: '3',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d3d35d99f44e51d1a1ac',
          name: '*',
          code: '^',
          collectionSchema: {
            name: 'Linghtstick',
            dob: 'date',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7d6325d99f44e51d1a1ae',
          name: 'ghost',
          code: 'DA1',
          collectionSchema: {
            name: 'Linghtstick',
            dob: 'date',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed076c1b7d180638bb3d',
          name: 'a',
          code: 'A',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed246c1b7d180638bb40',
          name: 'ab',
          code: 'B',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed326c1b7d180638bb42',
          name: 'ab',
          code: 'Ha',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed386c1b7d180638bb43',
          name: 'ab',
          code: 'ha',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed3f6c1b7d180638bb44',
          name: 'ab',
          code: 'H',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed456c1b7d180638bb45',
          name: 'ab',
          code: 'h',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed516c1b7d180638bb46',
          name: 'ab',
          code: 'HaI',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7ed576c1b7d180638bb47',
          name: 'ab',
          code: 'HAi',
          collectionSchema: {
            name: 'Linghtstick',
            dob: 'date',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7f682065e7c231f3a8144',
          name: 'Thaoo',
          code: '654321',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb7fab827a4422405925bbb',
          name: 'ghost1',
          code: '123',
          collectionSchema: {
            name: 'Linghtstick',
            phone: 'abc',
            dob: 'date',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb8252c27a4422405925c55',
          name: 'Thaoo',
          code: '123abc',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
        {
          _id: '5cb9305ff11110768f5076a6',
          name: 'Thaoo',
          code: '321',
          collectionSchema: {
            test: 'String',
          },
          owner: null,

          status: 1,
          plugins: [],
        },
      ],
      columnOrder: ['name', 'code', 'owner', 'status', 'plugins', 'action'],
      selected: [],
      selectAll: false,
      openSnackbar: false,
      message: { content: '', type: null },
      // dialogStatus: false,
      rowsPerPage: 5, // số hàng hiển thị trên một bảng
      page: 0, // trang hiện tại
    };

    this.changeColumnOrder = this.changeColumnOrder.bind(this);
  }

  componentDidMount() {
    this.props.getCollection();
  }

  componentWillUpdate(props) {
    const { allCRMCollection, addSuccess } = props.addNewCrmCollection;
    this.state.rows = allCRMCollection || [];
    if (addSuccess) {
      this.props.defaultReset();
      this.props.getCollection();
      this.toggleDrawer();
    }
  }

  render() {
    const { rows, columns, tableColumnExtensions, columnOrder, openSnackbar, message, rowsPerPage, page, anchorEl } = this.state;
    const { classes } = this.props;
    allId = [];
    const newsRows = rows.map(row => {
      const statusList = [
        <p style={{ color: 'green', fontWeight: 'bold' }}>Hoạt động</p>,
        <p style={{ color: 'orange', fontWeight: 'bold' }}>Khóa</p>,
      ];
      const status = statusList[row.status - 1];
      const action = (
        <Fab size="small" color="primary" onClick={this.toggleDrawer}>
          <Edit />
        </Fab>
      );
      /* eslint-disable no-underscore-dangle, indent */
      const checkbox = this.addCheckbox(row._id);
      const name = (
        <Button color="primary" style={{ textTransform: 'none' }} onClick={this.toggleDrawer}>
          {row.name}
        </Button>
      );
      const plugins = row.plugins.join();
      allId.push(row._id);
      return { ...row, action, checkbox, status, name, plugins };
    });
    const newColumns = [...columns, { name: 'checkbox', title: this.addCheckboxAll() }];
    const TableRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        // onClick={() => this.handleClickRow(row.id)}
        style={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#81DAF5',
          },
        }}
      />
    );
    return (
      <div>
        <Paper className={classes.breadcrumbs}>
          <Helmet>
            <title>Thêm mới trường CRM</title>
            <meta name="description" content="Description of AddUserPage" />
          </Helmet>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Typography color="textPrimary">CRM</Typography>
          </Breadcrumbs>
        </Paper>
        <Paper className={classes.breadcrumbs}>
          <GridUI container>
            <GridUI item md={10}>
              {this.state.selected.length !== 0 ? (
                <Fab color="secondary" style={{ marginLeft: 29 }} className={classes.button} size="small">
                  <Delete onClick={() => this.handleDeleteItem()} />
                </Fab>
              ) : (
                <div style={{ width: 40, height: 40, float: 'left', marginLeft: 29 }} className={classes.button} />
              )}
              <TextField className={classes.search} label="Tìm kiếm" margin="dense" />
            </GridUI>
            <GridUI item md={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button className={classes.button} variant="contained" color="primary" onClick={this.toggleDrawer}>
                Thêm mới
              </Button>
              &nbsp;
              <Fab
                color="primary"
                className={classNames(classes.button, classes.success)}
                size="small"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <ViewList />
              </Fab>
              <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon} onClick={this.handleClose}>
                    <CheckBox />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Kiểm tra hàng tồn kho" />
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={this.handleClose}>
                  <ListItemIcon className={classes.icon}>
                    <TableChart />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Khởi tạo tệp Excel" />
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={this.handleClose}>
                  <ListItemIcon className={classes.icon}>
                    <CloudDownload />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Xuất tệp Excel" />
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={this.handleClose}>
                  <ListItemIcon className={classes.icon}>
                    <DeleteForever />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Xóa mặt hàng cũ" />
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={this.handleClose}>
                  <ListItemIcon className={classes.icon}>
                    <Timeline />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Lịch sử chuyển kho" />
                </MenuItem>
              </Menu>
              <Fab className={classes.button} color="primary" onClick={() => this.handleDisplay(true)} size="small">
                <Settings />
              </Fab>
              {/* <Modal
                update={state => this.handleUpdate(state)}
                open={dialogStatus}
                columns={columns}
                display={display => this.handleDisplay(display)}
              /> */}
            </GridUI>
          </GridUI>

          <Grid rows={newsRows} columns={newColumns} style={{ width: '100%' }}>
            <DragDropProvider />
            <SortingState defaultSorting={[{ columnName: 'title', direction: 'asc' }]} />
            {/* <SearchState defaultValue="" /> */}
            <IntegratedFiltering />
            <IntegratedSorting />
            <Table columnExtensions={tableColumnExtensions} rowComponent={TableRow} />
            <TableColumnReordering order={columnOrder} onOrderChange={this.changeColumnOrder} />
            <TableHeaderRow showSortingControls />
            {/* <Toolbar /> */}
            {/* <SearchPanel /> */}
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
        {openSnackbar ? <PositionedSnackbar message={message} onClose={this.onCloseSnackbar} /> : null}
        <Drawer anchor="right" open={this.state.openDetail} onClose={this.toggleDrawer} className={classes.detailProduct}>
          <div tabIndex={0} role="button" className={classes.detailProduct}>
            <CrmCollectionDetail onClose={this.toggleDrawer} addNewCollection={this.props.postAddCollection} />
          </div>
        </Drawer>
      </div>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = () => {
    const { openDetail } = this.state;
    this.setState({
      openDetail: !openDetail,
    });
  };

  addCheckbox = id => <Checkbox checked={this.state.selected.includes(id)} color="primary" value={id} onClick={() => this.handleSelect(id)} />;

  addCheckboxAll = () => <Checkbox checked={this.state.selectAll} onClick={() => this.handleSelectAll()} />;

  changeColumnOrder(newOrder) {
    this.setState({ columnOrder: newOrder });
  }

  handleSelect(id) {
    const { selected } = this.state;
    const index = this.state.selected.findIndex(i => i === id);
    if (index === -1) selected.push(id);
    else selected.splice(index, 1);
    this.setState({ selected });
  }

  handleSelectAll() {
    const selectAll = !this.state.selectAll;
    if (this.state.selectAll) {
      this.setState({ selected: [], selectAll });
    } else {
      this.setState({ selected: allId, selectAll });
    }
  }

  handleChange(e) {
    const { columns } = this.state;
    const currentColumn = columns.find(column => column.name === e.target.name);
    currentColumn.title = e.target.value;
    this.setState({ columns });
  }

  onCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
  };

  callSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleDeleteItem() {
    if (this.state.selected.length !== 0) {
      const { rows, selected } = this.state;
      const newRows = rows.filter(row => !selected.includes(row.id));
      this.setState({ rows: newRows, selected: [], message: { content: 'Deleted succesfully', type: 'success' } });
      this.callSnackbar();
    }
  }

  // Đóng/Mở dialog setting
  handleDisplay(display) {
    this.setState({ dialogStatus: display });
  }
  /* eslint-disable */
  handleUpdate(state) {
    console.log(state);
  }
  /* eslint-enable */

  handleClickRow = () => {
    // console.log(id);
    // this.props.history.push(`/detail-product/${id}`);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
}

AddNewCrmCollection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addNewCrmCollection: makeSelectAddNewCrmCollection(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    getCollection: () => {
      dispatch(getAllCollection());
    },
    postAddCollection: body => {
      dispatch(postAddNewCollection(body));
    },
    defaultReset: () => {
      dispatch(defaultAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addNewCrmCollection', reducer });
const withSaga = injectSaga({ key: 'addNewCrmCollection', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(AddNewCrmCollection);
