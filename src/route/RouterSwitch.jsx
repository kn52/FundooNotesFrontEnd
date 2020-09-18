import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import React from "react";
import SignIn from '../component/SignIn';
import SignUp from '../component/SignUp';
import DashBoard from '../component/DashBoard';
import ForgetPassword from '../component/ForgetPassword';
import ResetPassword from '../component/ResetPassword';
import EditLabel from '../component/EditLabel';
import PrivateRoute from './PrivateRoute';

export default function DefaultRoute () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={SignIn} />
                <Route exact path='/' render={()=>{ return (<Redirect to='/dashboard'/>)}}/>
                <Route path='/register' component={SignUp} />
                <Route path='/forgetpassword' exact component={ForgetPassword} />
                <Route path='/resetpassword' component={ResetPassword} />
                <Route path='/edit' component={EditLabel} />
				<PrivateRoute path='/dashboard' exact component={DashBoard} />
            </Switch>
        </BrowserRouter>
    );
}
