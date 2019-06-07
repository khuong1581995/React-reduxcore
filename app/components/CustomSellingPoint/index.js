/**
 *
 * CustomSellingPoint
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LocationCity } from '@material-ui/icons';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */
class CustomSellingPoint extends React.Component {
  state = {
    places: [
      {
        title: 'Trụ sở chính',
        name: '1',
        props: {
          currentCount: 0,
          additionsInventory: '',
          orderLimit: '',
          address: '',
          changePrice: {
            status: false,
            costPrice: 0,
            price: 0,
          },
          changeDefaultTitle: {
            status: false,
            fields: [
              {
                title: 'Thuế 1',
              },
            ],
          },
        },
      },
      {
        title: 'Chi nhánh Sài Gòn',
        name: '2',
        props: {
          currentCount: 0,
          additionsInventory: '',
          orderLimit: '',
          address: '',
          changePrice: {
            status: false,
            costPrice: 0,
            price: 0,
          },
          changeDefaultTitle: {
            status: false,
            fields: [
              {
                title: 'Thuế 1',
              },
            ],
          },
        },
      },
      {
        title: 'Chi nhánh Đà Nắng',
        name: '3',
        props: {
          currentCount: 0,
          additionsInventory: '',
          orderLimit: '',
          address: '',
          changePrice: {
            status: false,
            costPrice: 0,
            price: 0,
          },
          changeDefaultTitle: {
            status: false,
            fields: [
              {
                title: 'Thuế 1',
              },
            ],
          },
        },
      },
    ],
  };

  handleChangeExpan = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleAddField = index => {
    const { places } = this.state;
    places[index].props.changeDefaultTitle.fields.push({ title: `Thuế ${places[index].props.changeDefaultTitle.fields.length + 1}` });
    this.setState({ places });
  };

  changeStatus = (index, name) => {
    const { places } = this.state;
    places[index].props[name].status = !places[index].props[name].status;
    this.setState({ places });
  };

  render() {
    const { classes } = this.props;
    const { places, expanded } = this.state;
    return (
      <div className={classes.expanDiv}>
        {places.map((place, index) => (
          <ExpansionPanel expanded={expanded === place.name} onChange={this.handleChangeExpan(place.name)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {' '}
              <LocationCity />
              {place.title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                <Grid md={6}>
                  <TextField
                    label="Số lượng hiện tại"
                    className={classes.textField}
                    // value={this.state.props.currentCount}
                    name="currentCount"
                    // onChange={this.handleChange('name')}
                    margin="normal"
                  />

                  <TextField
                    label="Thêm bớt hàng tồn kho"
                    className={classes.textField}
                    // value={this.state.props.currentCount}
                    name="additionsInventory"
                    // onChange={this.handleChange('name')}
                    margin="normal"
                  />
                  <TextField
                    label="Hạn mức đặt hàng"
                    className={classes.textField}
                    // value={this.state.props.currentCount}
                    name="orderLimit"
                    // onChange={this.handleChange('name')}
                    margin="normal"
                  />
                  <TextField
                    label="Địa điểm tại cửa hàng"
                    className={classes.textField}
                    // value={this.state.props.currentCount}
                    name="address"
                    // onChange={this.handleChange('name')}
                    margin="normal"
                  />
                </Grid>
                <Grid md={6}>
                  <FormGroup style={{ marginLeft: 40, marginTop: 40 }}>
                    <FormControlLabel
                      control={
                        <Checkbox color="primary" value={place.props.changePrice.status} onChange={() => this.changeStatus(index, 'changePrice')} />
                      }
                      label="Thay đổi giá"
                    />
                    <div hidden={!place.props.changePrice.status}>
                      <div>
                        <TextField
                          style={{ marginTop: 8 }}
                          label="Giá vốn (chưa bao gồm thuế)"
                          className={classes.textField}
                          // value={this.state.props.currentCount}
                          name="address"
                          // onChange={this.handleChange('name')}
                          margin="normal"
                        />
                        <TextField
                          label="Giá bán"
                          className={classes.textField}
                          // value={this.state.props.currentCount}
                          name="address"
                          // onChange={this.handleChange('name')}
                          margin="normal"
                        />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ marginTop: 44, width: 150 }}>Đại lý cấp 1 </span>
                        <FormControl className={classes.formControl} style={{ marginTop: 32, width: 250 }}>
                          <Select>
                            <MenuItem selected value={10}>
                              Giá không thay đổi
                            </MenuItem>
                            <MenuItem value={20}>Chọn %</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField label="Giá bán" style={{ marginTop: 16 }} className={classes.textField} margin="normal" />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ marginTop: 44, width: 150 }}>Đại lý cấp 1 </span>
                        <FormControl className={classes.formControl} style={{ marginTop: 32, width: 250 }}>
                          <Select>
                            <MenuItem selected value={10}>
                              Giá không thay đổi
                            </MenuItem>
                            <MenuItem value={20}>Chọn %</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField label="Giá bán" style={{ marginTop: 16 }} className={classes.textField} margin="normal" />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ marginTop: 44, width: 150 }}>Đại lý cấp 1 </span>
                        <FormControl className={classes.formControl} style={{ marginTop: 32, width: 250 }}>
                          <Select>
                            <MenuItem selected value={10}>
                              Giá không thay đổi
                            </MenuItem>
                            <MenuItem value={20}>Chọn %</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField label="Giá bán" style={{ marginTop: 16 }} className={classes.textField} margin="normal" />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ marginTop: 44, width: 150 }}>Đại lý cấp 1 </span>
                        <FormControl className={classes.formControl} style={{ marginTop: 32, width: 250 }}>
                          <Select>
                            <MenuItem selected value={10}>
                              Giá không thay đổi
                            </MenuItem>
                            <MenuItem value={20}>Chọn %</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField label="Giá bán" style={{ marginTop: 16 }} className={classes.textField} margin="normal" />
                      </div>
                      <div>
                        <TextField
                          label="Giá khuyến mại"
                          className={classes.textField}
                          // value={this.state.props.currentCount}
                          name="address"
                          // onChange={this.handleChange('name')}
                          margin="normal"
                        />
                        <TextField
                          label="Ngày kết thúc"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className={classes.textField}
                          // value={this.state.props.currentCount}
                          name="address"
                          // onChange={this.handleChange('name')}
                          margin="normal"
                        />
                        <TextField
                          label="Ngày bắt đầu giảm giá"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className={classes.textField}
                          // value={this.state.props.currentCount}
                          name="address"
                          // onChange={this.handleChange('name')}
                          margin="normal"
                        />
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup style={{ marginLeft: 40 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={place.props.changeDefaultTitle.status}
                          onChange={() => this.changeStatus(index, 'changeDefaultTitle')}
                          color="primary"
                        />
                      }
                      label="Thay tiêu đề mặc định"
                    />
                    <div hidden={!place.props.changeDefaultTitle.status}>
                      {place.props.changeDefaultTitle.fields.map(item => (
                        <div style={{ display: 'flex' }}>
                          <span style={{ marginTop: 44, width: 150 }}>{item.title} </span>

                          <TextField label="Tên thuế" style={{ marginTop: 16 }} className={classes.textField} margin="normal" />
                          <TextField label="%" style={{ marginTop: 16 }} className={classes.textField} margin="normal" />
                        </div>
                      ))}
                      <Button size="small" style={{ float: 'left' }} onClick={() => this.handleAddField(index)} variant="contained" color="primary">
                        Thêm trường
                      </Button>
                    </div>
                  </FormGroup>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

CustomSellingPoint.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CustomSellingPoint);
