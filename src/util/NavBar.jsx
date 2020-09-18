import React, { useState } from 'react';
import '../scss/Navbar.scss';
import { Typography, Divider, Grid, AppBar, Toolbar, } from '@material-ui/core/';
import { Avatar, IconButton, Button, Popover } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import KeepIcon from '../assets/images/keepimage.jpg';
import useStyle from '../scss/DrawerMenuCSS';
import { withRouter} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawerOpen, toggleDrawerClose } from '../redux/actions/DrawerAction';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const DisplayTooltip = withStyles(theme => ({
  tooltip: {
      backgroundColor: '#404040',
      color: 'white',
      fontSize: 12,
      marginTop:'-2'
  },
}))(Tooltip);

const DisplayAppBar = (props) => {

    const classes = useStyle();

    const label = useSelector(state=>state.label.currentLabelId);
    const openDrawer = useSelector(state=>state.drawer.openDrawer);

    const dispatch = useDispatch();

    const [openPopover,setPopover]=useState(false);

    const profile =  (
      <Popover
        className={classes.avatarPopover}
        open={openPopover}
        onClose={()=>setPopover(false)}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        style={{marginTop:'3%'}}
      >
        <Grid className={classes.gridContainer}>
            <Avatar className={classes.profile}>{localStorage.getItem('email').slice(0,1)}</Avatar>
            <Grid item style={{textAlign: 'center'}}>
                <Typography  variant="h6" style={{marginTop:'5%',textAlign: 'center'}}>
                  {localStorage.getItem('firstname') + " " + localStorage.getItem('lastname')}
                </Typography>
                <Typography variant="h6" color="textSecondary" style={{marginTop:'20px',textAlign: 'center', fontSize: 15}} >
                    {localStorage.getItem('email')}
                </Typography>
                <Divider style={{marginTop: 20}} />
                <Button 
                    style={
                    {
                        border: '1px solid lightgray', 
                        marginTop: 20, 
                        color:'#404040'
                    }
                    }
                    onClick={ () => {
                        localStorage.clear();
                        props.history.push('/login')
                    }}
                    >
                    Sign Out
                </Button>
              </Grid>
            </Grid>
    </Popover>
    );

    console.log(openDrawer);

    return (
      <>
      <AppBar
      position="fixed"
      className={classes.appBar}
      >
        <Toolbar>
          <DisplayTooltip title='Main Menu'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={()=> { 
                dispatch( openDrawer ? toggleDrawerClose() : toggleDrawerOpen() )
               } }
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </DisplayTooltip>
          <IconButton color="inherit">
            { label === 'Fundoo' && <img src={KeepIcon} alt='' className={classes.image}/>}
          </IconButton>
          <Typography variant="h6" className={classes.title} >
              <span style={{color: label ==='Fundoo' ? '#5f6368' : '#3c4043'}}>{label}</span>
          </Typography>
          <SearchBar/>
          <DisplayTooltip title={
              <>
                <span >Fundoo Account </span><br />
                <span style={{color: 'lightgray'}}>
                  {localStorage.getItem('firstname')+ ' ' + localStorage.getItem('lastname')}
                </span><br />
                <span style={{color: 'lightgray'}}>{localStorage.getItem('email')}</span>
              </>
            }
          >
            <IconButton onClick={()=>{setPopover(true)}}>
              <Avatar>{localStorage.getItem('email').slice(0,1).toUpperCase()}</Avatar>
            </IconButton>
          </DisplayTooltip>
          
        </Toolbar>
      </AppBar>
      {profile}      
      </>      
    );
}

export default withRouter(DisplayAppBar);