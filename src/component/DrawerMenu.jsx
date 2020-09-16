import { EmojiObjectsOutlined, NotificationsOutlined } from "@material-ui/icons";
import { CreateOutlined, ArchiveOutlined, DeleteOutlined } from '@material-ui/icons';
import setLabelPage from '../redux/actions/LabelAction';
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
import Notes from './Notes';
import { withRouter} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const DrawerMenu = () => {

  const classes = useStyle();

  const labels = useSelector(state=>state.label.currentLabelId);
  const open = useSelector(state=>state.drawer.openDrawer)

  const  dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
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
          </List> 
          <List className={classes.listStyle2}>
            <ListItem button key="Edit Label" className='listItemStyle'>
              <ListItemIcon><CreateOutlined/></ListItemIcon>
              <ListItemText primary="Edit Label" />
            </ListItem>
          </List> 
          <List className={classes.listStyle}>
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
        </div>
      </Drawer>
      <main >
        { labels === 'Fundoo' && <Notes opn={open}/>}
      </main>
    </div>
  );
}

export default withRouter(DrawerMenu);
