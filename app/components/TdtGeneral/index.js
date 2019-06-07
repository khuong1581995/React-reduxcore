/**
 *
 * TdtGeneral
 *
 */

import React from 'react';

import {
  Paper,
  Divider,
  TextField,
  IconButton,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  Checkbox,
  Input,
  InputLabel,
  Radio,
  Menu,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Avatar,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers';
import { DropzoneArea } from 'material-ui-dropzone';
import SearchBar from 'material-ui-search-bar';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './styles.css';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import TimelineComponent from '../TimelineEvent';

import FindPeopleDialog from '../FindPeopleDialog';
import EmployeeDetailDialog from '../EmployeesDetailDialog';
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
  //   dir: PropTypes.string.isRequired,
};
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
const fieldType = [
  {
    value: 0,
    label: 'Văn bản',
  },
  {
    value: 1,
    label: 'Tiền tệ',
  },
  {
    value: 2,
    label: 'List',
  },

  {
    value: 3,
    label: 'Ngày tháng',
  },
  {
    value: 4,
    label: 'Số',
  },

  {
    value: 5,
    label: 'Link',
  },
  {
    value: 6,
    label: 'File',
  },

  {
    value: 7,
    label: 'Có / Không',
  },
  {
    value: 8,
    label: 'Nhân lực',
  },
];
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
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
const fakedata = [
  {
    title: 'Thông tin trao đổi thỏa thuận',
    children: [
      { title: 'Ttext', content: 'Đang xử lý', type: 0 },
      { title: 'Tiền tệ', value: '20000', type: 1, currency: 'BTC' },
      {
        title: 'List',
        children: ['Oliver Hansen', 'Van Henry'],
        type: 2,
      },
      {
        datetime: '2019-04-02T10:23:00+07:00',
        title: 'Ngày tháng',
        type: 3,
      },
      {
        content: 5,
        title: 'Số',
        type: 4,
      },
      {
        link: 'google.com',
        title: 'Link',
        type: 5,
      },
      {
        radio: 'no',
        title: 'Yes No',
        type: 7,
      },
      {
        people: {
          name: 'Người têst',
          avatar: '',
        },
        title: 'người',
        type: 8,
      },
    ],
    isEditing: false,
  },
  {
    title: 'Thêm',
    isEditing: false,
    children: [
      { title: 'Trạng thái', content: 'Đang xử lý', type: 0 },
      { title: 'Dự kiến ngân sách', content: '$ 0', type: 0 },

      { title: 'Trạng', content: 'Đangd', type: 0 },
    ],
  },
];
const uniqeFields = [
  {
    fieldName: 'Nguồn ngân sách',
    type: 0,
  },
  {
    fieldName: 'ID',
    type: 0,
  },
  {
    fieldName: 'Tiêu đề',
    type: 0,
  },
  {
    fieldName: 'Ngân sách',
    type: 1,
  },
  {
    fieldName: 'Khách hàng',
    type: 2,
  },
  {
    fieldName: 'Trạng thái',
    type: 7,
  },
  {
    fieldName: 'Nguồn thông tin',
    type: 0,
  },
  {
    fieldName: 'Ghi chú',
    type: 0,
  },
  {
    fieldName: 'Người phụ trách',
    type: 8,
  },
  {
    fieldName: 'UTM parameters',
    type: 0,
  },
  {
    fieldName: 'Trạng thái thông tin',
    type: 7,
  },
  {
    fieldName: 'Nguồn',
    type: 0,
  },
  {
    fieldName: 'Hiển thị tất cả mọi người',
    type: 7,
  },
  {
    fieldName: 'Sản phẩm',
    type: 2,
  },
  {
    fieldName: 'Người theo dõi',
    type: 8,
  },
];
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
@observer
class TdtGeneral extends React.Component {
  @observable
  isOpeningEmloyeeDialog = false;

  @observable
  isOpeningFindPeopleDialog = false;

  @observable
  peoplefake = people;

  @observable
  data = fakedata;

  @observable
  fakeUniqueMenu = uniqeFields;

  @observable
  isEditing = false;

  @observable
  isAddingSection = false;

  @observable
  newSectionTitle = '';

  @observable
  isAddingField = false;

  @observable
  newFieldName = '';

