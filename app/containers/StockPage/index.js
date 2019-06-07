/**
 *
 * StockPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import {
  Paper,
  withStyles,
  Typography,
  Button,
  // Grid as GridUI,
  Checkbox,
  Fab,
  Drawer,
  // TextField,
  // Menu,
  // MenuItem,
  // ListItemIcon,
  // ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TableCell,
  TableHead,
  TableBody,
} from '@material-ui/core';
import TableUI from '@material-ui/core/Table';
import { Edit } from '@material-ui/icons';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Helmet } from 'react-helmet';
// import { SortingState, IntegratedSorting, IntegratedFiltering, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
// import { Grid, DragDropProvider, Table, TableHeaderRow, TableColumnReordering, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PositionedSnackbar from 'components/PositionedSnackbar';
import { Link } from 'react-router-dom';
import makeSelectStockPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import styles from './styles';
import ProductInforDrawer from '../../components/ProductInforDrawer';
import HOCTable from '../HocTable';

let allId = [];
/* eslint-disable react/prefer-stateless-function */
export class StockPage extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.HOCTable = React.createRef();
    this.state = {
      openDetail: false,
      anchorEl: false,
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15],
      columns: [
        { name: 'codePro', title: 'Mã sản phẩm' },
        { name: 'barCode', title: 'Mã vạch' },
        { name: 'cate', title: 'Tên	Danh mục' },
        { name: 'name', title: 'Tên Sản Phẩm' },
        { name: 'image', title: 'Ảnh Sản Phẩm' },
        { name: 'sizePro', title: 'Kích thước' },
        { name: 'salePrice', title: 'Giá bán' },
        { name: 'costPrice', title: 'Giá vốn' },
        { name: 'amount', title: 'Số lượng' },
        { name: 'amountTotal', title: 'Tổng số lượng' },
        { name: 'inventory', title: 'Hàng tồn kho' },
        { name: 'action', title: 'HÀNH ĐỘNG' },
        { name: 'status', title: 'TRẠNG THÁI' },
      ],
      tableColumnExtensions: [{ columnName: 'codePro', width: 100 }],
      rows: [
        {
          id: 1,
          code: 'PT112',
          barcode: '234',
          name: 'Mũ GC',
          image: 'https://centimet.vn/wp-content/uploads/Mu-Gucci-GG-canvas-baseball-cap-3-400x600.jpg',
          category: 'Mũ',
          size: 'M',
          sellPrice: '2000000',
          originalPrice: '1600000',
          amount: 100,
          amountTotal: 200,
          inventory: 50,
          action: 'DEL',
          status: 1,
          state: '1',
        },
        {
          id: 2,
          codePro: 'T1189',
          barCode: '234',
          name: 'Quần Kaki Túi Hộp HST727',
          image: 'https://centimet.vn/wp-content/uploads/Mu-Gucci-GG-canvas-baseball-cap-3-400x600.jpg',
          cate: 'Quần',
          sizePro: 'M',
          salePrice: '2000000',
          costPrice: '1600000',
          amount: 100,
          amountTotal: 200,
          inventory: 50,
          action: 'DEL',
          status: 2,
          state: '2',
        },
      ],
      columnOrder: [
        'codePro',
        'barCode',
        'cate',
        'name',
        'image',
        'sizePro',
        'salePrice',
        'costPrice',
        'amount',
        'amountTotal',
        'inventory',
        'status',
        'action',
      ],
      selected: [],
      selectAll: false,
      openSnackbar: false,
      message: { content: '', type: null },
      // dialogStatus: false,
      // handleDialog: false,
      // rowsPerPage: 5, // số hàng hiển thị trên một bảng
      // page: 0, // trang hiện tại
      inventory: [
        {
          name: 'Bếp từ',
          address: 'Hà Nội',
          amount: 100,
        },
        {
          name: 'Bếp từ',
          address: 'Hà Nội',
          amount: 100,
        },
        {
          name: 'Bếp từ',
          address: 'Hà Nội',
          amount: 100,
        },
      ],
    };
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.changeColumnOrder = this.changeColumnOrder.bind(this);
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
  // handleDisplay(display) {
  //   this.setState({ dialogStatus: display });
  // }
  /* eslint-disable */

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDialog = () => {
    const { openInventory } = this.state;
    this.setState({ openInventory: !openInventory });
  };

  callBack = (item, name) => {
    console.log(item);
  };
  handleAddClick = () => {
    this.props.history.push('/stock/add');
  };
  handleDeleteClick = () => {
    console.log(this.HOCTable.current);
    // this.HOCTable.resetSelection();
    this.HOCTable.current.getWrappedInstance();
  };

  componentDidMount() {}

  render() {
    const {
      rows,
      columns,
      tableColumnExtensions,
      columnOrder,
      openSnackbar,
      message,
      pageSizes,
      anchorEl,
      inventory,

      pageSize,

      currentPage,
    } = this.state;
    const { classes } = this.props;
    allId = [];
    const newsRows = rows.map(row => {
      const statusList = [
        <p style={{ color: 'green', fontWeight: 'bold' }}>Cơ hội</p>,
        <p style={{ color: 'orange', fontWeight: 'bold' }}>Tồn kho</p>,
        <p style={{ color: 'red', fontWeight: 'bold' }}>Quá hạn</p>,
      ];
      const status = statusList[row.status];
      const action = (
        <Link to={`/stock/detail/${row.id}`}>
          <Fab size="small" color="primary">
            <Edit />
          </Fab>
        </Link>
      );
      const checkbox = this.addCheckbox(row.id);
      const amountTotal = (
        <Button onClick={this.handleDialog} color="primary">
          {row.amountTotal}
        </Button>
      );
      const inventory = (
        <Button component={Link} to={`/stock/list/inventory/${row.id}`} color="primary">
          {row.inventory}
        </Button>
      );
      const name = (
        <Button onClick={this.toggleDrawer} color="primary" style={{ textTransform: 'unset' }}>
          {row.name}
        </Button>
      );
      const image = (
        <img
          height="40px"
          className={classes.image}
          src="https://centimet.vn/wp-content/uploads/Mu-Gucci-GG-canvas-baseball-cap-3-400x600.jpg"
          alt=""
        />
      );
      allId.push(row.id);
      return { ...row, action, checkbox, status, amountTotal, inventory, name, image };
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
            <title>Kho</title>
            <meta name="description" content="Description of AddUserPage" />
          </Helmet>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link style={{ color: '#0795db', textDecoration: 'none' }} to="/">
              Dashboard
            </Link>
            <Typography color="textPrimary">CRM</Typography>
          </Breadcrumbs>
        </Paper>
        <HOCTable
          onRef={ref => (this.child = ref)}
          callBack={this.callBack}
          handleEditClick={this.handleEditClick}
          handleAddClick={this.handleAddClick}
          handleDeleteClick={this.handleDeleteClick}
          customColumns={
            [
              // {
              //   columnName: 'state',
              //   component: [{ value: '1', code: <div style={{ color: 'red' }}>test</div> }, { value: '2', code: <div>test2</div> }],
              // },
            ]
          }
          path={'/inventory/list'}
          data={this.state.rows}
          enableEdit
        />
        {/* <Paper className={classes.breadcrumbs}>
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
              <Button component={Link} to="/stock/add" className={classes.button} variant="contained" color="primary">
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
            </GridUI>
          </GridUI>

          <Grid rows={newsRows} columns={newColumns} style={{ width: '100%' }}>
            <DragDropProvider />
            <SortingState defaultSorting={[{ columnName: 'title', direction: 'asc' }]} />

            <IntegratedFiltering />
            <IntegratedSorting />
            <Table columnExtensions={tableColumnExtensions} rowComponent={TableRow} />
            <TableColumnReordering order={columnOrder} onOrderChange={this.changeColumnOrder} />
            <TableHeaderRow showSortingControls />

            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={this.changeCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={this.changePageSize}
            />
            <IntegratedPaging />
            <PagingPanel pageSizes={pageSizes} />
          </Grid>
        </Paper> */}
        {openSnackbar ? <PositionedSnackbar message={message} onClose={this.onCloseSnackbar} /> : null}
        <Drawer anchor="right" open={this.state.openDetail} onClose={this.toggleDrawer} className={classes.detailProduct}>
          <div tabIndex={0} role="button" className={classes.detailProduct}>
            <ProductInforDrawer onClose={this.toggleDrawer} />
          </div>
        </Drawer>
        <Dialog open={this.state.openInventory} onClose={this.handleDialog}>
          <DialogTitle id="alert-dialog-title">Số lượng chi tiết</DialogTitle>
          <DialogContent style={{ width: 600, height: 300 }}>
            <TableUI>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Điểm bán hàng</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableUI>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

StockPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  stockPage: makeSelectStockPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
);

const withReducer = injectReducer({ key: 'stockPage', reducer });
const withSaga = injectSaga({ key: 'stockPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(StockPage);
