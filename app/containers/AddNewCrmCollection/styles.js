const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  button: {
    marginLeft: 10,
  },
  input: {
    display: 'none',
  },
  breadcrumbs: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    marginBottom: '20px',
    // maxWitdth: 500,
  },
  menuButton: { marginBottom: 10, marginRight: 10 },
  detailProduct: {
    width: 700,
  },
  search: {
    marginLeft: 10,
    top: -5,
    marginTop: 0,
    marginBottom: 0,
  },
  // success: {
  //   backgroundColor: 'green',
  //   color: 'white',
  //   '&:hover': {
  //     color: 'white',
  //     backgroundColor: '',
  //   },
  // },
});
export default styles;
