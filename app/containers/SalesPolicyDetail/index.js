import React from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemText as ListItemTextUI,
  Input,
  FormGroup,
  Checkbox,
  Chip,
  MenuItem,
  withStyles,
  Select,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';

const ListItemText = props => <ListItemTextUI primary={<p style={{ color: props.color ? props.color : 'black' }}>{props.primary}</p>} />;
const products = ['Quạt máy', 'Điều hòa', 'Tủ lạnh', 'Lò nướng'];
const productPackages = ['Điện tử', 'Điện lạnh', 'Cơ khí', 'Điện thoại'];
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  button: {
    margin: '5px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SelectUI = withStyles(styles)(props => (
  <Select
    variant="outlined"
    fullWidth
    multiple
    value={props.value}
    name={props.name}
    onChange={e => props.handleChangeName(e, props.name)}
    input={<Input />}
    renderValue={selected => (
      <div className={props.classes.chips}>
        {selected.map(value => (
          <Chip key={value} label={value} className={props.classes.chip} />
        ))}
      </div>
    )}
    MenuProps={MenuProps}
  >
    {props.names.map(name => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ))}
  </Select>
));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class SalesPolicy extends React.Component {
  state = {
    ruleName: '',
    product: [],
    productPackage: [],
    rules: [
      { value: 0, label: 'Chọn một loại quy tắc' },
      { value: 1, label: 'Giảm giá đơn giản' },
      { value: 2, label: 'Mua X nhận Y miễn phí' },
      { value: 3, label: 'Mua X nhận giảm giá' },
      { value: 4, label: 'Giảm giá cao cấp' },
      { value: 5, label: 'Chi tiêu X nhận giảm' },
    ],
    rule: 0,
    rows: [0],
  };

  handleChange = () => e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeName = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleDelete(id) {
    const { rows } = this.state;
    const newRows = rows.filter((row, index) => index !== id);
    this.setState({ rows: newRows });
  }

  addPrice = () => {
    const { rows } = this.state;
    const newRows = [...rows, rows.length];
    this.setState({ rows: newRows });
  };

  addProduct = props => (
    <>
      <ListItem>
        <ListItemText primary="Sản phẩm:" />

        <SelectUI handleChangeName={this.handleChangeName} names={props.products} value={props.product} name="product" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Gói sản phẩm:" />

        <SelectUI handleChangeName={this.handleChangeName} names={props.productPackages} value={props.productPackage} name="productPackage" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Chọn danh mục:" />

        <SelectUI handleChangeName={this.handleChangeName} names={props.productPackages} value={props.productPackage} name="productPackage" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Chọn nhãn:" />

        <SelectUI handleChangeName={this.handleChangeName} names={props.productPackages} value={props.productPackage} name="productPackage" />
      </ListItem>
    </>
  );

  render() {
    const { ruleName, product, productPackage, rules, rule, rows } = this.state;
    return (
      <Grid container>
        <Grid item md={12}>
          {' '}
          <h4 style={{ fontWeight: 'bold', display: 'inline' }}>Thông tin quy tắc giá</h4>{' '}
          <span style={{ fontWeight: 'normal' }}>(Các trường màu đỏ là cần nhập)</span>
        </Grid>

        <Grid item md={12} style={{ padding: '5px' }}>
          {' '}
          <List>
            <ListItem>
              <TextField required variant="outlined" label="Loại quy tắc" select name="rule" onChange={this.handleChange()} fullWidth value={rule}>
                {rules.map(item => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </ListItem>
            <ListItem>
              <TextField required variant="outlined" label="Tên quy tắc" fullWidth name="ruleName" onChange={this.handleChange()} value={ruleName} />
            </ListItem>
            <ListItem>
              <FormGroup>
                <p>Ngày bắt đầu *</p>
                <Datetime timeFormat={false} />
              </FormGroup>
            </ListItem>
            <ListItem>
              <FormGroup>
                <p>Ngày kết thúc *</p>
                <Datetime timeFormat={false} />
              </FormGroup>
            </ListItem>
            <ListItem>
              <p style={{ fontWeight: 'bold' }}>
                Hoạt động
                {<Checkbox color="primary" />}
              </p>
            </ListItem>
            {rule === 2 ? (
              <div>
                {this.addProduct({ product, products, productPackage, productPackages })}
                <ListItem>
                  <ListItemText color="red" primary="Số lượng mua:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <ListItem>
                  <ListItemText color="red" primary="Số lượng nhận:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sản phẩm nhận:" />
                  <SelectUI handleChangeName={this.handleChangeName} names={productPackages} value={productPackage} name="productPackage" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Gói sản phẩm nhận:" />
                  <SelectUI handleChangeName={this.handleChangeName} names={productPackages} value={productPackage} name="productPackage" />
                </ListItem>
                <ListItem>
                  <p style={{ fontWeight: 'bold', color: 'red' }}>
                    Không giới hạn
                    {<Checkbox color="primary" />}
                  </p>
                </ListItem>
              </div>
            ) : null}
            {rule === 1 ? (
              <div>
                {this.addProduct({ product, products, productPackage, productPackages })}
                <ListItem>
                  <ListItemText primary="Giảm theo %:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <h4 style={{ textAlign: 'center' }}>Hoặc là</h4>
                <ListItem>
                  <ListItemText primary="Giảm giá cố định:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <ListItem>
                  <p style={{ fontWeight: 'bold', color: 'red' }}>
                    Không giới hạn
                    {<Checkbox color="primary" />}
                  </p>
                </ListItem>
              </div>
            ) : null}
            {rule === 3 ? (
              <div>
                {this.addProduct({ product, products, productPackage, productPackages })}
                <ListItem>
                  <ListItemText color="red" primary="Số lượng mua:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Giảm theo %:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <h4 style={{ textAlign: 'center' }}>Hoặc là</h4>
                <ListItem>
                  <ListItemText primary="Giảm giá cố định:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <ListItem>
                  <p style={{ fontWeight: 'bold', color: 'red' }}>
                    Không giới hạn
                    {<Checkbox color="primary" />}
                  </p>
                </ListItem>
              </div>
            ) : null}
            {rule === 5 ? (
              <div>
                <ListItem>
                  <ListItemText color="red" primary="Số tiền chi tiêu:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Giảm theo %:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <h4 style={{ textAlign: 'center' }}>Hoặc là</h4>
                <ListItem>
                  <ListItemText primary="Giảm giá cố định:" />
                  <Input fullWidth type="number" />
                </ListItem>
                <ListItem>
                  <p style={{ fontWeight: 'bold', color: 'red' }}>
                    Không giới hạn
                    {<Checkbox color="primary" />}
                  </p>
                </ListItem>
              </div>
            ) : null}
            {rule === 4 ? (
              <div>
                {this.addProduct({ product, products, productPackage, productPackages })}
                <ListItem>
                  <ListItemText color="red" primary="Giá phân chia:" />
                  <Grid container>
                    <Grid item md={12}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>Số lượng mua</TableCell>
                            <TableCell>Giảm giá cho mỗi mục</TableCell>
                            <TableCell>Giảm giá theo tỷ lệ phần trăm cho mỗi đơn vị</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => (
                            <TableRow key={row}>
                              <TableCell>
                                <Close style={{ cursor: 'pointer', color: 'red' }} onClick={() => this.handleDelete(index)} />
                              </TableCell>
                              <TableCell>
                                <Input />
                              </TableCell>
                              <TableCell>
                                <Input />
                              </TableCell>
                              <TableCell>
                                <Input />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button onClick={this.addPrice} variant="contained" color="primary">
                    <Add />
                    Thêm mục
                  </Button>
                </ListItem>
              </div>
            ) : null}
          </List>
          <List>
            <ListItem style={{ justifyContent: 'flex-end' }}>
              <Button color="primary" variant="contained">
                Thực hiện
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
}
ListItemText.propTypes = {
  color: PropTypes.string,
  primary: PropTypes.node,
};
export default SalesPolicy;
