import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

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
    marginLeft: theme.spacing(-1),
  },
  title: {
    flexGrow: 1,
    textAlign:'left',
  },
  drawer: {
    width: drawerWidth,
    flexShrink:0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    '&. MuiDrawer-paperAnchorDockedLeft': {
      border:'none'
    },
    // '&. makeStyles-drawer-5':{
    //   width:'240px'
    // },
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
    // '&. makeStyles-drawer-5':{
    //   width:'0px'
    // },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft:theme.spacing(1),
    overflowX: 'hidden',
    width: theme.spacing(7)+1,
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
    flexGrow:1,
    padding: theme.spacing(3),
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
  
  listStyle: {
    '& .MuiListItem-button:hover ': {
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiListItem-button:focus ': {
        // backgroundColor: '#feefc3',
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },
    '& .MuiListItem-button:active ': {
        // backgroundColor: '#feefc3',
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

}));

export const DisplayTooltip = withStyles(theme => ({
  tooltip: {
      backgroundColor: '#404040',
      color: 'white',
      fontSize: 12,
  },
}))(Tooltip);

export default useStyles;