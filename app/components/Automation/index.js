import React, { Component } from 'react';
import { Grid, withStyles, Popover, MenuItem as MenuItemUI, MenuList, Button, List, ListItem as ListItemUI } from '@material-ui/core';
import { Add, Help } from '@material-ui/icons';
import PropTypes from 'prop-types';

const style = {
  button: {
    margin: '5px',
  },
  saveForm: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px',
  },
};
const Step = props => (
  <Grid md={3} item>
    <div style={{ background: props.color, padding: '10px', margin: '3px', textAlign: 'center', borderRadius: '3px' }}>{props.children}</div>
  </Grid>
);

const ListItem = props => <ListItemUI {...props} style={{ flexDirection: 'column', alignItems: 'flex-start' }} />;

class Automation extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, form: 1, snackbar: false, message: '' };
  }

  handleClose = () => this.setState({ anchorEl: null });

  handleTrigger(e) {
    this.setState({ anchorEl: e.currentTarget, form: 1 });
  }

  AddItem = () => (
    <span onClick={e => this.handleTrigger(e)}>
      <Add />
      add
    </span>
  );

  AddAutomation = () => (
    <span onClick={e => this.handleAutomationr(e)}>
      <Add />
      add
    </span>
  );

  handleAutomationr(e) {
    this.setState({ anchorEl: e.currentTarget, form: 0 });
  }

  // Thông báo
  openSnackbar = message => {
    this.setState({ snackbar: true, message });
  };

  render() {
    const { anchorEl, form, snackbar, message } = this.state;
    const { classes } = this.props;
    const MenuItem = props => <MenuItemUI {...props} onClick={() => this.openSnackbar(props.children)} />;
    return (
      <div>
        <Grid style={{ marginTop: '20px' }} container>
          <Step color="#2074f7"> Unassigned </Step>
          <Step color="#2196F3"> In Progress </Step>
          <Step color="#8BC34A">Good lead </Step>
          <Step color="#F44336"> Junk Lead </Step>
        </Grid>

        <h4>
          Trigger <Help />
        </h4>

        <Grid container>
          <Grid item md={3}>
            {this.AddItem()}
          </Grid>
          <Grid item md={3}>
            {this.AddItem()}
          </Grid>
          <Grid item md={3}>
            {this.AddItem()}
          </Grid>
          <Grid item md={3}>
            {this.AddItem()}
          </Grid>
        </Grid>

        <h4>
          Automation rules <Help />
        </h4>

        <Grid container>
          <Grid item md={3}>
            <List>
              <ListItem>
                <a>in 1 hour by condition</a>
                <h4>Send SMS to client</h4>
              </ListItem>
              <ListItem>
                <a>Automatically</a>
              </ListItem>
              <ListItem>
                <span>immediately</span>
                <h4>Notification</h4>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3}>
            <List>
              <ListItem>
                {this.AddAutomation()}
                <h4>Send SMS to client</h4>
              </ListItem>
              <ListItem>
                <a>Automatically</a>
              </ListItem>
              <ListItem>
                <a>In 3 days</a>
                <h4>Control</h4>
              </ListItem>
            </List>
          </Grid>

          <Grid item md={3}>
            <List>
              <ListItem>{this.AddAutomation()}</ListItem>
            </List>
          </Grid>
          <Grid item md={3}>
            <List>
              <ListItem>{this.AddAutomation()}</ListItem>
              <ListItem>
                <a>immediately</a>
                <h4>Notification</h4>
              </ListItem>
            </List>
          </Grid>
        </Grid>
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
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
        >
          {form ? (
            <MenuList>
              <MenuItem> Incomming e-mail</MenuItem>
              <MenuItem>Incomming call</MenuItem>
              <MenuItem>CRM form submission</MenuItem>
              <MenuItem>Webhook</MenuItem>
              <MenuItem>Visit</MenuItem>
              <MenuItem>Visistor return</MenuItem>
              <MenuItem>Incomming message to Open Channel</MenuItem>
              <MenuItem>App trigger</MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem>Incomming e-mail</MenuItem>
              <MenuItem>Incomming call</MenuItem>
              <MenuItem>CRM form submission</MenuItem>
              <MenuItem>Webhook</MenuItem>
            </MenuList>
          )}
        </Popover>
        <Grid container>
          <Grid item md={3} />
          <Grid className={classes.saveForm} item md={6}>
            <Button className={classes.button} color="primary" variant="contained">
              Save
            </Button>
            <Button className={classes.button} color="secondary" variant="contained">
              Cancel
            </Button>
          </Grid>
          <Grid item md={3} />
        </Grid>
      </div>
    );
  }
}

Step.PropTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default withStyles(style)(Automation);
