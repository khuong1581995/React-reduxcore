/**
 *
 * ProductInforDrawer
 *
 */

import React from 'react';
import { Table, Paper, TableCell, TableRow, TableBody, withStyles, Toolbar, AppBar, Typography, IconButton, TableHead } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */
class ProductInforDrawer extends React.Component {
  state = {
    rows: [
      {
        name: 'Chuẩn mã vạch',
        value: 234234324234,
        id: 1,
      },
      {
        name: 'ID sản phẩm',
        value: 234234324234,
        id: 1,
      },
      {
        name: 'Danh mục ',
        value: '234',
        id: 1,
      },
      {
        name: 'Chuẩn mã vạch',
        value: '2344',
        id: 1,
      },
    ],
    rowLinks: [
      {
        name: 'RECV 618',
        value: '123423',
        id: 1,
      },
      {
        name: 'RECV 615',
        value: '123423',
        id: 2,
      },
      {
        name: 'RECV 616',
        value: '123423',
        id: 3,
      },
      {
        name: 'RECV 612',
        value: '123423',
        id: 4,
      },
    ],
  };

  render() {
    const { rows, rowLinks } = this.state;
    const { classes } = this.props;
    return (
      <div style={{ marginTop: 100 }}>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
              <Close />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Chi tiết sản phẩm
            </Typography>
            {/* <Button color="inherit" onClick={this.handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <div>
          <Paper
            className={classnames(classes.paper, classes.productBlock)}
            // style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}
          >
            <div style={{ width: '20%' }}>
              <img
                height={150}
                alt="Áo thun nam"
                src="http://erpdemo.lifetek.vn/customImages/589877f0788414bc44fca6ee/589878b9ea6711a419c30912.jpeg"
              />
            </div>
            <div style={{ width: '70%', marginTop: 20 }}>
              <Typography color="primary" style={{ fontWeight: 'bold' }}>
                Áo thun nam
              </Typography>
              <Typography p>Sản phẩm hci tiết</Typography>
            </div>
          </Paper>

          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Paper className={classes.paper}>
            <h4 className={classes.titleTable}>Danh sách các đơn bán hàng tạm dừng</h4>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Mã sản phẩm</TableCell>
                  <TableCell component="th" align="right">
                    Số lượng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowLinks.map(row => (
                  <TableRow key={row.id}>
                    <TableCell scope="row">
                      <Link color="primary" className={classes.link} to={`/link/${row.id}`}>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Paper className={classes.paper} style={{ marginBottom: 20 }}>
            <h4 className={classes.titleTable}>Danh sách các đơn nhập tạm dừng </h4>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Mã sản phẩm</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowLinks.map(row => (
                  <TableRow key={row.id}>
                    <TableCell scope="row">
                      <Link className={classes.link} color="primary" to={`/link/${row.id}`}>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

ProductInforDrawer.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
};

export default withStyles(styles)(ProductInforDrawer);
