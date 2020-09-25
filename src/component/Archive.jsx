import React, { Component } from 'react';
import '../scss/Notes.scss';
import Masonry from 'react-masonry-component';
import NoteCard from './NotesCard';
import { connect } from 'react-redux';
import { ArchiveOutlined } from '@material-ui/icons';
import { Container } from "@material-ui/core";
import { noCallToApi,callToApi } from '../redux/actions/ApiAction';
import { addNote, archiveNotes } from "../redux/actions/NoteAction";
import NoteService from '../service/NoteService';

class Archive extends Component {
    constructor(props){
        super(props);
        this.state={
            sliderClassName: !this.props.drawerOpen ? 'trashContainer' : 'slideMainContainer' ,
            notes: [],
        };
    }

    handleArchiveChange = (key) => {
        console.log("Hi")
        this.setState({
            archive: !this.state.archive
        })
        const data = {
            "isArchived":false,
            "noteIdList":[key]
        }
        NoteService.archiveNotes(data).then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
        this.props.archive(key,false);
        this.props.callApi("ARCHIVE");
    }

    static getDerivedStateFromProps(props, state){
        
        if(!window.matchMedia("(max-width: 1000px)").matches){
            return {
                ...state,
                sliderClassName : !props.drawerOpen ? 'trashContainer' : 'slideMainContainer'
            }
        }   
    }

    getArchiveNotes() {
        let note=this.props.notes.filter(note => note.isArchived === true);
        this.setState({
            notes:note,
        })
        this.props.noCall("");
    }
    
    componentDidMount() {
        NoteService.getArchiveNotes().then((res)=>{
            console.log(res.data.data);
            let getnotes=res.data.data.data; 
            this.props.addNote(getnotes);
            this.setState({notes:getnotes})
        })
        .catch((err)=>{
            console.log(err);
        })
        this.props.noCall("");
    }

    render() {
        if(this.props.apiCall === "ARCHIVE"){
            this.getArchiveNotes();
        }
        return (
            <Container style={{marginTop: '6em'}}>
                <div className={this.state.sliderClassName}>
                <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap',width:'80vw'}}>
                    { 
                        this.state.notes.length === 0  &&
                        <div className="bulbContainer">
                            <ArchiveOutlined className="bulbImage" style={{width:'100px',height:'100px'}}/>
                            <h2 style={{color:'#80868b'}}>No Archive Notes</h2>
                        </div>
                    }
                    <Masonry style={{display:'flex',flexWrap:'wrap'}}>
                        {
                            this.state.notes.length>0
                            ?   this.state.notes.map((key, index) => (
                                    key.isDeleted === false &&
                                    <NoteCard 
                                    key={index}
                                    Notekey={key.id}
                                    NoteObj={key}
                                    HandleArchiveChange={this.handleArchiveChange}
                                    />
                                ))
                            : []
                        }
                    </Masonry>                 
                    </div> 
                </div>
            </Container>
        );
    }
}

const mapToStateProps = state => {
    return {
        notes:state.note.notes,
        apiCall: state.api.apiName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: (data)=> dispatch(addNote(data)),
        archive:(note)=> dispatch(archiveNotes(note)),
        noCall: (name)=> dispatch(noCallToApi(name)),
        callApi: (name)=> dispatch(callToApi(name)),
    }
}

export default connect(mapToStateProps,mapDispatchToProps)(Archive);