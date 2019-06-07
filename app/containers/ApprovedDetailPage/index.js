/**
 *
 * ApprovedDetailPage
 *
 */

import React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { TextField, withStyles, Chip, Typography, MenuItem } from '@material-ui/core';
import { Cancel as CancelIcon } from '@material-ui/icons';
import Select from 'react-select';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectApprovedDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import DndUser from '../../components/DndUser';

/* eslint-disable react/prefer-stateless-function */

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },

  menu: {
    width: 200,
  },

  input: {
    display: 'flex',
    padding: 8,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const options = [
  { value: '1', label: 'Nguyễn Văn Minh' },
  { value: '2', label: 'Nguyễn Văn Nam' },
  { value: '3', label: 'Trần Thị Thanh' },
  { value: '4', label: 'Hoàng Văn Cường' },
  { value: '5', label: 'Nguyễn Tiến Huy' },
  { value: '6', label: 'Nguyễn Thị Mai' },
  { value: '7', label: 'Hoàng Văn Hùng' },
  { value: '8', label: 'Nguyễn Văn Tuân' },
  { value: '9', label: 'Trần Văn Nam' },
  { value: '10', label: 'Trần Thị Thơm' },
  { value: '11', label: 'Nguyễn Văn Cường' },
  { value: '12', label: 'Nguyễn Tiến Dũng' },
  { value: '13', label: 'Phạm Thu Thủy' },
  { value: '14', label: 'Đặng Văn Tùng' },
];

const currencies = [
  {
    value: 2,
    label: 'Chuyển kho',
  },
  {
    value: 3,
    label: 'Báo giá',
  },
  {
    value: 4,
    label: 'Tính giá',
  },
];

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      label="Danh sách nhân viên trong nhóm"
      style={{ margin: 8 }}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

// Không có giá trị phù hợp
function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

// Danh sách
function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

const components = { MultiValue, Control, NoOptionsMessage, Option };

class ApprovedDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 0,
      multi: null,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeName = value => {
    this.setState({
      multi: value,
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <TextField id="outlined-full-width" label="Tên nhóm" style={{ margin: 8 }} fullWidth variant="outlined" />
        <TextField
          fullWidth
          id="outlined-select-currency"
          select
          label="Công đoạn"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant="outlined"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Select
          classes={classes}
          styles={selectStyles}
          value={this.state.multi}
          onChange={this.handleChangeName}
          isMulti
          components={components}
          options={options}
        />
        <DndUser />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  approvedDetailPage: makeSelectApprovedDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'approvedDetailPage', reducer });
const withSaga = injectSaga({ key: 'approvedDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles, { withTheme: true }),
)(ApprovedDetailPage);
