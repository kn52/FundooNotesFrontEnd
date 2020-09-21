import React from 'react';
// import { useStyle } from '../scss/NoteCardCSS';
import { Paper, Typography } from '@material-ui/core';
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton';
import SnackBar from "../util/SnackBar";
import EditNotetrash from './EditNoteTrash'
import { RestoreFromTrashOutlined, DeleteForeverOutlined } from '@material-ui/icons';
import NoteService from '../service/NoteService';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { callToApi } from '../redux/actions/ApiAction';

const useStyles = makeStyles(theme => ({

    root: {
        display: 'flex',
        padding: theme.spacing(0, 1.5),
        paddingTop: theme.spacing(0.5),
        flexDirection: "column",
        width: 235,
        maxWidth: 235,
        height: 'fit-content',
        borderRadius: '8px',
        boxShadow:'none',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0.5),
        marginRight: theme.spacing(1.5),
        minHeight: '60px',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            maxWidth: '90%',
            marginLeft: theme.spacing(-1),
            marginRight: theme.spacing(0),
        },
    },

    rootList:{
        maxWidth: '95%',
        width: '95%',
    },

    noteTaker:{
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'nowrap',
        justifyContent: "space-between",
        width: 210,
        maxWidth: 210,
        border: 'none',
        boxShadow:'none',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%',
        },
    },

    paperList:{
        display: 'flex',
        flexWrap: 'nowrap',
        maxWidth: '95%',
        width: '95%',
    },

    chipPaper:{
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "flex-start",
        width: 210,
        maxWidth: 210,
        border: 'none',
        boxShadow:'none',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%',
        },
    },

    noteTitle: {
        textAlign: 'left',
        marginLeft: theme.spacing(0),
        paddingTop: theme.spacing(0.5),
        flex: 1,
        wordBreak: 'break-all',
        fontSize: '1rem',
        letterSpacing: '.00625em',
        fontWeight: 500,
        lineHeight: '1.5rem',
    },

    noteContent: {
        textAlign: 'left',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        wordBreak: 'break-all',
        fontSize: '.875rem',
        fontWeight: 400,
        maxWidth: '95%',
        width: '95%',
        letterPpacing: '.01428571em',
        lineHeight: '1.25rem',
        flex: 1,
    },

    iconButton: {
        width:'32px',
        height: '32px',
        margin: theme.spacing(0.5, 0),
        paddingTop: 5,
        marginLeft: theme.spacing(0),
        color: '#545454',
    },

    pinButton: {
        width: '32px',
        height: '32px',
        paddingTop: 5,
    },

    pinButtonList: {
        width: '32px',
        height: '32px',
        paddingTop: 5,
        position: 'absolute',
        marginLeft: theme.spacing(62),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(56),
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(10),
        },
    },

    pinIcon: {
        width:'15px',
        height: '25px',
    },

    morePopper:{
        zIndex: 1,
    },

    close: {
        padding: theme.spacing(0.5),
    },

    popover: {
        '& .MuiPaper-elevation8':{
            boxShadow: 'none',
        }
    },

    paper: {
        padding: theme.spacing(1),
    },
}));


export default function NoteInTrash(props) {
    const classes = useStyles(); 
 
    const dispatch = useDispatch();

    const [visible, setVisibility] = React.useState(false)
    const [opn, setSnack] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const [sty, setSty] = React.useState(null);
    const [editNote, setEditNote] = React.useState(false);

    const trashAndRestore = (key,bool) => {
        const data = {
            "isDeleted": bool, 
            "noteIdList": [key]
        }
        NoteService.trashNotes(data).then((res)=>{
            console.log(res.data.data);
            let getnotes=res.data.data.data; 
            this.setState({notes:getnotes})
        })
        .catch((err)=>{
            console.log(err);
        })
        dispatch(callToApi("TRASH"));
    }
    
    const deleteNotesdata = (key) => {
        const  data = {
            "noteIdList":[key]
        }
        NoteService.deleteForeverNotes(data).then((res)=>{
           console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        dispatch(callToApi("TRASH"));
    }

    return (
        <>
            <Paper
                component="div"
                className={clsx(classes.root)}
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                style={{border:'1px solid #e0e0e0',backgroundColor:props.NoteObj.color}}
            >
                <Paper
                    className={clsx(classes.noteTaker)} style={{backgroundColor:props.NoteObj.color}}
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
                </Paper>
                <Paper
                    className={clsx(classes.noteTaker)} style={{backgroundColor:props.NoteObj.color}}
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
                    className={clsx(classes.noteTaker)}
                    style={{ backgroundColor:props.NoteObj.color,
                        visibility: visible ? 'visible' : 'hidden', justifyContent: 'flex-start' }}
                >
                    <IconButton className={classes.iconButton}
                        onClick={() => {
                            setSnack(true)
                            setMsg('Note delete forever')
                            deleteNotesdata(props.Notekey)
                        }  }
                    >
                        <DeleteForeverOutlined fontSize="small" />
                    </IconButton>
                    <IconButton className={classes.iconButton}
                        onClick={() => {
                            setSnack(true)
                            setMsg('Note restored')
                            trashAndRestore(props.Notekey, false)
                        }}
                    >
                        <RestoreFromTrashOutlined fontSize="small" />
                    </IconButton>
                </Paper>
            </Paper>

            <EditNotetrash
                handleClose={() => setEditNote(false)}
                open={editNote}
                NotesObj={props.NoteObj}
                Key={props.Notekey}
            />

            <SnackBar
                open={opn}
                msg={msg}
                handleClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setSnack(false);
                }}
            />
        </>
    );
}