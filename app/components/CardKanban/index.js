/**
 *
 * CardKanban
 *
 */

import React from 'react';
import { Email, Call, Message } from '@material-ui/icons';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const CardKanban = props => {
  console.log(props);
  return (
    <div style={{ padding: 6, color: 'black', borderLeft: '3px solid #2196F3' }}>
      <header
        style={{
          borderBottom: '1px solid #eee',
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: props.cardColor,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.title}</div>
      </header>
      <div style={{ fontSize: 12, color: 'grey', display: 'flex' }}>
        <div style={{ width: '90%' }}>
          <p style={{ textAlign: 'left' }}>{props.description}</p>
          <p style={{ position: 'absolute', bottom: 0 }}>
            Activities <i style={{ background: 'red', color: 'white', borderRadius: '50%', padding: '3px 7px' }}>{props.action.length}</i>
          </p>
        </div>
        <div style={{ width: '10%' }}>
          <Email color={props.action.includes('email') ? 'primary' : ''} />
          <Call color={props.action.includes('call') ? 'primary' : ''} />
          <Message color={props.action.includes('sms') ? 'primary' : ''} />
        </div>
      </div>
    </div>
  );
};
CardKanban.propTypes = {
  cardColor: PropTypes.any,
  description: PropTypes.string,
  includes: PropTypes.func,
  action: PropTypes.array,
  title: PropTypes.string,
};

export default CardKanban;
