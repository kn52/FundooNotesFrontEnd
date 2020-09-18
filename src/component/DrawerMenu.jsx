import React, { useState } from 'react';
import clsx from 'clsx';
import setLabelPage from '../redux/actions/LabelAction';
import { EmojiObjectsOutlined, NotificationsOutlined } from "@material-ui/icons";
import { CreateOutlined, ArchiveOutlined, DeleteOutlined } from '@material-ui/icons';
import { Drawer,List, CssBaseline,Divider,ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import Notes from './Notes';
import useStyle from '../scss/DrawerMenuCSS';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../util/NavBar';
import { toggleDrawerOpen, toggleDrawerClose } from '../redux/actions/DrawerAction';

export default function DrawerMenu() {
  const classes = useStyle();
  
  const [onhover,setOnhover] = useState(false);

  const labels = useSelector(state=>state.label.currentLabelId);
  const open = useSelector(state=>state.drawer.openDrawer);
  
  const handleOnHover = () => {
      if(open == false && onhover == false) {
        document.getElementById("draw").style.position='absolute';
        setOnhover(true);
        dispatch(toggleDrawerOpen())
      }
      if(open ==true && onhover == true){
        document.getElementById("draw").style.position='relative';
        setOnhover(false)
        dispatch(toggleDrawerClose())
      }
  }

  const dispatch = useDispatch(); 
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <Drawer
        id="draw"
        variant="permanent"
		    onMouseEnter={ ()=> { 
           open ? setOnhover(false) 
           : handleOnHover() 
         } }
        onMouseLeave={ ()=> { 
          handleOnHover()
        } }
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
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </div>
        <Divider />
        <List className={classes.listStyle}>
            <ListItem button autoFocus key="Notes" onClick={()=>{ open &&  dispatch(setLabelPage('Fundoo')) }} 
                className={classes.listItemStyle} style={labels === 'Fundoo' ? {backgroundColor:'#feefc3'} : {} }> 
              <ListItemIcon><EmojiObjectsOutlined /></ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItem>
            <ListItem button key="Reminder" onClick={()=>{ open &&  dispatch(setLabelPage('Reminder')) }} 
                className={classes.listItemStyle} style={labels === 'Reminder' ? {backgroundColor:'#feefc3'} : {} }>
              <ListItemIcon><NotificationsOutlined /></ListItemIcon>
              <ListItemText primary="Reminder" />
            </ListItem>
            <ListItem button key="Edit Label" className='listItemStyle'>
              <ListItemIcon><CreateOutlined/></ListItemIcon>
              <ListItemText primary="Edit Label" />
            </ListItem>
            <ListItem button key="Archieve" onClick={()=>{ open && dispatch(setLabelPage('Archieve')) }} 
                className={classes.listItemStyle} style={labels === 'Archieve' ? {backgroundColor:'#feefc3'} : {} }>
              <ListItemIcon><ArchiveOutlined /></ListItemIcon>
              <ListItemText primary="Archieve" />
            </ListItem>
            
            <ListItem button key="Trash" onClick={()=>{ open && dispatch(setLabelPage('Trash')) }} 
                className={classes.listItemStyle} style={labels === 'Trash' ? {backgroundColor:'#feefc3'} : {} }> 
              <ListItemIcon><DeleteOutlined/></ListItemIcon>
              <ListItemText primary="Trash" /> 
            </ListItem>
          </List> 
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Notes />
      </main>
    </div>
  );
}
