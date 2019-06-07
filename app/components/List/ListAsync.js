import * as React from 'react';
import { Fab as Fa, TablePagination, Checkbox, Input, Button, Dialog as DialogUI, DialogActions, DialogContent } from '@material-ui/core';
import { Settings, Delete, Storage, Add } from '@material-ui/icons';
import { SortingState, IntegratedSorting, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { Grid, DragDropProvider, Table, TableHeaderRow, TableColumnReordering, TableFixedColumns } from '@devexpress/dx-react-grid-material-ui';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/ItemGrid';
import { Link } from 'react-router-dom';
import CustomLinearProgress from 'components/CustomLinearProgress/CustomLinearProgress';
import PropTypes from 'prop-types';
import Dialog from '../Modal/DialogAsync';

let allId = [];

const Fab = props => <Fa size="small" color="primary" {...props} style={{ margin: '5px', float: 'right' }} />;

class ListAsync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      tableColumnExtensions: [{ columnName: 'checkbox', width: 90 }],
      rows: [],
      columnOrder: [],
      selected: [],
      selectAll: false,
      dialogStatus: false,
      activePage: 0,
      perPage: 10,
      search: '',
      initDialog: false,
      rightColumns: ['edit'],
      deleteDialog: false,
    };

    this.changeColumnOrder = this.changeColumnOrder.bind(this);
    this.search = React.createRef();
  }

  addCheckbox = id => <Checkbox color="primary" onClick={() => this.handleSelect(id)} value={id} checked={this.state.selected.includes(id)} />;

  addCheckboxAll = () => <Checkbox onClick={() => this.handleSelectAll()} checked={this.state.selectAll} />;

  // Popover

  addAction = row => (
    <button type="button" style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={e => this.handlePop(e)}>
      Xem chi tiết {row.action}
    </button>
  );

  changeColumnOrder(newOrder) {
    const columns = this.state.columns;
    const newColumns = columns.map(item => ({ ...item, order: newOrder.indexOf(item.name) }));
    this.props.saveConfig(newColumns);
  }

  handleSelect(id) {
    const { selected } = this.state;
    const index = this.state.selected.findIndex(i => i === id);
    if (index === -1) selected.push(id);
    else selected.splice(index, 1);
    this.setState({ selected });
  }

  // Chọn tất cả
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

  handleDeleteItem = () => {
    this.setState({ deleteDialog: false, selected: [] });
    if (this.state.selected.length !== 0) {
      const { selected } = this.state;
      this.props.handleDelete(selected);
    }
  };

  // Xử lý phân trang
  handleChangePage = (event, activePage) => {
    this.setState({ activePage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ activePage: 0, perPage: event.target.value });
  };

  handlePage = page => this.setState({ activePage: page });

  saveSetting = (columns, status) => {
    if (status) {
      this.setState({ dialogStatus: false });
      this.props.saveConfig(columns);
    } else {
      this.setState({ columns, dialogStatus: false });
    }
  };

  componentDidMount() {
    const { columns, rows } = this.props;
    const columnOrder = this.props.columnOrder ? this.props.columnOrder : columns.map(item => item.name);
    this.setState({ columns, rows, columnOrder, initDialog: true });
  }

  static getDerivedStateFromProps(props) {
    return {
      rows: props.rows,
      columns: props.columns,
      columnOrder: props.columnOrder ? props.columnOrder : props.columns.map(item => item.name),
    };
  }

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  // Chuyển đổi status về định dạng
  convertData = (item, data) => {
    let list;
    switch (item.type) {
      case 'SALE_POLICY':
        list = ['Không hoạt động', 'Hoạt động'];
        return list[data];
      default:
        list = [
          <CustomLinearProgress color="success" variant="determinate" value={100} />,
          <CustomLinearProgress color="warning" variant="determinate" value={50} />,
          <CustomLinearProgress color="danger" variant="determinate" value={100} />,
        ];
        return list[item];
    }
  };

  getUrl() {
    const res = window.location.pathname.split('/');
    return res[res.length - 1];
  }

  render() {
    const { rows, columns, tableColumnExtensions, columnOrder, dialogStatus, activePage, perPage, search, rightColumns, deleteDialog } = this.state;
    const path = this.props.path ? this.props.path : this.getUrl();

    allId = [];
    const newFilter = rows.filter(item =>
      Object.keys(item).some(
        key =>
          item[key]
            .toString()
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1,
      ),
    );

    const newRows = newFilter.slice(perPage * activePage, perPage * (activePage + 1)).map(row => {
      const checkbox = this.addCheckbox(row._id);
      allId.push(row._id);
      return { ...row, checkbox };
    });
    const newColumns = [...columns, { name: 'checkbox', title: this.addCheckboxAll(), checked: true }].filter(item => item.checked === true);
    return (
      <GridContainer>
        <GridItem md={6} sm={6}>
          <Input value={search} onChange={this.handleSearch} placeholder="Search" />
        </GridItem>

        <GridItem md={6} sm={6} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
          {this.state.selected.length !== 0 ? (
            <Fab color="secondary">
              <Delete onClick={() => this.setState({ deleteDialog: true })} />
            </Fab>
          ) : null}
          <Fab style={{ margin: '5px' }} color="primary" size="small">
            <Link to={`${path}/add`}>
              {' '}
              <Add style={{ color: 'white' }} />
            </Link>
          </Fab>
          <Fab onClick={() => this.setState({ dialogStatus: true })} style={{ margin: '5px' }} color="primary" size="small">
            <Settings />
          </Fab>
          <Fab style={{ margin: '5px' }} color="primary" size="small">
            <Storage />
          </Fab>
        </GridItem>

        <GridItem md={12}>
          <Grid rows={newRows} columns={newColumns}>
            <DragDropProvider />
            <SortingState />
            <IntegratedFiltering />
            <IntegratedSorting />
            <Table columnExtensions={tableColumnExtensions} />
            <TableColumnReordering order={columnOrder} onOrderChange={this.changeColumnOrder} />
            <TableHeaderRow showSortingControls />
            <TableFixedColumns rightColumns={rightColumns} />
          </Grid>
        </GridItem>

        <GridItem style={{ justifyContent: 'flex-end', display: 'flex' }} md={12}>
          <table>
            <tbody>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={newFilter.length}
                  rowsPerPage={perPage}
                  page={activePage}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  // ActionsComponent={TablePaginationActionsWrapped}
                />
              </tr>
            </tbody>
          </table>
        </GridItem>
        {this.state.initDialog ? (
          <Dialog
            saveSetting={(column, status) => this.saveSetting(column, status)}
            columns={columns}
            open={dialogStatus}
            onClose={() => this.setState({ dialogStatus: false })}
          />
        ) : null}

        <DialogUI onClose={() => this.setState({ deleteDialog: false })} open={deleteDialog}>
          <DialogContent>
            {' '}
            <h4>Bạn có chắc chắn muốn xóa không?</h4>
          </DialogContent>
          <DialogActions>
            {' '}
            <Button variant="contained" color="primary" onClick={this.handleDeleteItem}>
              Có
            </Button>
            <Button variant="contained" color="primary" onClick={() => this.setState({ deleteDialog: false })}>
              Không
            </Button>
          </DialogActions>
        </DialogUI>
      </GridContainer>
    );
  }
}

ListAsync.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  columnOrder: PropTypes.array,
  path: PropTypes.string,
};

export default ListAsync;