  @observable
  isOpenUniqueMenu = false;

  @observable
  defaultCurrency = 'USD';

  @observable
  newFieldData = {};

  @observable
  newFieldType = -1;

  @observable
  currentSectionIndex = 0;

  @observable
  isAddingUniqueField = false;

  @observable
  datafake = [{ product: 'Sản phẩm 1', unit: 300000, qty: 2, countType: 1 }, { product: 'Sản phẩm 2', unit: 200000, qty: 1, countType: 3 }];

  constructor(props) {
    super(props);

    this.general = React.createRef();
  }

  /* eslint-disable no-unused-vars */
  callBack = (command, data) => {
    switch (command) {
      case 'CANCELFINDPEOPLE':
        this.isOpeningFindPeopleDialog = false;

        break;
      case 'CLOSEFINDPEOPLE':
        this.isOpeningFindPeopleDialog = false;
        break;
      case 'CLOSEEMPLOYEE':
        this.isOpeningEmloyeeDialog = false;
        break;

      default:
        break;
    }
  };

  //   handleChange = (event, value) => {
  //     this.setState({ value });
  //   };

  //   handleChangeIndex = index => {
  //     this.setState({ value: index });
  //   };

  handleChangeSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleUpdate = sectionIndex => {
    this.data[sectionIndex].isEditing = false;
  };

  handleDeleteField = (parentIndex, itemIndex) => {
    /* eslint-disable no-restricted-globals */
    /* eslint-disable no-alert */
    const r = confirm('Bạn có muốn xóa trường này?');
    if (r) {
      this.data[parentIndex].children.splice(itemIndex, 1);
    }
  };

  handelEdit = sectionIndex => {
    this.data[sectionIndex].isEditing = true;
  };

  handleDeleteSection = sectionIndex => {
    /* eslint-disable no-restricted-globals */
    /* eslint-disable no-alert */
    const r = confirm('Bạn có muốn xóa section này?');
    if (r) {
      this.data.splice(sectionIndex, 1);
    }
  };

  handleAddSection = () => {
    this.isAddingSection = false;
    this.data.push({ title: this.newSectionTitle, isEditing: false, children: [] });
    this.newSectionTitle = '';
  };

  handleAddField = () => {
    if (this.isAddingUniqueField) {
      this.fakeUniqueMenu.splice(this.fakeUniqueMenu.findIndex(d => d.fieldName === this.newFieldName), 1);
    }
    this.isAddingUniqueField = false;
    this.isAddingField = false;

    let newField = {
      ...this.newFieldData,

      title: this.newFieldName,
      type: this.newFieldType,
    };
    if (this.newFieldType === 1) {
      newField = { ...newField, currency: this.defaultCurrency };
    }

    this.data[this.currentSectionIndex].children.push(newField);

    this.newFieldType = -1;
    this.newFieldData = {};
    this.newFieldName = '';
  };

