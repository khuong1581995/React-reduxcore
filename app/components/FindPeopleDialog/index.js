/**
 *
 * FindPeopleDialog
 *
 */

import React from 'react';
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Avatar,
} from '@material-ui/core';

import SearchBar from 'material-ui-search-bar';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
// import PropTypes from 'prop-types';

// import styled from 'styled-components';

const people = [
  {
    avatar: '',
    name: 'IT Department',
  },
  {
    avatar: '',
    name: 'Marketing Department',
  },
  {
    avatar: '',
    name: 'Thắng Department',
  },
];
/* eslint-disable react/prefer-stateless-function */
@observer
class FindPeopleDialog extends React.Component {
  @observable
  fakepeople = people;

  @observable
  selectedPeople;

  render() {
    return (
      <div>
        <Dialog open={this.props.isOpeningFindPeopleDialog} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
          <DialogTitle id="form-dialog-title">Tìm người thay thế</DialogTitle>
          <DialogContent>
            <SearchBar
              style={{
                margin: '0 auto',
              }}
            />
            <List>
              <Grid container>
                {this.fakepeople.map(option => (
                  <Grid key={option.name} item sm={4}>
                    <ListItem
                      button
                      onClick={() => {
                        this.selectedPeople = option;
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp">
                          <i className="far fa-user" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={option.name} />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              className="border-danger text-danger"
              onClick={() => {
                this.props.callBack('CANCELFINDPEOPLE', null);
              }}
            >
              Hủy
            </Button>
            <Button
              variant="outlined"
              className="border-success text-success"
              onClick={() => {
                this.props.callBack('CLOSEFINDPEOPLE', this.selectedPeople);
              }}
            >
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FindPeopleDialog.propTypes = {};

export default FindPeopleDialog;
