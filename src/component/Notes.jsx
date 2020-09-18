import React from "react";
import '../scss/Notes.scss';
import NotesCollapsed from './NotesCollapsed';
import NotesExpanded from './NotesExpanded';
import NoteCard from './NotesCard';
import { Container, ClickAwayListener } from "@material-ui/core";
import bulbImage from '../assets/images/bulb.png';
import { connect } from 'react-redux';
import { addNote, removeNote } from "../redux/actions/NoteAction";
import NoteService from '../service/NoteService';

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
            pinNotes: null,
            unpinNotes: null,
        };
    }

    handleClickAway = () => {
        this.setState({ clickAway: false });
        if(this.state.noteTitle!=='') {
            var newId = this.props.notes.length+1;
            const data = {
                id:newId,
                noteTitle: this.state.noteTitle,
                noteContent: this.state.noteContent,
                noteContent: this.state.noteColor,
                pinStatus: this.state.pinStatus,
                archive: this.state.archive,
                trash: this.state.trash,
            }
            this.props.addNote(data);
        }
        
        if (this.state.noteTitle !== '' || this.state.noteContent !== '') {
            const data2 = {
                title: this.state.noteTitle,
                description: this.state.noteContent,
                noteContent: this.state.noteColor,
                isPined: this.state.pinStatus,
                isArchive: this.state.archive,
                isDeleted: this.state.trash,
            }
            
            NoteService.addNote(data2).then((res) => {
                console.log(res);
            })
			.catch((err) => {
                console.log(err);
            })
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

    isEmpty = (obj) => {
    }

  render() {
        return (
            <Container>
                <div className={this.state.sliderClassName}>
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
                        this.props.notes.length === 0 &&
                        <div className="bulbContainer">
                            <img alt="temp background" src={bulbImage} className="bulbImage" />
                            <h2 style={{color:'#80868b'}}>Notes you add appear here</h2>
                        </div>
                    }

    
                    <div className="noteTaker" style={{display:'flex',flexWrap:'wrap',padding:'3%'}}>
                    {
                        this.props.notes.length>0 && 
                        this.props.notes.map((key,index)=>{
                            return <NoteCard
                                    key={index}
                                    Notekey={key.notes.id}
                                    NoteObj={key.notes}
                                    HandleArchiveChange={this.handleArchiveChange}
                                />
                        })
                    }
                    </div>
              </div>
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
        notes:state.note.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: (data)=> dispatch(addNote(data)),
        removeNote:(id)=>dispatch(removeNote(id))
    }
}

export default connect(mapToStateProps,mapDispatchToProps)(Notes);