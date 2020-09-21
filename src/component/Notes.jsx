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
            pinNotes: null,
            unpinNotes: null,
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
        if(this.state.noteTitle!=='') {
            var newId = this.props.notes.length+1;
            const data = {
                id:newId,
                noteTitle: this.state.noteTitle,
                noteContent: this.state.noteContent,
                noteColor: this.state.noteColor,
                pinStatus: this.state.pinStatus,
                archive: this.state.archive,
                trash: this.state.trash,
            }
            this.props.addNote(data);
        }
        
        if (this.state.noteTitle !== '' || this.state.noteContent !== '') {
            const data2 = {
                "title": this.state.noteTitle,
                "description": this.state.noteContent,
                "color": this.state.noteColor,
                "isPined": this.state.pinStatus,
                "isArchive": this.state.archive,
                "isDeleted": this.state.trash,
            }
            
            NoteService.addNote(data2).then((res) => {
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
            const notes = res.data.data.data;
            this.setState({
                getNotes:notes
            },)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    isEmpty = (obj) => {
    }

    componentDidMount() {
          this.getData();  
    }

    render() {
        if(this.props.apiCall === "NOTES") {
            this.getData();
            this.props.noCall("");
        }
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
                        this.state.getNotes.length === 0 &&
                        <div className="bulbContainer">
                            <img alt="temp background" src={bulbImage} className="bulbImage" />
                            <h2 style={{color:'#80868b'}}>Notes you add appear here</h2>
                        </div>
                    }

    
                <Masonry>
                    <div className="noteTaker" style={{display:'flex',flexWrap:'wrap', 
                        paddingLeft: this.props.openDrawer && this.props.onHover ? '9%' 
                                        : this.props.openDrawer ? '1.6%' :'9%'}}>
                    
                    {
                        this.state.getNotes.length>0 && 
                        this.state.getNotes.map((key,index)=>{
                            if(key.isDeleted === false) {
                                return <NoteCard
                                    key={index}
                                    Notekey={key.id}
                                    NoteObj={key}
                                    HandleArchiveChange={this.handleArchiveChange}
                                />
                            }
                        })
                    }
                    </div>
                    </Masonry>
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