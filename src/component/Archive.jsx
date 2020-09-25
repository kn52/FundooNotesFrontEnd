import React, { Component } from 'react';
import '../scss/Notes.scss';
import Masonry from 'react-masonry-component';
import NoteCard from './NotesCard';
import { connect } from 'react-redux';
import { ArchiveOutlined } from '@material-ui/icons';
import { Container } from "@material-ui/core";
import { noCallToApi } from '../redux/actions/ApiAction';
import { addNote } from "../redux/actions/NoteAction";
import NoteService from '../service/NoteService';

class Archive extends Component {
    constructor(props){
        super(props);
        this.state={
            sliderClassName: !this.props.drawerOpen ? 'MainContainer' : 'slideMainContainer' ,
            notes: [],
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
    }

    render() {
        return (
            <Container style={{marginTop: '6em'}}>
                <div className={this.state.sliderClassName}>
                    { 
                        this.state.notes.length === 0  &&
                        <div className="archiveContainer">
                            <ArchiveOutlined className="bulbImage" style={{width:'100px',height:'100px'}}/>
                            <h2 style={{color:'#80868b'}}>No Archive Notes</h2>
                        </div>
                    }
                    <Masonry style={{display:'flex',flexWrap:'wrap'}}>
                        {
                            this.state.notes.length>0
                            ?   this.state.notes.map((key, index) => (
                                    this.state.notes[key].Trash === false &&
                                    <NoteCard 
                                        key={key}
                                        Notekey = {key}
                                        NoteObj = {this.state.notes[key]}
                                        ToggleView = {this.props.toggleView}
                                        HandleArchiveChange = {this.handleArchiveChange}
                                    />
                                ))
                            : []
                        }
                    </Masonry>                  
                </div>
            </Container>
        );
    }
}

const mapToStateProps = state => {
    return {
        drawerOpen: state.drawer.drawerOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: (data)=> dispatch(addNote(data)),
        noCall: (name)=> dispatch(noCallToApi(name)),
    }
}

export default connect(mapToStateProps,mapDispatchToProps)(Archive);