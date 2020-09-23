import React from 'react';
import '../scss/Notes.scss';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { Container } from "@material-ui/core";
import NoteInTrash from './NoteInTrash';
import NoteService from '../service/NoteService';
import { noCallToApi } from '../redux/actions/ApiAction';

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
                sliderClassName : !props.drawerOpen ? 'trashContainer' : 'slideMainContainer'
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
        this.props.noCall("");
    }
    
    componentDidMount() {
        this.getTrashNotes();
    }

    render() {
        if(this.props.apiCall === "TRASH") {
            this.getTrashNotes();
        }
        return (
            <Container style={{paddingTop:'6em'}}>
                <div className={this.state.sliderClassName}>
                    <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap',width:'80vw'}}>
                        <Masonry style={{display:'flex',flexWrap:'wrap'}}>
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
                </div>
            </Container>
        );
    }
}

const mapToStateProps = state => {
    return {
        drawerOpen: state.drawer.drawerOpen,
        apiCall: state.api.apiName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        noCall: (name)=> dispatch(noCallToApi(name)),
    }
}

export default connect(mapToStateProps,mapDispatchToProps)(Trash);