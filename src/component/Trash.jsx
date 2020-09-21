import React, { Component } from 'react';
import '../scss/Notes.scss';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { Container } from "@material-ui/core";
import { useStyles } from '../scss/NoteCardCSS';
import { Paper, Typography } from '@material-ui/core';
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton';
import SnackBar from "../util/SnackBar";
import EditNotetrash from './EditNoteTrash'
import { RestoreFromTrashOutlined, DeleteForeverOutlined } from '@material-ui/icons';
import NoteService from '../service/NoteService';

class Trash extends Component {
    constructor(props){
        super(props);
        this.state={
            sliderClassName: !this.props.drawerOpen ? 'MainContainer' : 'slideMainContainer' ,
            notes: null,
        };
    }

    static getDerivedStateFromProps(props, state){
        
        if(!window.matchMedia("(max-width: 1000px)").matches){
            return {
                ...state,
                sliderClassName : !props.drawerOpen ? 'MainContainer' : 'slideMainContainer'
            }
        }   
    }

    getTrashNotes(){
        NoteService.getTrashNotes().then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    componentDidMount() {
        this.getTrashNotes()
    }

    render() {
        return (
            <Container style={{marginTop: '6em'}}>

                <div className={this.state.sliderClassName}>

                    <Masonry>
                        {
                            this.state.notes !== null
                            ?   Object.getOwnPropertyNames(this.state.notes).map((key, index) => (
                                    <NoteTrash 
                                        Notekey = {key}
                                        NoteObj = {this.state.notes[key]}
                                        key={key}
                                    />
                                ))
                            : null
                        }
                    </Masonry>
                    
                </div>
            </Container>
        );
    }
}

const NoteTrash = (props) => {
    const classes = useStyles();
 
    const [visible, setVisibility] = React.useState(false)
    const [opn, setSnack] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const [sty, setSty] = React.useState(null);
    const [editNote, setEditNote] = React.useState(false);

    const trashAndRestore = (key,bool) => {}
    
    const deleteNotesdata = (key) => {

    }

    return (
        <>
            <Paper
                component="div"
                className={clsx(classes.root)}
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                style={{ boxShadow: visible && '0em 0em 0.4em 0em gray' }}
            >
                <Paper
                    className={clsx(classes.noteTaker)}
                >
                    <Typography className={classes.noteTitle}
                        onClick={
                            () => {
                                setEditNote(true)
                            }
                        }
                    >
                        {props.NoteObj.Title}
                    </Typography>
                </Paper>
                <Paper
                    className={clsx(classes.noteTaker)}
                    onClick={
                        () => {
                            setEditNote(true)
                        }
                    }
                >
                    <Typography className={classes.noteContent}>
                        {props.NoteObj.Content}
                    </Typography>
                </Paper>
                <Paper
                    className={clsx(classes.noteTaker)}
                    style={{ visibility: visible ? 'visible' : 'hidden', justifyContent: 'flex-start' }}
                >
                    <IconButton className={classes.iconButton}
                        onClick={() => {
                            setSnack(true)
                            setMsg('Note delete forever')
                            deleteNotesdata(props.Notekey)
                        }
                        }
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

const mapToStateProps = state => {
    return {
        drawerOpen: state.drawer.drawerOpen,
    }
}

export default connect(mapToStateProps)(Trash);