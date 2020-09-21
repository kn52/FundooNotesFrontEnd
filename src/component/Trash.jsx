import React from 'react';
import '../scss/Notes.scss';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { Container } from "@material-ui/core";
import NoteInTrash from './NoteInTrash';
import NoteService from '../service/NoteService';

class Trash extends React.Component {
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
            console.log(res.data.data);
            let getnotes=res.data.data.data; 
            this.setState({notes:getnotes})
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    componentDidMount() {
        this.getTrashNotes();
    }

    render() {
        return (
            <Container style={{marginTop: '6em'}}>

                <div className={this.state.sliderClassName}>

                    <Masonry>
                        {
                            this.state.notes !== null
                            ?   this.state.notes.map((key, index) => (
                                    <NoteInTrash 
                                        Notekey = {key.id}
                                        NoteObj = {key}
                                        key={index}
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

const mapToStateProps = state => {
    return {
        drawerOpen: state.drawer.drawerOpen,
    }
}

export default connect(mapToStateProps)(Trash);