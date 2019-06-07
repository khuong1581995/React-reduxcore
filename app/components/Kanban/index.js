/**
 *
 * Kanban
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Board from 'react-trello';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import styles from './styles';
import CardKanban from '../CardKanban';
import NewCard from '../NewCard';
/* eslint-disable react/prefer-stateless-function */
const data = {
  lanes: [
    {
      id: '1',
      title: 'Công việc mới',
      label: '20/70',
      style: { width: 280, backgroundColor: '#2196F3', color: '#fff', boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.3)' },

      cards: [
        {
          id: 'Milk',
          title: 'Xây dựng đồ thị 1000 sao',
          time: 'today,5h20',
          action: ['sms', 'email', 'call'],
          description: 'Đô thị nghìn sao đẹp nhất',
        },
      ],
    },
    {
      id: '2',
      title: 'Đang xử lý',
      label: '10/20',
      style: { width: 280, backgroundColor: '#009688', color: '#fff', boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.3)' },
      cards: [
        {
          id: 'xetang',
          title: 'Dự án xe tăng nguyên tử',
          time: '5,December',
          action: ['call'],
          description: 'Đô thị nghìn sao đẹp nhất',
        },
      ],
    },
    {
      id: 'BLOCKED',
      title: 'Đã xử lý',
      label: '0/0',
      style: { width: 280, backgroundColor: '#388e3c', color: '#fff', boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.3)' },
      cards: [
        {
          id: 'xeti',
          title: 'Lời nói thật của một bác sĩ',
          time: '5,December',
          action: ['call'],
          description: 'Đô thị nghìn sao đẹp nhất',
        },
        {
          id: 'xeti2',
          title: 'vinfast',
          time: '5,December',
          action: ['call'],
          description: 'Đô thị nghìn sao đẹp nhất',
        },
      ],
    },
    {
      id: 'COMPLETED',
      title: 'Phát sinh',
      style: { width: 280, backgroundColor: '#ef6c00', color: '#fff', boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.3)' },
      label: '2/5',
      cards: [],
    },
  ],
};

class Kanban extends React.Component {
  onCardAdd = e => {
    console.log(e);
  };

  onCardDelete = e => {
    console.log(e);
  };

  onCardClick = (e, b) => {
    console.log(e, b);
  };

  onLaneAdd = e => {
    console.log(e);
  };

  onCardAdd = e => {
    console.log(e);
  };

  // const handleCardDelete = (cardId, laneId) => {
  //   console.log(`Card: ${cardId} deleted from lane: ${laneId}`)
  // }

  render() {
    // console.log(this.props);
    return (
      <div
        // className="App"
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '30px',
          // height: ,
        }}
      >
        <Board
          style={{ backgroundColor: '#EEEEEE' }}
          tagStyle={{ backgroundColor: 'red' }}
          data={data}
          draggable // cho phép kéo thả
          editable // cho phép chỉnh sửa
          // canAddLanes // cho phép thêm mới trạng thái
          customCardLayout
          onLaneAdd={this.onLaneAdd} // hàm thêm mới trạng thái
          onDataChange={data => console.log(data)} // dự liệu
          onCardDelete={this.onCardDelete} //
          onCardAdd={this.onCardAdd}
          onCardClick={this.onCardClick}
          addCardLink={<Button style={{ color: 'white', textTransform: 'none' }}>Thêm mới +</Button>}
          // addLaneTitle="Thêm mới trạng thái"
          newCardTemplate={<NewCard />}
        >
          <CardKanban />
        </Board>
      </div>
    );
  }
}

Kanban.propTypes = {};

export default withStyles(styles)(Kanban);
