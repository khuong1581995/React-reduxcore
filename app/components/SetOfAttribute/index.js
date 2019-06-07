/**
 *
 * SetOfAttribute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  withStyles,
  Input,
  TextField,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import messages from './messages';
import styles from './styles';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
/* eslint-disable react/prefer-stateless-function */
class SetOfAttribute extends React.Component {
  state = {
    attribute: null,
    listAttribute: [
      {
        title: 'Rem kéo, vải khổ rộng',
        value: 1,
      },
      {
        title: 'Rem Roman, vả khổ rộng',
        value: 2,
      },
    ],
    expanded: false,
    detail: [
      {
        name: 'a',
        title: 'Nhập dữ liệu',
        controls: [
          {
            title: 'Chiều rộng của cửa',
            type: 'text',
          },
          {
            title: 'Chiều rộng cửa',
            type: 'text',
          },
          {
            title: 'Chiều cao cửa',
            type: 'text',
          },
          {
            title: 'Chiều cao cửa',
            type: 'text',
          },
          {
            title: 'Chiều cao cửa',
            type: 'text',
          },
        ],
      },
      {
        name: 'b',
        title: 'Tính hoàn thiện',
      },
      {
        name: 'c',
        title: 'Kết quả tính giá',
      },
      {
        name: 'd',
        title: 'Kết quả tính giá',
      },
    ],
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeExpan = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        <FormControl className={classNames(classes.textField, classes.selectBox)}>
          <InputLabel htmlFor="age-simple" style={{ marginLeft: 7 }}>
            Chọn bộ thuộc tính
          </InputLabel>
          <Select
            name="attribute"
            style={{ marginLeft: 0 }}
            value={this.state.attribute}
            onChange={this.handleChangeInput}
            className={classes.textField}
            input={<Input id="select-multiple-checkbox" />}
            MenuProps={MenuProps}
          >
            {this.state.listAttribute.map(item => (
              <MenuItem value={item.value}>
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
            <MenuItem value="Dày dép">
              <ListItemText primary="Dày dép" />
            </MenuItem>
            <MenuItem value="Quần áo">
              <ListItemText primary="Quần áo" />
            </MenuItem>
            <MenuItem value="Cặp sách">
              <ListItemText primary="Cặp sách" />
            </MenuItem>
          </Select>
        </FormControl>
        <div className={classes.expanDiv} hidden={!this.state.attribute}>
          {this.state.detail.map(item => (
            <ExpansionPanel expanded={expanded === item.name} onChange={this.handleChangeExpan(item.name)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{item.title}</ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  {item.controls &&
                    item.controls.map(control => (
                      <Grid md={4}>
                        <TextField
                          label={control.title}
                          className={classes.textFieldControl}
                          // value={this.state.name}
                          // onChange={this.handleChange('name')}
                          margin="normal"
                        />
                      </Grid>
                    ))}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      </div>
    );
  }
}

SetOfAttribute.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SetOfAttribute);
