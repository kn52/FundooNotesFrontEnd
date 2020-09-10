import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import React from "react";
import SignIn from '../component/SignIn';
import ForgetPassword from '../component/ForgetPassword';

export default function DefaultRoute () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={['/','/login']} exact component={SignIn} />
                <Route path='/forgetpassword' exact component={ForgetPassword} />
                <Route path='/resetpassword' component={ResetPassword} />
            </Switch>
        </BrowserRouter>
    );
}