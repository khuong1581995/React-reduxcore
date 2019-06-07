/**
 *
 * TabContainer
 *
 */

import React from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TabContainer(props) {
  return <Paper style={{ marginLeft: 20, width: '100%' }}>{props.children}</Paper>;
}

TabContainer.propTypes = {
  children: PropTypes.object,
};

export default TabContainer;
