import React from 'react';
import {
  Grid,
  Tabs,
  Tab,
  TextField,
  List,
  ListItem,
  MenuItem,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Slide,
  Badge,
  withStyles,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import RegularCard from 'components/Cards/RegularCard';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import PropTypes from 'prop-types';

const styles = {
  textField: {
    marginBottom: '15px',
    color: 'black',
  },
};

const Transition = props => <Slide direction="up" {...props} />;

const ranges = [
  {
    value: false,
    label: '--Chọn mẫu--',
  },
  {
    value: 'BMBH',
    label: 'Biểu mẫu bảo hành',
  },
  {
    value: 'BMHD',
    label: 'Biểu mẫu hóa đơn',
  },
  {
    value: 'BMYCTT',
    label: 'Biểu mẫu yêu cầu thanh toán',
  },
  {
    value: 'BMDH',
    label: 'Biểu mẫu đặt hàng',
  },
  {
    value: 'BMBG',
    label: 'Biểu mẫu báo giá',
  },
];

const Label = props => <p style={{ color: 'red', padding: '5px', margin: '5px', fontWeight: 'bold' }}>{props.children}</p>;
const Tb = props => (
  <Tab
    style={{ textTransform: 'initial' }}
    {...props}
    label={
      <div>
        {props.label}
        {
          <Badge style={{ marginLeft: '15px' }} color="primary" badgeContent={props.number ? props.number : null}>
            {''}
          </Badge>
        }
      </div>
    }
  />
);
class TemplateDetail extends React.Component {
  state = { value: 0, template: false, open: false };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeTitle(e) {
    this.setState({ template: e.target.value });
  }

  render() {
    const { value, template, open } = this.state;
    const { classes } = this.props;
    return (
      <RegularCard
        content={
          <div>
            <Grid>
              <Grid item md={12}>
                <h4 style={{ fontWeight: 'bold', display: 'inline' }}>
                  <Edit /> Danh sách mẫu báo giá, hợp đồng
                </h4>{' '}
                <span style={{ fontWeight: 'normal' }}>(Các trường màu đỏ là cần nhập)</span>
                <h4>Thông tin các từ thay thế</h4>
              </Grid>
              <Grid item md={12}>
                <Tabs value={value} indicatorColor="primary" onChange={this.handleChange}>
                  <Tb label="Nhà cung cấp và khách hàng" number={2} />
                  <Tb label="Hợp đồng" number={15} />
                  <Tb label="Hóa đơn" number={14} />
                  <Tb label="Nhân viên - Công ty" />
                  <Tb label="Dịch vụ" number={1} />
                </Tabs>
              </Grid>
              {value === 0 ? (
                <Grid style={{ display: 'flex', justifyContent: 'space-around' }} item md={12}>
                  <List>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                    <ListItem>{'{DIA_CHI_1_NCC}: Địa chỉ 1 NCC'}</ListItem>
                    <ListItem>{'{DIA_CHI_2_NCC}: Địa chỉ 2 NCC'}</ListItem>
                    <ListItem>{'{SDT_NCC}: Số điện thoại NCC'}</ListItem>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                    <ListItem>{'{DIA_CHI_1_NCC}: Địa chỉ 1 NCC'}</ListItem>
                    <ListItem>{'{DIA_CHI_2_NCC}: Địa chỉ 2 NCC'}</ListItem>
                    <ListItem>{'{SDT_NCC}: Số điện thoại NCC'}</ListItem>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                    <ListItem>{'{DIA_CHI_1_NCC}: Địa chỉ 1 NCC'}</ListItem>
                    <ListItem>{'{DIA_CHI_2_NCC}: Địa chỉ 2 NCC'}</ListItem>
                    <ListItem>{'{SDT_NCC}: Số điện thoại NCC'}</ListItem>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                  </List>
                </Grid>
              ) : null}
              {value === 1 ? (
                <Grid style={{ display: 'flex', justifyContent: 'space-around' }} item md={12}>
                  <List>
                    <ListItem>{'{TEN_HD}: Tên hợp đồng'}</ListItem>
                    <ListItem>{'{MA_HD}: Mã hợp đồng'}</ListItem>
                    <ListItem>{'{NGAY_BĐ_HD}: Ngày bắt đầu hợp đồng'}</ListItem>
                    <ListItem>{'{NGAY_KY_HD}: Ngày ký hợp đồng'}</ListItem>
                    <ListItem>{' {NGAY_HET_HD}: Ngày hết hợp đồng'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{STT}: Số thư tự'}</ListItem>
                    <ListItem>{'{CHIET_KHAU}: Chiết khấu'}</ListItem>
                    <ListItem>{'{THUE}: Thuế'}</ListItem>
                    <ListItem>{'{TEN_HH}: Tên hàng hóa'}</ListItem>
                    <ListItem>{'{MA_HH}: Mã hàng hóa'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{HD_BANG_CHU}: Tổng giá trị đơn hàng bằng chữ'}</ListItem>
                    <ListItem>{'{HD_BANG_SO}: Tổng giá trị đơn hàng bằng số'}</ListItem>
                    <ListItem>{'{TEN_GD}: Tên giai đoạn'}</ListItem>
                    <ListItem>{'{NGAY_TT_GD}: Ngày thanh toán'}</ListItem>
                    <ListItem>{'{SO_TIEN_GD}: Số tiền thanh toán'}</ListItem>
                  </List>
                </Grid>
              ) : null}
              {value === 2 ? (
                <Grid style={{ display: 'flex', justifyContent: 'space-around' }} item md={12}>
                  <List>
                    <ListItem>{'{ORDER_CODE}: Mã hóa đơn'}</ListItem>
                    <ListItem>{'{STT}: STT'}</ListItem>
                    <ListItem>{'{MA_HH}: Mã HH'}</ListItem>
                    <ListItem>{'{TEN_HH}: Tên HH, DV'}</ListItem>
                    <ListItem>{'{DVT}: ĐVT'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{DON_GIA}: Đơn giá'}</ListItem>
                    <ListItem>{'{DON_GIA}: Đơn giá'}</ListItem>
                    <ListItem>{'{DIA_CHI_2_NCC}: Địa chỉ 2 NCC'}</ListItem>
                    <ListItem>{'{SDT_NCC}: Số điện thoại NCC'}</ListItem>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{TONG_DH}: Tổng giá trị đơn hàng'}</ListItem>
                    <ListItem>{'{TIEN_DA_THANH_TOAN}: Tiền đã thanh toán'}</ListItem>
                    <ListItem>{'{DIA_CHI_2_NCC}: Địa chỉ 2 NCC'}</ListItem>
                    <ListItem>{'{SDT_NCC}: Số điện thoại NCC'}</ListItem>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{GHI_CHU}: Ghi chú đơn hàng'}</ListItem>
                  </List>
                </Grid>
              ) : null}
              {value === 3 ? (
                <Grid style={{ display: 'flex', justifyContent: 'space-around' }} item md={12}>
                  <List>
                    <ListItem>{' {LOGO}: Logo'}</ListItem>
                    <ListItem>{'{STT}: STT'}</ListItem>
                    <ListItem>{'{MA_HH}: Mã HH'}</ListItem>
                    <ListItem>{'{TEN_HH}: Tên HH, DV'}</ListItem>
                    <ListItem>{'{DVT}: ĐVT'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{TEL_COMPANY}: Điện thoại CT'}</ListItem>
                    <ListItem>{'{DON_GIA}: Đơn giá'}</ListItem>
                    <ListItem>{'{DIA_CHI_2_NCC}: Địa chỉ 2 NCC'}</ListItem>
                    <ListItem>{'{SDT_NCC}: Số điện thoại NCC'}</ListItem>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{ACCOUNT_BANK_COMPANY}: Tài khoản ngân hàng'}</ListItem>
                    <ListItem>{'{TIEN_DA_THANH_TOAN}: Tiền đã thanh toán'}</ListItem>
                    <ListItem>{'{DIA_CHI_2_NCC}: Địa chỉ 2 NCC'}</ListItem>
                    <ListItem>{'{SDT_NCC}: Số điện thoại NCC'}</ListItem>
                    <ListItem>{'{TEN_NCC}: Tên Nhà cung cấp'}</ListItem>
                  </List>
                  <List>
                    <ListItem>{'{GHI_CHU}: Ghi chú đơn hàng'}</ListItem>
                  </List>
                </Grid>
              ) : null}
              {value === 4 ? (
                <Grid style={{ display: 'flex', justifyContent: 'space-around' }} item md={12}>
                  <List>
                    <ListItem>{'{MORE_CUSTOMER_IN_SERVICE}: Thêm khách hàng làm visa.'}</ListItem>
                  </List>
                </Grid>
              ) : null}

              <Grid item md={12}>
                <TextField required className={classes.textField} label="Tiêu đề" variant="outlined" fullWidth />

                <TextField
                  required
                  className={classes.textField}
                  label="Loại mẫu"
                  variant="outlined"
                  value={template}
                  select
                  onChange={e => this.handleChangeTitle(e)}
                  fullWidth
                >
                  {ranges.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <CKEditor
                  className={classes.textField}
                  onInit={editor => {
                    editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
                  }}
                  editor={DecoupledEditor}
                  data="<p>Hello from CKEditor 5's DecoupledEditor!</p><p>Hello from CKEditor 5's DecoupledEditor!</p><p>Hello from CKEditor 5's DecoupledEditor!</p><p>Hello from CKEditor 5's DecoupledEditor!</p><p>Hello from CKEditor 5's DecoupledEditor!</p><p>Hello from CKEditor 5's DecoupledEditor!</p><p>Hello from CKEditor 5's DecoupledEditor!</p><p>Hello from CKEditor 5's DecoupledEditor!</p>"
                />
                <Button
                  onClick={() => this.setState({ open: true })}
                  style={{ float: 'right', padding: '5px', margin: '5px' }}
                  color="primary"
                  variant="contained"
                >
                  Thực hiện
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.setState({ open: false })}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">Thông báo</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">Lưu thành Cônng biểu mẫu</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.setState({ open: false })} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={() => this.setState({ open: false })} color="primary">
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </div>
        }
      />
    );
  }
}

Label.propTypes = {
  children: PropTypes.string,
};
export default withStyles(styles)(TemplateDetail);
