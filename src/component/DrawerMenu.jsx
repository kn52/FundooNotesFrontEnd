import React from 'react';
import clsx from 'clsx';
import setLabelPage from '../redux/actions/LabelAction';
import { EmojiObjectsOutlined, NotificationsOutlined } from "@material-ui/icons";
import { CreateOutlined, ArchiveOutlined, DeleteOutlined } from '@material-ui/icons';
import { Drawer,List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import useStyle from '../scss/DrawerMenuCSS';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawerOpen, toggleDrawerClose } from '../redux/actions/DrawerAction';
import { toggleHoverOpen, toggleHoverClose } from '../redux/actions/DrawerAction';
import { useHistory } from 'react-router-dom';

function DrawerMenu() {
  const classes = useStyle();
  const history = useHistory();

  const labels = useSelector(state=>state.label.currentLabelId);
  const open = useSelector(state=>state.drawer.openDrawer);
  const onhover = useSelector(state=>state.drawer.onHover);
  
  const handleOnHover = () => {
      if(open === false && onhover === false) {
        dispatch(toggleHoverOpen())
        dispatch(toggleDrawerOpen())
      }
      if(open === true && onhover === true){
        dispatch(toggleHoverClose())
        dispatch(toggleDrawerClose())
      }
  }

  const dispatch = useDispatch(); 
  
  return (
    <>
      <Drawer
        id="draw"
        style={ open && onhover ? {position:'absolute'} : {position: ''}}
        variant="permanent"
		    onMouseEnter={ ()=> { open ? dispatch(toggleHoverClose()) : handleOnHover() } }
        onMouseLeave={ ()=> { handleOnHover() } }
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
        <div className={classes.toolbar}></div>
        <List className={classes.listStyle}>
            <ListItem button autoFocus key="Notes" onClick={()=>{ open &&  dispatch(setLabelPage('Fundoo')) 
                history.push('/dashboard/notes')}} 
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
            <ListItem button key="Archieve" onClick={()=>{ open && dispatch(setLabelPage('Archieve'))
              history.push('/dashboard/archive') }} 
                className={classes.listItemStyle} style={labels === 'Archieve' ? {backgroundColor:'#feefc3'} : {} }>
              <ListItemIcon><ArchiveOutlined /></ListItemIcon>
              <ListItemText primary="Archieve" />
            </ListItem>
            
            <ListItem button key="Trash" onClick={()=>{ open && dispatch(setLabelPage('Trash'))
               history.push('/dashboard/trash')}} 
                className={classes.listItemStyle} style={labels === 'Trash' ? {backgroundColor:'#feefc3'} : {} }> 
              <ListItemIcon><DeleteOutlined/></ListItemIcon>
              <ListItemText primary="Trash" /> 
            </ListItem>
          </List> 
      </Drawer>
    </>
  );
}

export default DrawerMenu;