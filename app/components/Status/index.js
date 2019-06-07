/**
 *
 * Status
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Dialog, DialogActions, DialogContent, TextField, DialogTitle, Button } from '@material-ui/core';
import { Edit, Delete, Add } from '@material-ui/icons';
import SortableTree from 'react-sortable-tree';
import { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
// import Button from '../CustomButtons/Button';
import styles from './styles';
import './styles.css';
import CustomTheme from '../ThemeSortBar/index';
import DialogAcceptRemove from '../DialogAcceptRemove';

/* eslint-disable react/prefer-stateless-function */
class Status extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialogRemove: false,
      openDialogAdd: false,
      // treeData: [
      //   {
      //     _id: '5cf4f845d27bb35483ad5b94',
      //     updatedAt: '2019-06-03T10:36:53.648Z',
      //     createdAt: '2019-06-03T10:36:53.648Z',
      //     name: 'Danh mục 1',
      //     code: 'dmmmm1',
      //     __v: 0,
      //     status: 1,
      //     parent: null,
      //     isDisplayPOS: false,
      //     title: 'Danh mục 1',
      //     expanded: true,
      //     children: [
      //       {
      //         _id: '5cf4f85cd27bb35483ad5b95',
      //         updatedAt: '2019-06-03T10:37:16.527Z',
      //         createdAt: '2019-06-03T10:37:16.527Z',
      //         name: 'danh mục con',
      //         code: 'fsgfgfdgfdg',
      //         __v: 0,
      //         status: 1,
      //         parent: '5cf4f845d27bb35483ad5b94',
      //         isDisplayPOS: false,
      //         title: 'danh mục con',
      //         expanded: true,
      //       },
      //     ],
      //   },
      //   {
      //     _id: '5cf4daa1d27bb35483ad5b6a',
      //     updatedAt: '2019-06-03T08:30:25.996Z',
      //     createdAt: '2019-06-03T08:30:25.996Z',
      //     name: 'danh mục 03',
      //     code: '123454',
      //     __v: 0,
      //     status: 1,
      //     parent: null,
      //     isDisplayPOS: false,
      //     title: 'danh mục 03',
      //     expanded: true,
      //   },
      //   {
      //     _id: '5cee0ab0f770c33cbf6614eb',
      //     updatedAt: '2019-05-30T07:02:00.042Z',
      //     createdAt: '2019-05-29T04:29:36.510Z',
      //     name: 'danh mục 1',
      //     code: '12345',
      //     __v: 0,
      //     status: 1,
      //     parent: null,
      //     isDisplayPOS: false,
      //     title: 'danh mục 1',
      //     expanded: true,
      //     children: [
      //       {
      //         _id: '5cf0ded8c7b2594bc08e183d',
      //         updatedAt: '2019-05-31T08:08:42.201Z',
      //         createdAt: '2019-05-31T07:59:20.851Z',
      //         name: 'hdewdew',
      //         code: 'rbrtbrthb',
      //         __v: 0,
      //         status: 1,
      //         parent: '5cee0ab0f770c33cbf6614eb',
      //         isDisplayPOS: false,
      //         title: 'hdewdew',
      //         expanded: true,
      //         children: [
      //           {
      //             _id: '5cf5f108af413d09e8ad19ee',
      //             updatedAt: '2019-06-04T04:18:16.777Z',
      //             createdAt: '2019-06-04T04:18:16.777Z',
      //             name: '134213',
      //             code: '14141414',
      //             __v: 0,
      //             status: 1,
      //             parent: '5cf0ded8c7b2594bc08e183d',
      //             isDisplayPOS: false,
      //             title: '134213',
      //             expanded: true,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      treeData: [
        {
          title: 'cha 1',
          value: 'nd cha 1',
          _id: '5cee600cac406d2e8e8ac0c5',
          children: [],
        },
        {
          title: 'cha 2',
          value: 'nd cha 2',
          _id: '5cee600cac406d2e8e8ac0c4',
          children: [
            {
              title: 'con 1',
              value: 'nd con 1',
              children: [
                {
                  title: 'con 3',
                  value: 'nd con 3',
                },
                {
                  title: 'con 4',
                  value: 'nd con 4',
                },
              ],
            },
            {
              title: 'con 2',
              value: 'nd con 2',
            },
          ],
        },
      ],
    };
  }

  handleDialogRemove = () => {
    const { openDialogRemove } = this.state;
    this.setState({
      openDialogRemove: !openDialogRemove,
    });
  };

  handleDialogAdd = node => {
    const { openDialogAdd } = this.state;
    console.log(node);
    this.setState({
      openDialogAdd: !openDialogAdd,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{ height: '100%' }}>
        <h4>{this.props.title}</h4>
        <Button color="primary" size="small" round style={{ marginLeft: 44, marginBottom: 10 }} onClick={this.handleDialogAdd}>
          <Add /> Thêm mới
        </Button>
        <div style={{ width: '100%', height: '100%' }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => {
              this.setState({ treeData });
              const newData = getFlatDataFromTree({
                treeData: this.state.treeData,
                getNodeKey: ({ node }) => node._id, // This ensures your "id" properties are exported in the path
                ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
              }).map(({ node, path }) => {
                console.log(path);
                return {
                  id: node._id,
                  name: node.name,

                  // The last entry in the path is this node's key
                  // The second to last entry (accessed here) is the parent node's key
                  parent: path.length > 1 ? path[path.length - 2] : null,
                };
              });
              console.log(newData);
            }}
            // getNodeKey={({ node }) => {
            //   console.log(node);
            // }}
            theme={CustomTheme}
            canDrag={({ node }) => !node.noDragging}
            isVirtualized
            generateNodeProps={rowInfo => {
              // console.log(rowInfo);
              if (!rowInfo.node.noDragging) {
                return {
                  buttons: [
                    <Fab color="primary" size="small" onClick={() => this.handleDialogAdd(rowInfo)} style={{ marginLeft: 10 }} title="Chỉnh sửa">
                      <Edit />
                    </Fab>,
                    <Fab color="secondary" size="small" style={{ marginLeft: 10 }} title="Xóa" onClick={this.handleDialogRemove}>
                      <Delete />
                    </Fab>,
                    <Fab style={{ background: 'green', color: 'white', marginLeft: 10 }} title="Thêm danh mục con" size="small">
                      <Add />
                    </Fab>,
                  ],
                };
              }
            }}
            // onChange={data => console.log(data)}
            style={{ fontFamily: 'Tahoma' }}
          />
        </div>

        <DialogAcceptRemove
          title="Bạn có muốn xóa trạng thái này không?"
          openDialogRemove={this.state.openDialogRemove}
          handleClose={this.handleDialogRemove}
        />
        <Dialog open={this.state.openDialogAdd} onClose={this.handleDialogAdd}>
          <DialogTitle id="alert-dialog-title">Thêm mới trạng thái</DialogTitle>
          <DialogContent style={{ width: 600 }}>
            <TextField
              id="standard-name"
              label="Tên trạng thái"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChangeInput}
              margin="normal"
              name="name"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddStatus} variant="contained" color="primary">
              Thêm mới
            </Button>
            <Button onClick={this.handleDialogAdd} variant="contained" color="default" autoFocus>
              Hủy bỏ
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
// --------------------- phần cũ
// state = {
//   name: '',
//   openDialog: false,
//   items: [],
// };

