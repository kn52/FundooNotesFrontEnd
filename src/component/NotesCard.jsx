import React from 'react';
import { useStyles } from '../scss/NoteCardCSS';
import { Paper, Typography, Avatar, Chip } from '@material-ui/core';
import clsx from 'clsx'
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveIcon from '@material-ui/icons/UnarchiveOutlined';
import UnPinIcon from "../assets/images/pin.png";
import PinIcon from "../assets/images/pinned.png";
import ClockIcon from '@material-ui/icons/AccessTimeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
// import SnackBar from "./SnackBar";
import EditNote from './EditNote';
import NoteColor from './NotesColor';
// import MoreOption, { removeLabelUncheck } from './MoreOption';
// import { UserProvider } from '../UserContext'
// import SetReminder from './SetReminder';
// import moment from 'moment';

export default function NoteCard(props) {

    const classes = useStyles();
    const [visible, setVisibility] = React.useState(false)
    const [snack, setSnack] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const toggleView = props.ToggleView
    const [editNote, setEditNote] = React.useState(false);
    const [more, setMore] = React.useState(false)
    const [labels, setLabels] = React.useState(null);

    return (
        <>
            <Paper
                component="div"
                className={clsx(classes.root)}
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                style={
                    {
                        boxShadow: visible && '0em 0em 0.4em 0em gray',
                        backgroundColor: props.NoteObj.color,
                        border: props.NoteObj.color === '#ffffff' ? '1px solid #e0e0e0' : '1px solid #e0e0e0',
                    }
                }
            >
                    <Paper
                        
                        className={clsx(classes.noteTaker)}
                        style={{backgroundColor: props.NoteObj.noteColor }}
                    >
                        <Typography className={classes.noteTitle}
                            onClick={
                                () => {
                                    setEditNote(true)
                                }
                            }
                        >
                            {props.NoteObj.title}
                        </Typography>
                        <IconButton
                            style={{ visibility: visible || more ? 'visible' : 'hidden' }}
                            className={clsx(classes.pinButton, {
                                [classes.pinButtonList]: toggleView,
                            })}
                        >
                            <Avatar
                                src={!props.NoteObj.PinStatus ? UnPinIcon : PinIcon}
                                className={classes.pinIcon}

                            ></Avatar>
                        </IconButton>
                    </Paper>

                    <Paper
                        className={clsx(classes.noteTaker, {
                            [classes.paperList]: props.ToggleView,
                        })}
                        style={{backgroundColor: props.NoteObj.noteColor }}
                        onClick={
                            () => {
                                setEditNote(true)
                            }
                        }
                    >
                        <Typography className={classes.noteContent}>
                            {props.NoteObj.description}
                        </Typography>
                    </Paper>

                    <Paper
                        style={{backgroundColor: props.NoteObj.noteColor }}
                        className={clsx(classes.chipPaper, {
                            [classes.paperGrid]: props.ToggleView,
                        })}
                    >
                        {/* {
                            false ? <Chip 
                            icon={<ClockIcon />}
                            size="small"
                            style={{
                                margin: '10px 4px 4px 0px'
                            }}
                        /> 
                        : {} } */}
                    </Paper>

                    <Paper style={{ backgroundColor: props.NoteObj.noteColor, visibility: more || visible ? 'visible' : 'hidden' }}
                        className={clsx(classes.noteTaker, {
                            [classes.paperGrid]: props.ToggleView,
                        })}
                    >
                        <IconButton className={classes.iconButton}>
                            <AddAlertIcon fontSize="small" />
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <PersonAddIcon fontSize="small" />
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <NoteColor  Notekey={props.Notekey} />
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <ImageIcon fontSize="small" />
                        </IconButton>
                        <IconButton className={classes.iconButton}
                        >
                            {!props.NoteObj.Archive ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                        </IconButton>
                        <IconButton className={classes.iconButton}
                        >
                            <MoreVertIcon fontSize="small"/>
                        </IconButton>
                    </Paper>
            </Paper>

            <EditNote
                handleClose={() => setEditNote(false)}
                NotesObj={props.NoteObj}
                Key={props.Notekey}
                open={editNote}
            />

            {/* <SnackBar
                open={snack}
                msg={msg}
                handleClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setSnack(false);
                }}
            /> */}
        </>
    );
}
