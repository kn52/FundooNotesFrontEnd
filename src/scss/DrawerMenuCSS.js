import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'white',
  },
  menuButton: {
    color:'#5f6368',
    marginLeft: theme.spacing(-1.8),
  },
  title: {
    flexGrow: 1,
    textAlign:'left',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    '&. MuiDrawer-paperAnchorDockedLeft': {
      border:'none'
    },
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    '&. MuiDrawer-paperAnchorDockedLeft': {
      border:'none'
    },

    '& .MuiListItem-gutters': {
      paddingLeft:'13px',
    },
    '& .MuiListItem-button': {
      width:'3.5em',
      borderBottomRightRadius: '2em',
      borderTopRightRadius: '2em',
      borderBottomLeftRadius: '2em',
      borderTopLeftRadius: '2em',      
    },
    marginTop:1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft:theme.spacing(1),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    minHeight:'99.5vh',
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  listStyle: {
    '& .MuiListItem-button:hover ': {
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiListItem-button:focus ': {
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiListItem-button:active ': {
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiTypography-body1': {
        fontWeight: 550,
        fontSize:14,
    },
    marginLeft: theme.spacing(0),
    transform: 'none',
    transition: 'transform .25s cubic-bezier(0.4,0.0,0.2,1),visibility 0s linear 0s',
  },

  listStyle2: {
    '& .MuiListItem-button:hover ': {
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiListItem-button:focus ': {
        backgroundColor: 'none',
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiListItem-button:active ': {
        backgroundColor: 'none',
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiTypography-body1': {
        fontWeight: 500,
    },
    marginLeft: theme.spacing(0),
    transform: 'none',
    transition: 'transform .25s cubic-bezier(0.4,0.0,0.2,1),visibility 0s linear 0s',
  },
  listItemStyle: {
    borderBottomRightRadius: '2em',
    borderTopRightRadius: '2em',
  },
  buttonList: {
    backgroundColor:'lightgray'
  },

  image: {
    width:35,
    height:35
  },

  profile: {
    width: '100px',
    height: '100px',
    fontSize: '60px',
  },

  gridContainer: {
    border:1,
    minWidth:300,
    maxWidth: 445,
    padding: 25,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 20,
   },
  },
}));

export default useStyles