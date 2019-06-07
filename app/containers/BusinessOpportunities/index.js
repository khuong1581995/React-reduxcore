import * as React from 'react';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/ItemGrid';
import Button from 'components/CustomButtons/Button';
import List from 'components/List';
// import { Fade, Collapse, Fab, Input, IconButton, InputBase, Button as ButtonUI } from '@material-ui/core';
import RegularCard from 'components/Cards/RegularCard';
// import { Settings, Edit, Delete, Message, Add, NavigateBefore, NavigateNext, Close, Search } from '@material-ui/icons';
import Kanban from '../../components/Kanban';
import Calendar from '../../components/Calendar';
import Report from '../../components/Report';
import Automation from '../../components/Automation';

class BusinessOpportunities extends React.Component {
  state = {
    tab: 5,
    size: 'sm',
    color: 'gradient',
    defaultColor: 'simple',
  };

  handleTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { tab, size, defaultColor, color } = this.state;
    const Bt = props => (
      <Button onClick={() => this.handleTab(props.tab)} {...props} color={props.tab === tab ? color : defaultColor} right round size={size}>
        {props.children}
      </Button>
    );

    return (
      <RegularCard
        content={
          <GridContainer>
            <GridItem md={12} sm={12}>
              <Bt tab={1}>Báo cáo</Bt>
              <Bt tab={2}>Lịch</Bt>
              <Bt tab={3}>Kaban</Bt>
              <Bt tab={4}>Danh sách</Bt>
              <Bt tab={5}>Automation rules</Bt>
            </GridItem>
            <GridItem md={12} sm={12}>
              {tab === 3 ? <Kanban /> : null}
              {tab === 4 ? <List /> : null}
              {tab === 2 ? <Calendar /> : null}
              {tab === 1 ? <Report /> : null}
              {tab === 5 ? <Automation /> : null}
            </GridItem>
          </GridContainer>
        }
      />
    );
  }
}

export default BusinessOpportunities;
