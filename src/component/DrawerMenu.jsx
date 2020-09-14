import { EmojiObjectsOutlined, NotificationsOutlined, SettingsOutlined } from "@material-ui/icons";
import { CreateOutlined, ArchiveOutlined, DeleteOutlined } from '@material-ui/icons';
import { ViewAgendaOutlined, DashboardOutlined } from '@material-ui/icons';
import React from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import KeepIcon from '../assets/images/keepimage.jpg';
import useStyle from '../scss/DrawerMenuCSS';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerMenu = () => {
  
  const classes = useStyle();

  const initialState = {
    open:false,
    text:'Fundoo'
  }
  
  const [{open,text}, setValues] = React.useState(initialState);

  const handleDrawerOpen = () => {
    let opn = open ? false : true;
    setValues({
      open:opn,
    });
  };

  const handleTextChange = (txt) => {
      setValues({
        text:txt
      })
  }

  const handleToggleView = () =>{

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit">
            <img src={KeepIcon} alt='' className={classes.image}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              {text}
          </Typography>
          <SettingsOutlined button style={{color:'gray'}}/>
          <DashboardOutlined style={{color:'gray'}}/>
          <Avatar>{process.env.REACT_APP_BASE_URL}</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
        </div>
        <Divider />
        <List>
          <ListItem button key="Notes" onClick={()=>{handleTextChange('Keep')}}>
            <ListItemIcon><EmojiObjectsOutlined /></ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button key="Reminder" onClick={()=>{handleTextChange('Reminder')}}>
            <ListItemIcon><NotificationsOutlined /></ListItemIcon>
            <ListItemText primary="Reminder" />
          </ListItem>
          <ListItem button key="Edit Label">
            <ListItemIcon><CreateOutlined/></ListItemIcon>
            <ListItemText primary="Edit Label" />
          </ListItem>
          <ListItem button key="Archieve" onClick={()=>{handleTextChange('Archieve')}}>
            <ListItemIcon><ArchiveOutlined /></ListItemIcon>
            <ListItemText primary="Archieve" />
          </ListItem>
          <ListItem button key="Trash" onClick={()=>{handleTextChange('Trash')}}> 
            <ListItemIcon><DeleteOutlined/></ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default DrawerMenu;
