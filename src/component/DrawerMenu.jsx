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
    console.log("====handleDrawer======")
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
        open={open}
        className={clsx(classes.drawer)}
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
        <div>
          <List className={classes.listStyle}>
            <ListItem button autoFocus key="Notes" onClick={()=>{
              open && setValues({open:true,text:'Fundoo'})
              }} className={classes.listItemStyle} style={text === 'Fundoo' ? {backgroundColor:'#feefc3'} : {} }> 
              <ListItemIcon><EmojiObjectsOutlined /></ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItem>
            
            <ListItem button key="Reminder" onClick={()=>{
              open && setValues({open:true,text:'Reminder'})
              }} className={classes.listItemStyle} style={text === 'Reminder' ? {backgroundColor:'#feefc3'} : {} }>
              <ListItemIcon><NotificationsOutlined /></ListItemIcon>
              <ListItemText primary="Reminder" />
            </ListItem>
            
            <ListItem button key="Edit Label" className='listStyle2'>
              <ListItemIcon><CreateOutlined/></ListItemIcon>
              <ListItemText primary="Edit Label" />
            </ListItem>
            
            <ListItem button key="Archieve" onClick={()=>{
              open && setValues({open:true,text:'Archieve'})
              }} className={classes.listItemStyle} style={text === 'Archieve' ? {backgroundColor:'#feefc3'} : {} }>
              <ListItemIcon><ArchiveOutlined /></ListItemIcon>
              <ListItemText primary="Archieve" />
            </ListItem>
            
            <ListItem button key="Trash" onClick={()=>{
              open && setValues({open:true,text:'Trash'})
              }} className={classes.listItemStyle} style={text === 'Trash' ? {backgroundColor:'#feefc3'} : {} }> 
              <ListItemIcon><DeleteOutlined/></ListItemIcon>
              <ListItemText primary="Trash" /> 
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
      </main>
    </div>
  );
}

export default DrawerMenu;
