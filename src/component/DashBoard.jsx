import React from 'react';
import { CssBaseline } from '@material-ui/core';
import DrawerMenu from './DrawerMenu';
import NavBar from '../util/NavBar';

export default class DashBoard extends React.Component {
    
    render() {
        return(
            <div style={{display:'flex',flexDirection:'column'}}>
                <CssBaseline />
                <NavBar/>
                <DrawerMenu/>
            </div>
        );
    }
}