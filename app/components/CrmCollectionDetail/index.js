/**
 *
 * CrmCollectionDetail
 *
 */

import React from 'react';
import {
  Table,
  Paper,
  TableCell,
  TableRow,
  TableBody,
  withStyles,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  TableHead,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import styles from './styles';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
function getStyles() {
  return {
    // fontWeight: that.state.name.indexOf(name) === -1 ? that.props.theme.typography.fontWeightRegular : that.props.theme.typography.fontWeightMedium,
  };
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/* eslint-disable react/prefer-stateless-function */
class CrmCollectionDetail extends React.Component {
  state = {
    name: '',
    code: '',
    nameFild: '',
    type: 'String',
    openDialog: false,
    itemPlugin: [],
    plugins: [
      { name: 'Automation rules', code: 'PL_SERVICES_AUTOMATION' },
      { name: 'Danh sách', code: 'PL_VIEW_LIST' },
      { name: 'Kanban', code: 'PL_VIEW_KANBAN' },
      { name: 'Lịch', code: 'PL_WIDGET_CALENDAR' },
      { name: 'Báo cáo', code: 'PL_VIEW_REPORT' },
    ],
    collectionSchema: [],
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state.itemPlugin);
    const { collectionSchema, plugins } = this.state;
    const { classes } = this.props;
    return (
      <div style={{ marginTop: 100 }}>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
              <Close />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Bộ CRM
            </Typography>
            {/* <Button color="inherit" onClick={this.handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <div>
          <Paper
            className={classnames(classes.paper, classes.productBlock)}
            // style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}
          >
            <TextField
              id="outlined-name"
              label="Tên Bộ CRM"
              className={classes.textField}
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Mã"
              className={classes.textField}
              value={this.state.code}
              name="code"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <FormControl className={classes.formControl} style={{ width: '90%', marginLeft: 35 }}>
              <InputLabel htmlFor="select-multiple-chip">Plugins</InputLabel>
              <Select
                multiple
                value={this.state.itemPlugin}
                onChange={this.handleChange}
                name="itemPlugin"
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {plugins.map(item => (
                  <MenuItem key={item.code} value={item.name} style={getStyles(item.name, this)}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          <Paper className={classes.paper}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, height: 30 }}>
              <h4 className={classes.titleTable}>Trường dữ liệu</h4>
              <Button onClick={this.handleClose} size="small" variant="contained" color="primary" style={{ marginRight: 10 }}>
                Thêm mới
              </Button>
            </div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Tên trường</TableCell>
                  <TableCell component="th" align="right">
                    Kiểu dữ liệu
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collectionSchema.map(row => (
                  <TableRow key={Object.keys(row)[0]}>
                    <TableCell scope="row">{Object.keys(row)[0]}</TableCell>
                    <TableCell align="right">{Object.values(row)[0]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Button className={classes.button} onClick={this.handleAddNewCollection} variant="contained" color="primary">
            Lưu
          </Button>
          <Button className={classes.button} onClick={this.props.onClose} variant="contained" color="default" autoFocus>
            Hủy bỏ
          </Button>
        </div>
        <Dialog open={this.state.openDialog} onClose={this.handleClose}>
          <DialogTitle id="alert-dialog-title">Thêm mới trường</DialogTitle>
          <DialogContent style={{ width: 600 }}>
            <TextField
              id="outlined-name"
              label="Tên trường"
              className={classes.textField}
              value={this.state.nameFild}
              name="nameFild"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <FormControl variant="outlined" className={classes.textField}>
              <Select
                value={this.state.type}
                onChange={this.handleChange}
                name="type"
                input={<OutlinedInput labelWidth={this.state.labelWidth} name="age" id="outlined-age-simple" />}
              >
                <MenuItem value="String">String</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="Boolean">Boolean</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddFiled} variant="contained" color="primary">
              Thêm mới
            </Button>
            <Button onClick={this.handleClose} variant="contained" color="default" autoFocus>
              Hủy bỏ
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handleClose = () => {
    const { openDialog } = this.state;
    this.setState({ openDialog: !openDialog });
  };

  handleAddFiled = () => {
    const { collectionSchema, nameFild, type } = this.state;
    if (nameFild !== '') {
      collectionSchema.push({
        [nameFild]: type,
      });
      this.setState({ openDialog: false, nameFild: '' });
    }
  };

  handleAddNewCollection = () => {
    const { itemPlugin } = this.state;
    const plugins = [];
    let collectionSchema = {};
    this.state.collectionSchema.forEach(item => {
      collectionSchema = {
        ...collectionSchema,
        ...item,
      };
    });
    this.state.plugins.forEach(item => {
      itemPlugin.forEach(name => {
        if (name === item.name) {
          plugins.push(item);
        }
      });
    });
    this.props.addNewCollection({
      name: this.state.name,
      code: this.state.code,
      collectionSchema,
      plugins,
    });
  };
}

CrmCollectionDetail.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  addNewCollection: PropTypes.func,
};

export default withStyles(styles)(CrmCollectionDetail);
