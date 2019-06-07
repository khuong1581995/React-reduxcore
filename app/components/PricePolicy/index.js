/**
 *
 * PricePolicy
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { TextField, withStyles, FormControl, Select, MenuItem } from '@material-ui/core';
import styles from './styles';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class PricePolicy extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          label="Giá vốn chưa bao gồm thuế"
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Tỉ lệ lợi nhuận"
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Giá bán"
          className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <div />
        {/* <Grid container>
          <Grid md={2} style={{ marginTop: 47 }}>
            <span style={{ marginTop: 47 }}>Đại lý cấp 1 </span>
          </Grid>
          <Grid md={4}>
            <FormControl className={classes.formControl}>
              <Select

              // value={this.state.age}
              // onChange={this.handleChange}
              // inputProps={{
              //   name: 'age',
              //   id: 'age-simple',
              // }}
              >
                <MenuItem selected value={10}>
                  Giá không thay đổi
                </MenuItem>
                <MenuItem value={20}>Chọn %</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid md={6}>
            <TextField
              label="Giá bán"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
          </Grid>
        </Grid> */}
        <div style={{ display: 'flex' }}>
          <span style={{ marginTop: 65, width: 150 }}>Đại lý cấp 1 </span>
          <FormControl className={classes.formControl} style={{ marginTop: 53, width: 250 }}>
            <Select

            // value={this.state.age}
            // onChange={this.handleChange}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            >
              <MenuItem selected value={10}>
                Giá không thay đổi
              </MenuItem>
              <MenuItem value={20}>Chọn %</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Giá bán"
            className={classes.textField}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
            margin="normal"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ marginTop: 65, width: 150 }}>Đại lý cấp 2 </span>
          <FormControl className={classes.formControl} style={{ marginTop: 53, width: 250 }}>
            <Select

            // value={this.state.age}
            // onChange={this.handleChange}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            >
              <MenuItem selected value={10}>
                Giá không thay đổi
              </MenuItem>
              <MenuItem value={20}>Chọn %</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Giá bán"
            className={classes.textField}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
            margin="normal"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ marginTop: 65, width: 150 }}>Đại lý cấp 3 </span>
          <FormControl className={classes.formControl} style={{ marginTop: 53, width: 250 }}>
            <Select

            // value={this.state.age}
            // onChange={this.handleChange}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            >
              <MenuItem selected value={10}>
                Giá không thay đổi
              </MenuItem>
              <MenuItem value={20}>Chọn %</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Giá bán"
            className={classes.textField}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
            margin="normal"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ marginTop: 65, width: 150 }}>Khách lẻ </span>
          <FormControl className={classes.formControl} style={{ marginTop: 53, width: 250 }}>
            <Select

            // value={this.state.age}
            // onChange={this.handleChange}
            // inputProps={{
            //   name: 'age',
            //   id: 'age-simple',
            // }}
            >
              <MenuItem selected value={10}>
                Giá không thay đổi
              </MenuItem>
              <MenuItem value={20}>Chọn %</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Giá bán"
            className={classes.textField}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
            margin="normal"
          />
        </div>
      </div>
    );
  }
}

PricePolicy.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(PricePolicy);
