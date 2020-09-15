import React from "react";
import '../scss/Notes.scss';
import NotesCollapsed from './NotesCollapsed';
import NotesExpanded from './NotesExpanded';
import NoteCard from './NotesCard'; 
import { Container, ClickAwayListener, Typography } from "@material-ui/core";
import bulbImage from '../assets/images/bulb.png';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderClassName: !false ? 'MainContainer' : 'slideMainContainer',
            noteTakerState: false,
            clickAway: false,
            noteTitle: '',
            noteContent: '',
            pinStatus: false,
            archive: false,
            trash: false,
            pinNotes: null,
            unpinNotes: null,
        };
    }

    handleClickAway = () => {
        this.setState({ clickAway: false });
        if (this.state.noteTitle !== '' || this.state.noteContent !== '') {
            this.setState({
                noteTitle: '',
                noteContent: '',
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
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <div className={this.state.sliderClassName}>
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <div className="noteTaker">
                            {
                                !this.state.clickAway
                                    ? <NotesCollapsed handleNoteTakerClick={() => this.setState({ clickAway: true })} />
                                    : <NotesExpanded
                                        handleClickAway={this.handleClickAway}
                                        noteTitleValue={this.state.noteTitle}
                                        noteContentValue={this.state.noteContent}
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
                        this.state.pinNotes === null && this.state.unpinNotes === null &&
                        <div className="bulbContainer">
                            <img alt="temp background" src={bulbImage} className="bulbImage" />
                            <h2>Notes you add appear here</h2>
                        </div>
                    }

                    {/* {
                        !this.isEmpty(this.state.pinNotes) &&
                        <Typography component="p" color="textPrimary" variant="caption"
                            style={{ marginTop: '4em', marginLeft: '10.5em' }}
                        >
                            PINNED:- {Object.keys(this.state.pinNotes).length}
                        </Typography>
                    }
                    <Masonry className={!this.props.toggleView ? "gridView" : "listView"}>
                        {
                            this.state.pinNotes !== null &&
                            Object.getOwnPropertyNames(this.state.pinNotes).map((key, index) => (
                                <NoteCard
                                    key={key}
                                    Notekey={key}
                                    NoteObj={this.state.pinNotes[key]}
                                    ToggleView={this.props.toggleView}
                                    HandleArchiveChange={this.handleArchiveChange}
                                />
                            ))
                        }
                    </Masonry>
                    {
                        !this.isEmpty(this.state.pinNotes) && !this.isEmpty(this.state.unpinNotes) &&
                        <Typography component="p" color="textPrimary" variant="caption"
                            style={{ marginTop: '3em', marginLeft: '10.5em' }}
                        >
                            OTHERS:- {Object.keys(this.state.unpinNotes).length}
                        </Typography>
                    }

                    <Masonry className={!this.props.toggleView ? "gridView" : "listView"}>
                        {
                            this.state.unpinNotes !== null &&
                            Object.getOwnPropertyNames(this.state.unpinNotes).map((key, index) => (
                                <NoteCard
                                    key={key}
                                    Notekey={key}
                                    NoteObj={this.state.unpinNotes[key]}
                                    ToggleView={this.props.toggleView}
                                    HandleArchiveChange={this.handleArchiveChange}
                                />
                            ))
                        }
                    </Masonry> */}
                </div>
            </Container>
        );
    }
}
export default Notes;