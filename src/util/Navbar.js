import React from 'react';
import '../scss/Navbar.scss';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeepImage from '../assets/images/keepimage.jpg';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0.1,
    textAlign:'left',
    display:'flex',
    justifyContent:'flex-start',
    backgroundColor:'white',
    borderBottom:'1px solid silver'
  },
  menuButton: {
    color:'black',
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    color:'black',
    fontFamily:'Cambria',
  },
}));

export default function DisplayAppBar (props) {
 
    const classes = useStyles();
	
	return (      
      <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={KeepImage} alt='' />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Keep
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
              </div>
                <InputBase
                  placeholder=" Search"
                  id="input_base"
                />        
              </div>
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </div>
    );
}