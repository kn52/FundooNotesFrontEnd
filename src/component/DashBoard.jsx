import React from 'react';
import { CssBaseline, Grid, Typography } from '@material-ui/core';
import DrawerMenu from './DrawerMenu';
import NavBar from '../util/NavBar';

export default class DashBoard extends React.Component {
    
    render() {
        return(
            <Grid style={{display:'flex',flexDirection:'column'}}>
                <CssBaseline />
                <NavBar/>
                <DrawerMenu/>
            </Grid>
        );
    }
}