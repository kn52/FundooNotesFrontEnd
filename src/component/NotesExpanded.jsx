import React, { useState } from 'react';
import '../scss/Notes.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Button, InputBase, IconButton  } from '@material-ui/core';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import UnarchiveIcon from '@material-ui/icons/UnarchiveOutlined';
import UnPinIcon from "../assets/images/pin.png"; 
import PinIcon from "../assets/images/pinned.png"; 
import NotesColor from './NotesColor';

const useStyles = makeStyles(theme => ({

    root: {
        border:'none',
        padding: '1px 10px',
        display: 'flex',
        flexDirection: "column",
        width: 590,
        borderRadius: '8px',
        boxShadow:'0.1em 0.1em 0.5em 0.1em #636363',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%'
        },
    },

    inputTitle: {
        marginLeft: theme.spacing(1),
        paddingTop: theme.spacing(1),
        flex: 1,
        fontWeight: 'bold',
    },

    inputNote: {
        marginLeft: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        flex: 1,
    },

    iconButton: {
        width:'32px',
        height: '32px',
        margin: 8,
        paddingTop: 5,
        marginLeft: theme.spacing(1),
        color: '#545454',
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(0),
            margin: theme.spacing(0, 0.6),
        },
    },
  
    closeButton: {
        width:'32px',
        height: '32px',
        margin: 8,
        paddingTop: 5,
        marginLeft: theme.spacing(29),
        textTransform: 'capitalize',
        [theme.breakpoints.down(411)]: {
            marginLeft: theme.spacing(28),
        },

        [theme.breakpoints.down(414)]: {
            marginLeft: theme.spacing(25),
        },
    },
  
    noteTaker:{
        border:'none',
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        width: 570,
        boxSizing:'none',
        boxShadow:'0.1em 0.1em 0.4em 0em #fff',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%'
        },
    },

    pinButton: {
        width:'32px',
        height: '32px',
        marginTop: 8,
    },

    pinIcon: {
        width:'20px',
        height: '25px',
        marginTop: -8,
        paddingTop: 1,
    },

}));

export default function NotesExpanded(props) {
    const classes = useStyles();

    const [color,setColor]=useState('white');

    const updateColor = (colors) => {
        setColor({color:colors});
        console.log(color) 
    }

    return (
        <Paper component="div" className={classes.root} style={{backgroundColor:color}} >
            <Paper className={classes.noteTaker} style={{backgroundColor:color}}>
                <InputBase
                    className={classes.inputTitle}
                    placeholder="Title"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={props.noteTitleValue}
                    name="noteTitle"
                    onChange={props.handleNoteChange}
                    autoComplete={false}
                />
                <IconButton 
                    className={classes.pinButton}
                    onClick={ props.HandlePinStatusChange }
                >
                    <Avatar src={ !props.pinStatus ? UnPinIcon : PinIcon } className={classes.pinIcon}></Avatar>
                </IconButton>
            </Paper>
            <Paper className={classes.noteTaker} style={{backgroundColor:color}}>
                <InputBase
                    className={classes.inputNote}
                    placeholder="Take a note..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={props.noteContentValue}
                    name="noteContent"
                    onChange={props.handleNoteChange}
                    multiline={true}
                    autoFocus
                    autoComplete={false}
                />
            </Paper>
            <Paper className={classes.noteTaker} style={{backgroundColor:color}}>
                <IconButton className={classes.iconButton}>
                    <AddAlertIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <PersonAddIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <NotesColor fontSize="small" onchange={updateColor}/>
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <ImageIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}
                    onClick = {props.HandleArchiveChange}
                >
                    {!props.Archive ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
                <Button id="ex_close_button"
                    onClick={props.handleClickAway}
                >
                    Close
                </Button>
            </Paper>
        </Paper>
      );
}
