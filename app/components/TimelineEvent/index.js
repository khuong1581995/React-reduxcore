/**
 *
 * TimelineEvent
 *
 */

import React from 'react';
import { Divider, TextField, Tab, Tabs, Typography, Chip, Grid } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { DropzoneArea } from 'material-ui-dropzone';

import MomentUtils from '@date-io/moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { Timeline, TimelineEvent } from 'react-event-timeline';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Email from '../Email';

/* eslint-disable react/prefer-stateless-function */

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  customTab: {
    minWidth: 0,
    '& span': {
      padding: 2.5,
    },
  },
});
@observer
class TimelineEventComponent extends React.Component {
  @observable
  meeting = {
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    subject: '',
    place: '',
    participants: [],
    description: '',
    deals: [],
  };

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangeSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentDidUpdate() {
    this.swipeableActions.updateHeight();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Timeline style={{ paddingTop: 0 }}>
          <TimelineEvent
            iconColor="white"
            icon={this.state.value === 0 ? <i className="fas fa-comment-alt  fa-lg" /> : <i className="fas fa-handshake fa-lg" />}
            bubbleStyle={{ backgroundColor: '#63ace5', borderColor: '#63ace5' }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab className={classes.customTab} label="Bình luận" />

              <Tab className={classes.customTab} label="Nhắc lịch" />
              <Tab className={classes.customTab} label="Gọi điện" />
              <Tab className={classes.customTab} label="SMS" />
              <Tab className={classes.customTab} label="Email" />
              <Tab className={classes.customTab} label="Tạo công việc" />
              <Tab className={classes.customTab} label="Lịch họp" />
              <Tab className={classes.customTab} label="Thăm doanh nghiệp" />
            </Tabs>
            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
              action={actions => {
                this.swipeableActions = actions;
              }}
              animateHeight
            >
              <TabContainer>Để lại bình luận</TabContainer>
              <TabContainer>Item 1</TabContainer>
              <TabContainer>Item Two</TabContainer>
              <TabContainer>Item Three</TabContainer>
              <TabContainer>
                <Email />
              </TabContainer>
              <TabContainer>Item Two</TabContainer>

              <TabContainer>
                <p className="">Thời gian</p>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <Grid container>
                    <Grid item sm={4}>
                      <DatePicker
                        variant="outlined"
                        keyboard
                        className="mx-3 my-0"
                        margin="normal"
                        label="Ngày họp"
                        value={this.meeting.date}
                        onChange={event => {
                          this.meeting.date = event;
                        }}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <TimePicker
                        variant="outlined"
                        keyboard
                        keyboardIcon={<i className="far fa-clock fa-xs" />}
                        className="picker mx-3"
                        label="Thời gian bắt đầu"
                        value={this.meeting.startTime}
                        onChange={event => {
                          this.meeting.startTime = event;
                        }}
                        disableOpenOnEnter
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <TimePicker
                        variant="outlined"
                        keyboard
                        className="picker mx-3"
                        label="Thời gian kết thúc"
                        value={this.meeting.endTimeTime}
                        onChange={event => {
                          this.meeting.endTime = event;
                        }}
                        disableOpenOnEnter
                        keyboardIcon={<i className="far fa-clock fa-xs" />}
                      />
                    </Grid>
                    <Grid item sm={6} className="my-3 px-3">
                      <TextField
                        fullWidth
                        id="outlined-name"
                        label="Tiêu đề buổi họp"
                        className=""
                        value={this.meeting.subject}
                        onChange={event => {
                          this.meeting.subject = event.target.value;
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item sm={6} className="my-3 px-3">
                      <TextField
                        fullWidth
                        id="outlined-name"
                        label="Địa điểm"
                        className=""
                        value={this.meeting.place}
                        onChange={event => {
                          this.meeting.place = event.target.value;
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item sm={12} className="my-3 px-3">
                      <ChipInput
                        label="Thành phần tham gia"
                        placeholder="Thành phần tham gia"
                        variant="outlined"
                        fullWidth
                        value={this.meeting.participants}
                      />
                    </Grid>
                    <Grid item sm={12} className="my-3 px-3">
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Mô tả"
                        multiline
                        rows="4"
                        value={this.state.description}
                        onChange={event => {
                          this.meeting.description = event.target.value;
                        }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item sm={12} className="my-3 px-3">
                      <DropzoneArea filesLimit={12} showFileNamesInPreview showAlerts={false} />
                    </Grid>
                    <Grid item sm={12} className="my-3 px-3">
                      <ChipInput label="Deal" placeholder="Deal" variant="outlined" fullWidth value={this.meeting.deals} />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              </TabContainer>
              <TabContainer>Item Two</TabContainer>
            </SwipeableViews>
          </TimelineEvent>
          <TimelineEvent
            iconColor="white"
            icon={<i className="far fa-comment-alt  fa-lg" />}
            bubbleStyle={{ backgroundColor: '#7bc043', borderColor: '#7bc043' }}
          >
            Like we talked, you said that you would share the shipment details? This is an urgent order and so I am losing patience. Can you expedite
            the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!
          </TimelineEvent>
        </Timeline>
        <div className="dividerContainer">
          <div className="timelineTitle">
            <Chip style={{ background: '#7bc043', color: 'white' }} label="Planned" className={classes.chip} />
          </div>
          <Divider />
        </div>
        <Timeline style={{ paddingTop: 20 }}>
          <TimelineEvent
            iconColor="white"
            icon={<i className="far fa-check-square  fa-lg" />}
            bubbleStyle={{ backgroundColor: '#7bc043', borderColor: '#7bc043' }}
          >
            Like we talked, you said that you would share the shipment details? This is an urgent order and so I am losing patience. Can you expedite
            the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!
          </TimelineEvent>
          <TimelineEvent
            iconColor="white"
            icon={<i className="far fa-check-square fa-lg" />}
            bubbleStyle={{ backgroundColor: '#7bc043', borderColor: '#7bc043' }}
          >
            Like we talked, you said that you would share the shipment details? This is an urgent order and so I am losing patience. Can you expedite
            the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!
          </TimelineEvent>
        </Timeline>
      </div>
    );
  }
}

TimelineEvent.propTypes = {
  //   classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TimelineEventComponent);
