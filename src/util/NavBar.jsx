import React from 'react';
import '../scss/Navbar.scss';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeepIcon from '../assets/images/keepimage.jpg';
import useStyle from '../scss/DrawerMenuCSS';


export default function DisplayAppBar (props) {

    const classes = useStyle();
    let txt = props.text;
	return (
    <AppBar
    position="fixed"
    className={classes.appBar}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={()=> { props.onchange() } }
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit">
          { txt === 'Fundoo' && <img src={KeepIcon} alt='' className={classes.image}/>}
        </IconButton>
        <Typography variant="h6" className={classes.title} >
            <span style={{color: props.txt ==='Fundoo' ? '#5f6368' : '#3c4043'}}>{props.txt}</span>
        </Typography>
        <Avatar>{process.env.REACT_APP_BASE_URL}</Avatar>
      </Toolbar>
    </AppBar>      
    );
}
