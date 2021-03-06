import React from 'react';
import { useStyles } from '../scss/NoteCardCSS';
import clsx from 'clsx'
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveIcon from '@material-ui/icons/UnarchiveOutlined';
import UnPinIcon from "../assets/images/pin.png";
import PinIcon from "../assets/images/pinned.png";
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import SnackBar from '../util/SnackBar';
import EditNote from './EditNote';
import Truncate from 'react-truncate';
import NoteColor from './NotesColor';
import NoteService from '../service/NoteService'; 
import { useDispatch } from 'react-redux';
import { Typography, Popover, Paper, Avatar, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { callToApi } from '../redux/actions/ApiAction';
import { trashNotes, pinUnpinNotes } from '../redux/actions/NoteAction';

export default function NoteCard(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const anchorRef = React.useRef(null);
    const [visible, setVisibility] = React.useState(false)
    const [snack, setSnack] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const [sty,setSty] = React.useState('');
    const [pin, setPin] = React.useState(props.NoteObj.isPined)
    const [editNote, setEditNote] = React.useState(false);
    const [more, setMore] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSnack(false);
        setSty('');
        setMsg('');
        setMore(false);
    };

    const handlePinChange = (key,bool) => {
        let value = bool ? false : true;
        const data = {
            "isPined":value,
            "noteIdList":[key]       
        }
        NoteService.pinUnpinNotes(data).then((res)=> {
            console.log(res);
            setSnack(true);
            setSty('success');
            if(value === true ){
                setMsg('Note Pined');
            }
            else {
                setMsg('Note Unpined');
            }
            
        })
        .catch((err) => {
            console.log(err);
            setSnack(true);
            setSty('error');
            if(value === true ){
                setMsg('Note Not Pined');
            }
            else {
                setMsg('Note Not Unpined');
            }
        })
        dispatch(pinUnpinNotes(key,value));
        dispatch(callToApi("NOTES"));
    }

    const trashAndRestore = (key,bool) => {
        const data = {
            "isDeleted": bool, 
            "noteIdList": [key]
        }
        NoteService.trashNotes(data).then((res) => {
            console.log(res);
            setSnack(true);
            setSty('success');
            setMsg('Note Trashed');
        })
        .catch((err) => {
            console.log(err);
            setSnack(true);
            setSty('error');
            setMsg('Note Not Trashed');
        })
        dispatch(trashNotes(key,bool));
        dispatch(callToApi("NOTES"));
    }


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderMorePopper = (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                        <MenuItem
                            onClick={() => { trashAndRestore(props.Notekey,true) }}
                            dense
                        >
                            Delete note
                    </MenuItem>
                        <MenuItem onClick={handleClose} dense>Add label</MenuItem>
                        <MenuItem onClick={handleClose} dense>Add drawing</MenuItem>
                        <MenuItem onClick={handleClose} dense>Make a copy</MenuItem>
                        <MenuItem onClick={handleClose} dense>Show checkboxes</MenuItem>
                        <MenuItem onClick={handleClose} dense>Copy to google docs</MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
        </Popover>
    );

    return (
        <>
            <Paper
                component="div"
                className={clsx(classes.root)}
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                style={{
                        boxShadow: visible && '0em 0em 0.4em 0em gray',
                        backgroundColor: props.NoteObj.color,
                        border: props.NoteObj.color === '#ffffff' ? '1px solid #e0e0e0' : '0.1px solid #e0e0e0',
                        marginBottom: window.innerWidth<600 ? '3px' : ''
                    }}
            >
                    <Paper
                        
                        className={clsx(classes.noteTaker)}
                        style={{ backgroundColor: props.NoteObj.color }}
                    >
                        <Typography className={classes.noteTitle}
                            onClick={
                                () => {
                                    setEditNote(true)
                                }
                            }
                        >
                            <Truncate lines={3} ellipsis={<span>...</span>}>
                                {props.NoteObj.title}
                            </Truncate>
                            {props.NoteObj.title}
                        </Typography>
                        <IconButton
                            style={{ visibility: visible || more ? 'visible' : 'hidden' }}
                            className={clsx(classes.pinButton)} onClick={() => {
                                setPin(!pin)
                                handlePinChange(props.Notekey,pin)
                            }}
                        >
                            <Avatar
                                src={pin ? PinIcon : UnPinIcon ? UnPinIcon : PinIcon}
                                className={classes.pinIcon}

                            ></Avatar>
                        </IconButton>
                    </Paper>

                    <Paper
                        className={clsx(classes.noteTaker)}
                        style={{backgroundColor: props.NoteObj.color }}
                        onClick={
                            () => {
                                setEditNote(true)
                            }
                        }
                    >
                        <Typography className={classes.noteContent}>
                            <Truncate lines={16} ellipsis={<span>...</span>}>
                                {props.NoteObj.description}
                            </Truncate>
                            
                        </Typography>
                    </Paper>

                    <Paper
                        style={{backgroundColor: props.NoteObj.color }}
                        className={clsx(classes.chipPaper)}
                    >
                    </Paper>

                    <Paper style={{ backgroundColor: props.NoteObj.color, visibility: more || visible ? 'visible' : 'hidden' }}
                        className={clsx(classes.noteTaker)}
                    >
                        <IconButton className={classes.iconButton}>
                            <AddAlertIcon fontSize="small" />
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <PersonAddIcon fontSize="small" />
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <NoteColor  Notekey={props.Notekey} key={props.key} />
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <ImageIcon fontSize="small" />
                        </IconButton>
                        <IconButton className={classes.iconButton} 
                        onClick={()=>props.HandleArchiveChange(props.Notekey)}>
                            {!props.NoteObj.isArchived ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                        </IconButton>
                        <IconButton className={classes.iconButton}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon fontSize="small" />
                            {renderMorePopper}
                        </IconButton>
                    </Paper>
            </Paper>                
            <EditNote
                handleClose={() => setEditNote(false)}
                NotesObj={props.NoteObj}
                Key={props.Notekey}
                Nkey={props.key}
                open={editNote}
            />

            <SnackBar
                opn={snack}
                msg={msg}
                severity={sty}
                onclose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setSnack(false);
                }}
            />
        </>
    );
}