//   componentDidMount() {
//     this.setState({ items: this.props.items });
//   }

//   componentWillUpdate(props) {
//     if (this.props !== props) {
//       // this.setState({ items: props.items });
//       this.state.items = props.items;
//     }
//   }

//   // sắp xếp các item
//   onSortEnd = ({ oldIndex, newIndex }) => {
//     this.setState(({ items }) => ({
//       items: arrayMove(items, oldIndex, newIndex),
//     }));
//     const { items } = this.state;
//     const newItem = items.map((item, index) => ({
//       name: item.name,
//       index: index + 1,
//     }));
//     this.setState({ items: newItem });
//   };

//   // Mở dialog
//   handleClickOpen = name => {
//     this.setState({ [name]: true });
//   };

//   handleClose = () => {
//     this.setState({ openDialog: false });
//   };

//   // thêm mới trạng thái
//   handleAddStatus = () => {
//     const { items } = this.state;
//     const objIndex = items.length;
//     const obj = {
//       name: this.state.name,
//       index: objIndex + 1,
//     };
//     items.push(obj);
//     this.setState({
//       items,
//     });
//     this.setState({
//       openDialog: false,
//     });
//   };

//   // thay đổi giá trị
//   handleChangeInput = e => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   render() {
//     const { items } = this.state;
//     const { classes, title } = this.props;
//     return (
//       <div className={classes.root}>
//         <ExpansionPanel defaultExpanded>
//           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography className={classes.heading}>{title}</Typography>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails>
//             <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
//               {items
//                 .filter(item => item)
//                 // .sort((current, last) => current.index - last.index)
//                 .map((value, index) => (
//                   <SortableItem key={`item-${value.index}`} index={index} value={value} color="#D3EEF9" />
//                 ))}
//               <Button variant="outlined" color="primary" className={classes.button} onClick={() => this.handleClickOpen('openDialog')}>
//                 Thêm mới
//               </Button>
//             </SortableContainer>
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//         <Grid justify="center" container style={{ marginTop: 20 }}>
//           <Button variant="contained" color="primary" className={classes.button}>
//             Lưu
//           </Button>
//           <Button variant="contained" color="default" className={classes.button}>
//             Hủy bỏ
//           </Button>
//         </Grid>
//         <Dialog open={this.state.openDialog} onClose={this.handleClose}>
//           <DialogTitle id="alert-dialog-title">Thêm mới trạng thái</DialogTitle>
//           <DialogContent style={{ width: 600 }}>
//             <TextField
//               id="standard-name"
//               label="Tên trạng thái"
//               className={classes.textField}
//               value={this.state.name}
//               onChange={this.handleChangeInput}
//               margin="normal"
//               name="name"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleAddStatus} variant="contained" color="primary">
//               Thêm mới
//             </Button>
//             <Button onClick={this.handleClose} variant="contained" color="default" autoFocus>
//               Hủy bỏ
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }
// }

Status.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
  // items: PropTypes.array,
};

export default withStyles(styles)(Status);
