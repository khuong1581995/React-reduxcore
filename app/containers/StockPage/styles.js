const styles = theme => {
  console.log(theme);
  return {
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
    image: {
      margin: '0 auto',
      '&:hover': {
        transform: 'scale(7)',
        zIndex: 100,
        position: 'absolute',
        border: '1px gray solid',
        borderRadius: 5,
        marginLeft: 40,
      },
    },
  };
};
export default styles;
