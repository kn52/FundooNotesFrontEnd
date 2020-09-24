import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { RestoreFromTrashOutlined, DeleteForeverOutlined } from '@material-ui/icons';
import NoteService from '../service/NoteService';
import { useDispatch } from 'react-redux';
import SnackBar from '../util/SnackBar';
import { callToApi } from '../redux/actions/ApiAction';
import { trashNotes, deleteForeverNotes } from '../redux/actions/NoteAction';

const useStyles = makeStyles(theme => ({

    paper: {
        display: 'flex',
        flexDirection: "column",
        border: '2px solid white',
        borderRadius: '30px',
        boxShadow: '0.1em 0.1em 0.5em 0.1em #636363',
    },

    inputTitle: {
        marginLeft: theme.spacing(0.5),
        paddingTop: theme.spacing(1),
        flex: 1,
        fontSize: '22px',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },

    inputNote: {
        marginLeft: theme.spacing(0.5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        fontSize: '20px',
        flex: 1,
    },

    iconButton: {
        width: '32px',
        height: '32px',
        paddingTop: 5,
        marginTop: 8,
        marginRight: theme.spacing(1.5),
        color: '#545454',
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(0),
        },
    },

    closeButton: {
        width: '32px',
        height: '32px',
        margin: 8,
        paddingTop: 5,
        marginLeft: theme.spacing(13),
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(30),
        },
    },

    noteTaker: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-around',
        width: 570,
        marginTop: theme.spacing(-1),
        marginLeft: theme.spacing(-1),
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },

    pinButton: {
        width: '32px',
        height: '32px',
        marginTop: 5,

    },

    pinIcon: {
        width: '20px',
        height: '25px',
        marginTop: -4,
    },

}));

export default function EditNote(props) {
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const [title] = React.useState(props.NotesObj.title)
    const [content] = React.useState(props.NotesObj.description)
    const [snack, setSnack] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const [sty, setSty] = React.useState(null);

    const trashAndRestore = (key,bool) => {
        const data = {
            "isDeleted": bool, 
            "noteIdList": [key]
        }
        NoteService.trashNotes(data).then((res)=>{
            console.log(res.data.data);
            let getnotes=res.data.data.data; 
            this.setState({notes:getnotes})
            setSnack(true);
            setSty('success');
            setMsg('Note Restored');
        })
        .catch((err)=>{
            console.log(err);
            setSnack(true);
            setSty('error');
            setMsg('Note Not Restored');
        })
        dispatch(trashNotes(key,bool))
        dispatch(callToApi("TRASH"));
    }
    
    const deleteNotesdata = (key) => {
        const  data = {
            "noteIdList":[key]
        }
        NoteService.deleteForeverNotes(data).then((res)=>{
           console.log(res);
           setSnack(true);
            setSty('success');
            setMsg('Note Deleted');
        })
        .catch((err)=>{
            console.log(err);
            setSnack(true);
            setSty('error');
            setMsg('Note Not Deleted');
        })
        dispatch(deleteForeverNotes(key));
        dispatch(callToApi("TRASH"));
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" 
                className={classes.paper} >
                <DialogTitle style={{backgroundColor:props.NotesObj.color}}>
                    <Paper className={classes.noteTaker} style={{boxShadow:'none',backgroundColor:props.NotesObj.color}}>
                        <Typography style={{backgroundColor:props.NotesObj.color}}
                            className={classes.inputTitle}
                        > {title} </Typography>
                    </Paper>

                </DialogTitle>
                <DialogContent style={{backgroundColor:props.NotesObj.color}}>
                    <Paper className={classes.noteTaker} style={{boxShadow:'none',backgroundColor:props.NotesObj.color}}>
                        <Typography
                            className={classes.inputNote}
                        > {content} </Typography>
                    </Paper>
                </DialogContent>
                <DialogActions style={{backgroundColor:props.NotesObj.color}}>
                    <Paper className={classes.noteTaker} style={{boxShadow:'none',backgroundColor:props.NotesObj.color, justifyContent: 'flex-start' }}>
                        <IconButton className={classes.iconButton}
                            onClick={() => {
                                props.handleClose()
                                deleteNotesdata(props.Key)
                            }}
                        >
                            <DeleteForeverOutlined fontSize="small" />
                        </IconButton>
                        <IconButton className={classes.iconButton}
                            onClick={() => {
                                props.handleClose()
                                trashAndRestore(props.Key, false)
                            }}
                        >
                            <RestoreFromTrashOutlined fontSize="small" />
                        </IconButton>
                    </Paper>
                </DialogActions>
            </Dialog>
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
        </div>
    );
}
