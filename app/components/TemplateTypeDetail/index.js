import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Slide,
  Checkbox,
} from '@material-ui/core';
import RegularCard from 'components/Cards/RegularCard';
import PropTypes from 'prop-types';

const Transition = props => <Slide direction="up" {...props} />;

const ranges = [
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
class TemplateDetail extends React.Component {
  state = { template: '', open: false };

  handleChangeTitle(e) {
    this.setState({ template: e.target.value });
  }

  render() {
    const { template, open } = this.state;
    return (
      <RegularCard
        content={
          <div>
            <Grid>
              <Grid item md={12}>
                <h4 style={{ fontWeight: 'bold', display: 'inline' }}>Thông tin mẫu văn bản</h4>{' '}
                <span style={{ fontWeight: 'normal' }}>(Các trường màu đỏ là cần nhập)</span>
              </Grid>
              <Grid item md={12}>
                <Label>Tiêu đề:</Label>
                <TextField fullWidth />
                <Label>Mã loại văn bản:</Label>
                <TextField value={template} select onChange={e => this.handleChangeTitle(e)} fullWidth>
                  {ranges.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <p style={{ padding: '5px', margin: '5px', fontWeight: 'bold' }}>
                  Luôn sử dụng
                  {<Checkbox />}
                </p>
                ;
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
export default TemplateDetail;
