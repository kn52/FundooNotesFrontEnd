import { EmojiObjectsOutlined, NotificationsOutlined } from "@material-ui/icons";
import { CreateOutlined, ArchiveOutlined, DeleteOutlined } from '@material-ui/icons';
import React from 'react';
import clsx from 'clsx';
import NavBar from '../util/NavBar';
import useStyle from '../scss/DrawerMenuCSS';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
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
      text:text,
      open:opn,
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar open={open} txt={text} onchange={handleDrawerOpen}/>
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
          <ListItem  autoFocus style={{borderRadius:'45%'}} button key="Notes" onClick={()=>{setValues({text:'Fundoo'})}}>
            <ListItemIcon><EmojiObjectsOutlined /></ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button key="Reminder" onClick={()=>{setValues({text:'Reminder'})}}>
            <ListItemIcon><NotificationsOutlined /></ListItemIcon>
            <ListItemText primary="Reminder" />
          </ListItem>
          <ListItem button key="Edit Label">
            <ListItemIcon><CreateOutlined/></ListItemIcon>
            <ListItemText primary="Edit Label" />
          </ListItem>
          <ListItem button key="Archieve" onClick={()=>{setValues({text:'Archieve'})}}>
            <ListItemIcon><ArchiveOutlined /></ListItemIcon>
            <ListItemText primary="Archieve" />
          </ListItem>
          <ListItem button key="Trash" onClick={()=>{setValues({text:'Trash'})}}> 
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
