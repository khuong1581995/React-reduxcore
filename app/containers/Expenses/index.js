import * as React from 'react';
import {
  Fab as Fa,
  TablePagination,
  Checkbox,
  Popover,
  MenuItem,
  MenuList,
  TableFooter,
  TableRow,
  Input,
  Button as ButtonUI,
} from '@material-ui/core';
import { Settings, Delete, Storage } from '@material-ui/icons';
import { SortingState, IntegratedSorting, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { Grid, DragDropProvider, Table, TableHeaderRow, TableColumnReordering, Toolbar } from '@devexpress/dx-react-grid-material-ui';

// import component

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/ItemGrid';
import { expensesRows, expensesColumns } from 'variable';
import { NavLink } from 'react-router-dom';
import Dialog from 'components/Modal';

let allId = [];
const Fab = props => <Fa size="small" color="primary" {...props} style={{ margin: '5px', float: 'right' }} />;
class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: expensesColumns,
      tableColumnExtensions: [{ columnName: 'checkbox', width: 90 }, { columnName: 'setting', width: 70 }],
      rows: expensesRows,
      columnOrder: ['code', 'title', 'created_by', 'status'],
      selected: [],
      selectAll: false,
      dialogStatus: false,
      activePage: 0,
      perPage: 10,
      anchorEl: null,
      search: '',
    };

    this.changeColumnOrder = this.changeColumnOrder.bind(this);
    this.search = React.createRef();
  }

  addCheckbox = id => <Checkbox color="primary" onClick={() => this.handleSelect(id)} value={id} checked={this.state.selected.includes(id)} />;

  addCheckboxAll = () => <Checkbox onClick={() => this.handleSelectAll()} checked={this.state.selectAll} />;

  // Ẩn hiện Popover

  handlePop = e => {
    const anchorEl = e.currentTarget;
    this.setState({ anchorEl });
  };

  handleClosePop = () => this.setState({ anchorEl: null });

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

  handleDeleteItem() {
    if (this.state.selected.length !== 0) {
      const { rows, selected } = this.state;
      const newRows = rows.filter(row => !selected.includes(row.id));
      this.setState({ rows: newRows, selected: [], activePage: 1 });
    }
  }

  // Xử lý phân trang
  handleChangePage = (event, activePage) => {
    this.setState({ activePage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ activePage: 0, perPage: event.target.value });
  };

  handlePage = page => this.setState({ activePage: page });

  saveSetting(columns) {
    this.setState({ columns, dialogStatus: false });
  }

  // Tìm kiếm

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { rows, columns, tableColumnExtensions, columnOrder, dialogStatus, activePage, perPage, search, anchorEl } = this.state;
    allId = [];
    const newFilter = rows.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    const newRows = newFilter.slice(perPage * activePage, perPage * (activePage + 1)).map(row => {
      const title = (
        <div>
          <NavLink
            to={`/crm/expenses/${row.id}`}
            style={{
              fontWeight: 'bold',
              color: '#0277bd',
              textDecoration: 'none',
            }}
          >
            {row.title}
          </NavLink>
          <p>{row.description}</p>
        </div>
      );

      const checkbox = this.addCheckbox(row.id);
      allId.push(row.id);
      return { ...row, title, checkbox };
    });
    const newColumns = [...columns, { name: 'checkbox', title: this.addCheckboxAll(), visibility: true }].filter(item => item.visibility === true);

    return (
      <GridContainer>
        <GridItem md={6} sm={6}>
          <Input value={search} onChange={this.handleSearch} placeholder="Lọc và tìm kiếm" />
        </GridItem>

        <GridItem md={6} sm={6} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
          {this.state.selected.length !== 0 ? (
            <Fab color="secondary">
              <Delete onClick={() => this.handleDeleteItem()} />
            </Fab>
          ) : null}
          <ButtonUI variant="contained" color="primary">
            Thêm mới
          </ButtonUI>
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
            <SortingState defaultSorting={[{ columnName: 'title', direction: 'asc' }]} />
            <IntegratedFiltering />
            <IntegratedSorting />
            <Table columnExtensions={tableColumnExtensions} />
            <TableColumnReordering order={columnOrder} onOrderChange={this.changeColumnOrder} />
            <TableHeaderRow showSortingControls />
            <Toolbar />
          </Grid>
        </GridItem>

        <GridItem style={{ justifyContent: 'flex-end', display: 'flex' }} md={12}>
          <TableFooter>
            <TableRow>
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
            </TableRow>
          </TableFooter>
        </GridItem>
        <Dialog
          saveSetting={column => this.saveSetting(column)}
          columns={columns}
          open={dialogStatus}
          onClose={() => this.setState({ dialogStatus: false })}
        />
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClosePop}
        >
          <MenuList>
            <MenuItem>Thêm mới sự kiện</MenuItem>
            <MenuItem>Gọi điện</MenuItem>
            <MenuItem>Họp</MenuItem>
            <MenuItem>Công việc mới</MenuItem>
          </MenuList>
        </Popover>
      </GridContainer>
    );
  }
}

export default Expenses;
