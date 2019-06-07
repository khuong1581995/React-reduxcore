/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
/**
 *
 * HocTable
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { SelectionState, PagingState, IntegratedPaging, IntegratedSelection, SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';

import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
  TableFixedColumns,
  PagingPanel,
  TableSelection,
  SearchPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Fab, IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import GridMUI from '@material-ui/core/Grid';
import { Add, Edit, Delete, Visibility } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import makeSelectHocTable from './selectors';
import reducer from './reducer';
import saga from './saga';
import { editViewConfigAction } from './actions';

export class HocTable extends React.Component {
  constructor(props) {
    super(props);
    const defaultOrderConvert = [];

    const viewConfigLocalStorage = JSON.parse(localStorage.getItem('viewConfig'));

    const tableViewConfig = viewConfigLocalStorage.find(d => d.path === this.props.path);
    // console.log(viewConfigLocalStorage);
    const tableViewConfigColumns = tableViewConfig.editDisplay.type.fields.type.columns;
    // console.log(tableViewConfigColumns);
    const columnsActive = [];
    tableViewConfigColumns.forEach(element => {
      if (element.checked) {
        columnsActive.push(element);
        defaultOrderConvert.push(element.name);
      }
    });
    this.state = {
      columns: columnsActive,
      rows: this.props.data,
      defaultOrder: defaultOrderConvert,
      selection: [],
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15, 0],
      open: false,
      newViewConfig: tableViewConfigColumns,
    };
    this.changeSelection = selection => this.setState({ selection });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
  }

  componentDidMount() {
    this.props.onRef(this);
    if (this.props.enableEdit) {
      const newColumns = [{ name: 'actions', title: 'Hành động' }, ...this.state.columns];

      this.setState({
        // rows: newRows,
        columns: newColumns,
        rightColumns: ['actions'],
        defaultOrder: this.state.defaultOrder.push('actions'),
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props !== this.props) {
      this.setState({ rows: props.data });
    }
  }

  callBack = (command, data) => {
    switch (command) {
      case 'edit-click':
        this.props.handleEditClick(data);
        break;
      case 'add-click':
        this.props.handleAddClick();
        break;
      case 'delete-click':
        this.props.handleDeleteClick(this.state.selection);
        break;
      case 'delete-success':
        this.setState({ selection: [] });
        break;
      default:
        break;
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChecked = index => {
    const newValue = this.state.newViewConfig;
    newValue[index].checked = !newValue[index].checked;
    this.setState({ newViewConfig: newValue });
  };

  resetSelection = () => {
    this.setState({ selection: [] });
  };

  handleUpdateViewConfig = () => {
    const viewConfigLocalStorage = JSON.parse(localStorage.getItem('viewConfig'));

    const currentIndex = viewConfigLocalStorage.indexOf(viewConfigLocalStorage.find(d => d.path === this.props.path));

    viewConfigLocalStorage[currentIndex].editDisplay.type.fields.type.columns = this.state.newViewConfig;
    localStorage.setItem('viewConfig', JSON.stringify(viewConfigLocalStorage));
    const columnsActive = [];
    this.state.newViewConfig.forEach(element => {
      if (element.checked) {
        columnsActive.push(element);
      }
    });
    columnsActive.push({ name: 'actions', title: 'Hành động' });
    this.setState({ columns: columnsActive, open: false });
    this.props.onEditViewConfig(viewConfigLocalStorage[currentIndex]);
  };

  render() {
    const { columns, selection, pageSizes, currentPage, pageSize, newViewConfig } = this.state;
    // const newRows = this.state.rows.map(item => ({
    //   ...item,
    //   actions: (
    //     <div>
    //       <IconButton
    //         onClick={() => {
    //           this.callBack('edit-click', item);
    //         }}
    //       >
    //         <Edit fontSize="small" />
    //       </IconButton>
    //     </div>
    //   ),
    // }));
    const newRows = this.state.rows.map(item => {
      this.props.customColumns.forEach(element => {
        const { component, columnName } = element;

        const indexComponent = component.findIndex(d => d.value === item[columnName]);

        if (indexComponent !== -1) {
          item[element.columnName] = (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              // style={customStyle}
              onClick={() => {
                // this.props.callBack(element.columnName, item );
                component[indexComponent].customFunction('114', '1414');
              }}
            >
              {component[indexComponent].code}
            </div>
          );
          // item[columnName] = component[indexComponent].code;
        }
      });
      // console.log(item);
      return {
        ...item,
        actions: (
          <div>
            <IconButton
              onClick={() => {
                this.callBack('edit-click', item);
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </div>
        ),
      };
    });

    return (
      <div>
        <Paper>
          <div className="text-right p-3">
            {selection.length > 0 ? <span className="float-left">Đã chọn: {selection.length}</span> : ''}

            {selection.length > 0 ? (
              <Fab
                onClick={() => {
                  this.callBack('delete-click');
                }}
                size="small"
                color="secondary"
              >
                <Delete />
              </Fab>
            ) : (
              <div>
                <Fab
                  className="mx-3"
                  onClick={() => {
                    this.callBack('add-click');
                  }}
                  size="small"
                  color="primary"
                  aria-label="Add"
                >
                  <Add />
                </Fab>
                <Fab
                  onClick={() => {
                    this.setState({
                      open: true,
                    });
                  }}
                  size="small"
                  color="primary"
                  aria-label="Add"
                >
                  <Visibility />
                </Fab>
              </div>
            )}
            <div className="clearfix" />
          </div>
          <Grid rows={newRows} columns={columns}>
            <SearchState defaultValue="Từ khóa" />
            <IntegratedFiltering />
            <SelectionState selection={selection} onSelectionChange={this.changeSelection} />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={this.changeCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={this.changePageSize}
            />
            <IntegratedPaging />
            <IntegratedSelection />
            <DragDropProvider />
            <Table />
            <TableHeaderRow />
            <TableColumnReordering defaultOrder={this.state.defaultOrder} />
            <TableSelection showSelectAll />
            {this.state.rightColumns ? <TableFixedColumns rightColumns={this.state.rightColumns} /> : null}
            <PagingPanel pageSizes={pageSizes} />
            <Toolbar />
            <SearchPanel />
          </Grid>
        </Paper>

        <Dialog maxWidth="md" fullWidth open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Cấu hình bảng</DialogTitle>
          <DialogContent>
            {newViewConfig.map((item, index) => (
              <GridMUI container alignItems="center">
                <GridMUI item sm={11}>
                  <TextField
                    onChange={event => {
                      this.state.newViewConfig[index].title = event.target.value;
                    }}
                    defaultValue={this.state.newViewConfig[index].title}
                    autoFocus
                    margin="dense"
                    id="name"
                    label={item.title}
                    variant="outlined"
                    fullWidth
                  />
                </GridMUI>
                <GridMUI item sm={1}>
                  <FormControlLabel
                    className="px-3"
                    control={
                      <Checkbox
                        checked={this.state.newViewConfig[index].checked}
                        onChange={() => {
                          this.handleChecked(index);
                        }}
                        value="checked"
                      />
                    }
                  />
                </GridMUI>
              </GridMUI>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Hủy
            </Button>
            <Button onClick={this.handleUpdateViewConfig} color="primary">
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

HocTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hocTable: makeSelectHocTable(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEditViewConfig: newViewConfig => {
      dispatch(editViewConfigAction(newViewConfig));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'hocTable', reducer });
const withSaga = injectSaga({ key: 'hocTable', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HocTable);
