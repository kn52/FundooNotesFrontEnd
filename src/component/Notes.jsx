import React from "react";
import '../scss/Notes.scss';
import NotesCollapsed from './NotesCollapsed';
import NotesExpanded from './NotesExpanded';
import NoteCard from './NotesCard';
import { Typography, Container, ClickAwayListener } from "@material-ui/core";
import bulbImage from '../assets/images/bulb.png';
import { connect } from 'react-redux';
import { addNote, removeNote } from "../redux/actions/NoteAction";
import NoteService from '../service/NoteService';
import SnackBar from '../util/SnackBar';
import Masonry from 'react-masonry-component';
import { noCallToApi } from '../redux/actions/ApiAction';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderClassName: !this.props.openDrawer ? 'MainContainer' : 'slideMainContainer',
            noteTakerState: false,
            clickAway: false,
            noteTitle: '',
            noteContent: '',
            noteColor:'white',
            pinStatus: false,
            archive: false,
            trash: false,
            pinNotes: [],
            unpinNotes: [],
            opn:false,
            msg:'',
            sty:'',
            getNotes:[]
        };
    }

    handleSnackClose() {
        this.setState({
            opn:false,
            msg:'',
            sty:'',
        })
    }

    handleClickAway = () => {
        this.setState({ clickAway: false });
        if (this.state.noteTitle !== '' || this.state.noteContent !== '') {
            const data = {
                "title": this.state.noteTitle,
                "description": this.state.noteContent,
                "color": this.state.noteColor,
                "isPined": this.state.pinStatus,
                "isArchive": this.state.archive,
                "isDeleted": this.state.trash,
            }
            
            NoteService.addNote(data).then((res) => {
                console.log(res);
                this.setState({
                    opn:true,
                    msg:'Note Added Successfully',
                    sty:'success'  
                })
            })
			.catch((err) => {
                console.log(err);
                this.setState({
                    opn:true,
                    msg:'Not Added',
                    sty:'error'  
                })
            })
            this.getData();
            this.setState({
                noteTitle: '',
                noteContent: '',
                noteColor:'',
                pinStatus: false,
                Archive: false,
            })
        }
    };

    handleNoteChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    };

    handleArchiveChange = () => {
        this.setState({
            archive: !this.state.archive
        })
    }

    getData() {
        NoteService.getNotes().then((res) => {
            console.log(res.data);
            const notes=res.data.data.data.reverse();
            const pinNotes=notes.filter((notes) => notes.isPined === true);
            let unPinNotes=notes.filter((notes) => notes.isPined === false);
            console.log(unPinNotes);
            this.setState({
                pinNotes: pinNotes,
                unpinNotes: unPinNotes,
                getNotes:notes
            })
        })
        .catch((err) => {
            console.log(err);
        })

        this.props.noCall("");
    }

    isEmpty = (obj) => {
    }

    componentDidMount() {
          this.getData();  
    }

    render() {
        if(this.props.apiCall === "NOTES") {
            this.getData();
        }
        return (
            <Container>
                <div className={this.state.sliderClassName}>
                    <div style={{display:'flex',flexDirection:'column', flexWrap:'wrap',width:'80.81%'}}>
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <div className="noteTaker" style={{display:'flex',justifyContent:'center'}}>
                            {
                                !this.state.clickAway
                                    ? <NotesCollapsed handleNoteTakerClick={() => this.setState({ clickAway: true })} />
                                    : <NotesExpanded
                                        handleClickAway={ ()=> {this.handleClickAway()} }
                                        noteTitleValue={this.state.noteTitle}
                                        noteContentValue={this.state.noteContent}
                                        noteColorvalue={this.state.noteColor}
                                        handleNoteChange={this.handleNoteChange}
                                        HandlePinStatusChange={() => this.setState({ pinStatus: !this.state.PinStatus })}
                                        pinStatus={this.state.pinStatus}
                                        Archive={this.state.archive}
                                        HandleArchiveChange={this.handleArchiveChange}
                                    />
                            }
                        </div>
                    </ClickAwayListener>
                    { 
                        (this.state.pinNotes.length === 0 && this.state.unpinNotes.length === 0) &&
                        <div className="bulbContainer">
                            <img alt="temp background" src={bulbImage} className="bulbImage" />
                            <h2 style={{color:'#80868b'}}>Notes you add appear here</h2>
                        </div>
                    }
                    
                    {
                        this.state.pinNotes.length > 0 &&
                        <Typography component="p" color="textPrimary" variant="caption"
                            style={{ marginTop: '4em', marginLeft: '0em' }}
                        >
                            PINNED:- {Object.keys(this.state.pinNotes).length}
                        </Typography>
                    }
    
                    <Masonry>
                        {
                            this.state.pinNotes.length>0 && 
                            this.state.pinNotes.map((key,index)=>{
                                if(key.isDeleted === false) {
                                    return <NoteCard
                                        key={index}
                                        Notekey={key.id}
                                        NoteObj={key}
                                        HandleArchiveChange={this.handleArchiveChange}
                                    />
                                }
                                return '';
                            })
                        }
                    </Masonry>

                    {
                        this.state.unpinNotes.length > 0 &&
                        <Typography component="p" color="textPrimary" variant="caption"
                            style={{ marginTop: '3em', marginLeft: '0em' }}
                        >
                            OTHERS:- {Object.keys(this.state.unpinNotes).length}
                        </Typography> 
                    }

                    <Masonry>
                        {
                            this.state.unpinNotes.length>0 && 
                            this.state.unpinNotes.map((key,index)=>{
                                if(key.isDeleted === false) {
                                    return <NoteCard
                                        key={index}
                                        Notekey={key.id}
                                        NoteObj={key}
                                        HandleArchiveChange={this.handleArchiveChange}
                                    />
                                }
                                return '';
                            })
                        }
                    </Masonry>
                    </div>      
                </div>
                <SnackBar opn={this.state.opn} msg={this.state.msg} severity={this.state.sty} 
                        onclose={()=>{this.handleSnackClose()}}/>
            </Container>
        );
    }
}

const mapToStateProps = state => {
    if(state.note.notes.length>0){
        console.log(state.note.notes[0]);
    }
    return {
        openDrawer: state.drawer.openDrawer,
        onHover: state.drawer.onHover,
        notes:state.note.notes,
        apiCall: state.api.apiName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: (data)=> dispatch(addNote(data)),
        removeNote:(id)=>dispatch(removeNote(id)),
        noCall: (name)=> dispatch(noCallToApi(name)),
    }
}

export default connect(mapToStateProps,mapDispatchToProps)(Notes);