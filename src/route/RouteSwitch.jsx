import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import React from "react";
import SignIn from '../component/SignIn';

export default function DefaultRoute () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={['/','/login']} exact component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
}