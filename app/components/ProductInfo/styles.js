const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
    marginTop: 20,
  },
  checkBoxGroup: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 24,
  },
  selectBox: {
    width: '100%',
    marginLeft: 17,
    marginTop: 28,
  },
  spanAva: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#0795db',
    opacity: '0',
    borderRadius: 5,
    '@media screen and (max-width: 1360px)': {
      width: '190px',
      height: '190px',
    },
    top: -50,
    marginTop: 50,
  },
  textFieldAva: {
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '999',
    margin: '0px',
    top: 0,
  },
  avatar: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    '@media screen and (max-width: 1360px)': {
      width: '100%',
      height: '100%',
    },
  },
  gridAva: {
    width: 300,
    margin: '0 auto',
    position: 'relative',
  },
  iconCam: {
    fontSize: '50px',
    top: '39%',
    position: 'relative',
  },
  inputAvt: {
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '999',
    margin: 0,
    cursor: 'pointer',
    top: '17%',
    left: '24px',
  },
});
export default styles;