  renderNewFieldContent = type => {
    let fieldCode;
    switch (type) {
      case 0:
        fieldCode = (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nội dung"
            onChange={event => {
              this.newFieldData.content = event.target.value;
            }}
            fullWidth
          />
        );
        break;
      case 1:
        fieldCode = (
          <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
              <TextField
                fullWidth
                id="standard-number"
                label="Số tiền"
                onChange={event => {
                  this.newFieldData.value = event.target.value;
                }}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Grid>
            <Grid item sm={1} />
            <Grid item sm={3}>
              <TextField
                fullWidth
                id="standard-select-currency"
                select
                label="Đơn vị"
                value={this.defaultCurrency}
                onChange={event => {
                  this.defaultCurrency = event.target.value;
                }}
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        );
        break;
      case 2:
        fieldCode = (
          <div>
            <InputLabel htmlFor="select-multiple-checkbox">List</InputLabel>
            <Select
              fullWidth
              multiple
              value={this.newFieldData.children ? this.newFieldData.children : []}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
            >
              {names.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    onChange={event => {
                      if (event.target.checked) {
                        this.newFieldData.children ? this.newFieldData.children.push(name) : (this.newFieldData.children = [name]);
                      } else {
                        this.newFieldData.children.splice(this.newFieldData.children.indexOf(name), 1);
                      }
                    }}
                    checked={this.newFieldData.children ? this.newFieldData.children.indexOf(name) > -1 : false}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </div>
        );
        break;
      case 3:
        fieldCode = (
          <div className="picker mt-3 text-center">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <InlineDatePicker
                keyboard
                clearable
                variant="outlined"
                label="Chọn ngày"
                value={this.newFieldData.datetime ? this.newFieldData.datetime : new Date()}
                onChange={event => {
                  const timeStamp = moment(event).format();
                  this.newFieldData.datetime = timeStamp;
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        );
        break;
      case 4:
        fieldCode = (
          <TextField
            id="standard-number"
            label="Number"
            onChange={event => {
              this.newFieldData.content = event.target.value;
            }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        );
        break;
      case 5:
        fieldCode = (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Đường dẫn"
            onChange={event => {
              this.newFieldData.link = event.target.value;
            }}
            fullWidth
          />
        );
        break;
      case 6:
        fieldCode = <DropzoneArea filesLimit={12} showFileNamesInPreview showAlerts={false} onChange={files => {}} />;
        break;
      case 7:
        fieldCode = (
          <Grid container justify="center" alignItems="center">
            <Grid item sm={6}>
              <Radio
                checked={this.newFieldData.radio ? this.newFieldData.radio === 'yes' : true}
                onChange={event => {
                  this.newFieldData.radio = event.target.value;
                }}
                value="yes"
                name="radio-button-demo"
                aria-label="A"
              />
              <span>Có</span>
            </Grid>
            <Grid item sm={6}>
              <Radio
                checked={this.newFieldData.radio ? this.newFieldData.radio !== 'yes' : false}
                onChange={vent => {
                  this.newFieldData.radio = event.target.value;
                }}
                value="no"
                name="radio-button-demo"
                aria-label="A"
              />
              <span>Không</span>
            </Grid>
          </Grid>
        );
        break;
      case 8:
        fieldCode = (
          <div>
            <SearchBar
              style={{
                margin: '0 auto',
              }}
            />
            <List>
              <Grid container>
                {this.peoplefake.map(option => (
                  <Grid key={option.name} item sm={4}>
                    <ListItem
                      button
                      onClick={() => {
                        this.newFieldData.people = option;
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
          </div>
        );
        break;

      default:
        break;
    }
    return fieldCode;
  };

  renderFieldByType = (itemChildren, itemIndex, index, item) => {
    let fieldCode;

    switch (itemChildren.type) {
      case 0:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bold mb-1">{itemChildren.title}</p>
            {item.isEditing ? (
              <TextField
                value={itemChildren.content}
                onChange={event => {
                  this.data[index].children[itemIndex].content = event.target.value;
                }}
                className="my-0"
              />
            ) : (
              <div>
                <span className="mr-2">{itemChildren.content}</span>
              </div>
            )}
          </div>
        );
        break;
      case 1:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bold mb-1">{itemChildren.title}</p>
            {item.isEditing ? (
              <Grid container justify="center" alignItems="center">
                <Grid item sm={8}>
                  <TextField
                    fullWidth
                    id="standard-number"
                    label="Số tiền"
                    onChange={event => {
                      this.data[index].children[itemIndex].value = event.target.value;
                    }}
                    value={itemChildren.value}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={1} />
                <Grid item sm={3}>
                  <TextField
                    fullWidth
                    id="standard-select-currency"
                    select
                    label="Đơn vị"
                    value={itemChildren.currency}
                    onChange={event => {
                      this.data[index].children[itemIndex].currency = event.target.value;
                    }}
                  >
                    {currencies.map(option => (
                      <MenuItem key={`${option.value}edits`} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            ) : (
              <div className="">
                <span className="mr-2">{currencies[currencies.findIndex(d => d.value === itemChildren.currency)].label}</span>
                <span>{itemChildren.value}</span>
              </div>
            )}
          </div>
        );
        break;
      case 2:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bold mb-1">{itemChildren.title}</p>
            {item.isEditing ? (
              <div>
                <Select
                  fullWidth
                  multiple
                  value={itemChildren.children}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        onChange={event => {
                          if (event.target.checked) {
                            this.data[index].children[itemIndex].children.push(name);
                          } else {
                            this.data[index].children[itemIndex].children.splice(this.data[index].children[itemIndex].children.indexOf(name), 1);
                          }
                        }}
                        checked={this.data[index].children[itemIndex].children.indexOf(name) > -1}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              <div className="">
                <ChipInput defaultValue={itemChildren.children} disabled />
              </div>
            )}
          </div>
        );
        break;
      case 3:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bold mb-2">{itemChildren.title}</p>
            {item.isEditing ? (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <InlineDatePicker
                  keyboard
                  clearable
                  variant="outlined"
                  label="Chọn ngày"
                  value={itemChildren.datetime}
                  onChange={event => {
                    const timeStamp = moment(event).format();
                    this.data[index].children[itemIndex].datetime = timeStamp;
                  }}
                />
              </MuiPickersUtilsProvider>
            ) : (
              <div>
                <span>{itemChildren.datetime}</span>
              </div>
            )}
          </div>
        );
        break;
      case 4:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bold mb-1">{itemChildren.title}</p>
            {item.isEditing ? (
              <TextField
                value={itemChildren.content}
                onChange={event => {
                  this.data[index].children[itemIndex].content = event.target.value;
                }}
                className="my-0"
              />
            ) : (
              <span>{itemChildren.content}</span>
            )}
          </div>
        );
        break;
      case 5:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bold mb-1">{itemChildren.title}</p>
            {item.isEditing ? (
              <TextField
                value={itemChildren.link}
                onChange={event => {
                  this.data[index].children[itemIndex].link = event.target.value;
                }}
                className="my-0"
              />
            ) : (
              <a href={itemChildren.link}>{itemChildren.link}</a>
            )}
          </div>
        );
        break;
      case 7:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bolder mb-1">{itemChildren.title}</p>
            {item.isEditing ? (
              <Grid container justify="center" alignItems="center">
                <Grid item sm={6}>
                  <Radio
                    checked={itemChildren.radio === 'yes'}
                    onChange={event => {
                      this.data[index].children[itemIndex].radio = event.target.value;
                    }}
                    value="yes"
                    name="radio-button-demo"
                    aria-label="A"
                  />
                  <span>Có</span>
                </Grid>
                <Grid item sm={6}>
                  <Radio
                    checked={itemChildren.radio !== 'yes'}
                    onChange={event => {
                      this.data[index].children[itemIndex].radio = event.target.value;
                    }}
                    value="no"
                    name="radio-button-demo"
                    aria-label="A"
                  />
                  <span>Không</span>
                </Grid>
              </Grid>
            ) : (
              <p>{itemChildren.radio}</p>
            )}
          </div>
        );
        break;
      case 8:
        fieldCode = (
          <div className="my-2">
            <p className="font-weight-bold mb-1">{itemChildren.title}</p>
            <ListItem
              button
              onClick={() => {
                item.isEditing ? (this.isOpeningFindPeopleDialog = true) : (this.isOpeningEmloyeeDialog = true);
              }}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">
                  <i className="far fa-user" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={itemChildren.people.name} />
            </ListItem>
          </div>
        );
        break;
      default:
        break;
    }

    return fieldCode;
  };

  handleChangeDate = date => {
    this.date = moment(date);
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item md={5} xl={5} lg={5}>
            <div className="text-right mt-2">
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={() => {
                  this.isAddingSection = true;
                }}
              >
                <i className="fas fa-folder-plus fa-lg" />
              </Button>
            </div>
            {this.data.map((item, index) => (
              <Paper elevation={1} className="px-3 mt-2 mb-4" key={item.title}>
                <Grid justify="center" alignItems="center" container className="row align-items-center">
                  <Grid item md={6} xl={6} lg={6} className="align-items-center">
                    <p className="mb-0">{item.title}</p>
                  </Grid>
                  <Grid item md={6} xl={6} lg={6} className="col-6 text-right">
                    {this.props.enableSelectField ? (
                      <div className="d-inline">
                        <IconButton
                          size="small"
                          aria-owns={this.isOpenUniqueMenu ? 'long-menu' : undefined}
                          aria-haspopup="true"
                          onClick={event => {
                            this.isOpenUniqueMenu = event.currentTarget;

                            this.currentSectionIndex = index;
                          }}
                        >
                          <i className="far fa-list-alt fa-xs text-info" />
                        </IconButton>
                        <Menu
                          onClose={() => {
                            this.isOpenUniqueMenu = null;
                          }}
                          id="long-menu"
                          anchorEl={this.isOpenUniqueMenu}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 4.5,
                            },
                          }}
                          open={Boolean(this.isOpenUniqueMenu)}
                        >
                          {this.fakeUniqueMenu.map(option => (
                            <MenuItem
                              key={option}
                              onClick={event => {
                                this.isAddingField = true;
                                this.newFieldType = option.type;
                                this.isAddingUniqueField = true;
                                this.newFieldName = option.fieldName;
                                this.isOpenUniqueMenu = null;
                              }}
                            >
                              {option.fieldName}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    ) : (
                      ''
                    )}

                    <IconButton
                      size="small"
                      onClick={() => {
                        this.isAddingField = true;
                        this.currentSectionIndex = index;
                      }}
                    >
                      <i className="far fa-plus-square fa-xs text-primary" />
                    </IconButton>
                    {item.isEditing ? (
                      <IconButton size="small" onClick={() => this.handleUpdate(index)}>
                        <i className="far fa-check-square fa-xs text-success" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          this.handelEdit(index);
                        }}
                        size="small"
                      >
                        <i className="far fa-edit fa-xs fa-xs text-warning" />
                      </IconButton>
                    )}

                    <IconButton
                      onClick={() => {
                        this.handleDeleteSection(index);
                      }}
                      size="small"
                    >
                      <i className="far fa-trash-alt fa-xs text-danger" />
                    </IconButton>
                  </Grid>
                </Grid>

                <Divider />
                {item.children.map((itemChildren, itemIndex) => (
                  <div key={itemChildren.title}>
                    <Grid container>
                      <Grid item sm={10}>
                        {this.renderFieldByType(itemChildren, itemIndex, index, item)}
                      </Grid>
                      <Grid item sm={1}>
                        {item.isEditing ? (
                          <IconButton
                            size="small"
                            onClick={() => {
                              this.handleDeleteField(index, itemIndex);
                            }}
                          >
                            <i className="far fa-window-close fa-xs text-secondary" />
                          </IconButton>
                        ) : null}
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Paper>
            ))}
          </Grid>
          <Grid item md={7} xl={7} lg={7}>
            <TimelineComponent />
          </Grid>
        </Grid>
        <Dialog open={this.isAddingSection} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
          <DialogTitle id="form-dialog-title">Thêm section</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tên section"
              onChange={event => {
                this.newSectionTitle = event.target.value;
              }}
              value={this.newSectionTitle}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.isAddingSection = false;
                this.isAddingUniqueField = false;
              }}
              variant="outlined"
              className="border-danger text-danger"
            >
              Hủy
            </Button>
            <Button variant="outlined" className="border-success text-success" onClick={this.handleAddSection}>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.isAddingField} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
          <DialogTitle id="form-dialog-title">Thêm Field</DialogTitle>
          <DialogContent>
            <Grid container justify="center" alignItems="center">
              <Grid item sm={8}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Tên Field"
                  onChange={event => {
                    this.newFieldName = event.target.value;
                  }}
                  value={this.newFieldName}
                  fullWidth
                  disabled={this.isAddingUniqueField}
                />
              </Grid>
              <Grid item sm={1} />
              <Grid item sm={3}>
                <TextField
                  disabled={this.isAddingUniqueField}
                  fullWidth
                  id="standard-select-currency"
                  select
                  label="Loại field"
                  value={this.newFieldType}
                  onChange={event => {
                    this.newFieldType = event.target.value;
                  }}
                >
                  {fieldType.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {this.renderNewFieldContent(this.newFieldType)}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.isAddingField = false;
              }}
              variant="outlined"
              className="border-danger text-danger"
            >
              Hủy
            </Button>
            <Button variant="outlined" className="border-success text-success" onClick={this.handleAddField}>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
        <FindPeopleDialog isOpeningFindPeopleDialog={this.isOpeningFindPeopleDialog} callBack={this.callBack} />
        <EmployeeDetailDialog isOpeningEmloyeeDialog={this.isOpeningEmloyeeDialog} callBack={this.callBack} />
      </div>
    );
  }
}

TdtGeneral.propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TdtGeneral);
