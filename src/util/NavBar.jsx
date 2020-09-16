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

const userName = () => {
  let email = localStorage.getItem("email");
  let user=email.substring(0,email.indexOf('@'));
  return user.substring(0,user.indexOf(user.match(/\d/)));
}

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
                  {userName()}
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
          {/* <GrayToolTip title='Main Menu'> */}
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
          {/* </GrayToolTip> */}
          <IconButton color="inherit">
            { label === 'Fundoo' && <img src={KeepIcon} alt='' className={classes.image}/>}
          </IconButton>
          <Typography variant="h6" className={classes.title} >
              <span style={{color: label ==='Fundoo' ? '#5f6368' : '#3c4043'}}>{label}</span>
          </Typography>
          <SearchBar/>
          <IconButton onClick={()=>{setPopover(true)}}>
            <Avatar>{localStorage.getItem('email').slice(0,1).toUpperCase()}</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      {profile}      
      </>      
    );
}

export default withRouter(DisplayAppBar);