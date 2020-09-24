import React from 'react';
import '../scss/DashBoard.scss';
import { CssBaseline } from '@material-ui/core';
import DrawerMenu from './DrawerMenu';
import NavBar from '../util/NavBar';

export default class DashBoard extends React.Component {
    
    render() {
        return(
            <>
                <CssBaseline />
                <div>
                    <NavBar/>
                </div>
                <div style={{width:'8vw'}}>
                    <DrawerMenu/>
                </div>
            </>
        );
    }
}