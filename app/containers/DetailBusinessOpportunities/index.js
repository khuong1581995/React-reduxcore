import React from 'react';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/ItemGrid';
import Button from 'components/CustomButtons/Button';

import {
  Paper,
  withStyles,
  Link,
  Typography,
  Fab as Fa,
  Badge,
  TablePagination,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Settings, Edit, Delete, Message, Add, Close, Email, PhoneInTalk, Forum } from '@material-ui/icons';

const Fab = props => <Fa size="small" {...props} style={{ margin: '5px' }} />;
class DetailBusinessOpportunities extends React.Component {
  render() {
    return (
      <GridContainer>
        <GridItem item md={6} />
        <GridItem item md={6}>
          <Fab>
            <PhoneInTalk />
          </Fab>
          <Fab>
            <Settings />
          </Fab>
          <Fab>
            <Forum />
          </Fab>
          <Fab color="primary">
            <Email />
          </Fab>
        </GridItem>
      </GridContainer>
    );
  }
}

export default DetailBusinessOpportunities;
