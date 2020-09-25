import React from 'react';
import '../scss/Notes.scss';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { Container } from "@material-ui/core";
import NoteInTrash from './NoteInTrash';
import NoteService from '../service/NoteService';
import { noCallToApi } from '../redux/actions/ApiAction';
import { addNote } from "../redux/actions/NoteAction";
import { DeleteOutlined } from '@material-ui/icons';

class Trash extends React.Component {
    constructor(props){
        super(props);
        this.state={
            sliderClassName: !this.props.drawerOpen ? 'trashContainer' : 'slideMainContainer' ,
            notes: null,
        };
    }

    static getDerivedStateFromProps(props, state){
        
        if(!window.matchMedia("(max-width: 1000px)").matches){
            return {
                ...state,
                sliderClassName : !props.drawerOpen ? 'trashContainer' : 'slideMainContainer'
            }
        }   
    }

    getTrashNotes(){
        let getnotes=this.props.notes; 
        this.setState({notes:getnotes})
        this.props.noCall("");
    }
    
    componentDidMount() {
        NoteService.getTrashNotes().then((res)=>{
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
        if(this.props.apiCall === "TRASH") {
            this.getTrashNotes();
        }
        return (
            <Container style={{paddingTop:'6em'}}>
                <div className={this.state.sliderClassName}>
                    <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap',width:'80vw'}}>
                    { 
                        this.state.notes === null  &&
                        <div className="bulbContainer">
                            <DeleteOutlined className="bulbImage" style={{width:'100px',height:'100px'}}/>
                            <h2 style={{color:'#80868b'}}>No Trash Notes</h2>
                        </div>
                    }
                        <Masonry style={{display:'flex',flexWrap:'wrap'}}>
                            {
                                this.state.notes !== null
                                ?   this.state.notes.map((key, index) => {
                                        if (key.isDeleted === true){
                                            return <NoteInTrash 
                                                Notekey = {key.id}
                                                NoteObj = {key}
                                                key={index}
                                            />
                                        }
                                        return '';
                                })
                                : null
                            }
                        </Masonry>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapToStateProps = state => {
    console.log(state.note.notes);
    return {
        drawerOpen: state.drawer.drawerOpen,
        apiCall: state.api.apiName,
        notes:state.note.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: (data)=> dispatch(addNote(data)),
        noCall: (name)=> dispatch(noCallToApi(name)),
    }
}

export default connect(mapToStateProps,mapDispatchToProps)(Trash);