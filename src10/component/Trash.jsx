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

const mapToStateProps = state => {
    return {
        drawerOpen: state.drawer.drawerOpen,
    }
}

export default connect(mapToStateProps)(Trash);