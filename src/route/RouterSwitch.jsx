import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import React from "react";
import SignIn from '../component/SignIn';
import SignUp from '../component/SignUp';
import DashBoard from '../component/DashBoard';
import ForgetPassword from '../component/ForgetPassword';
import ResetPassword from '../component/ResetPassword';
import PrivateRoute from './PrivateRoute';
import Notes from '../component/Notes';
import Trash from '../component/Trash';
import Archive from '../component/Archive';

export default function DefaultRoute () {
    return (
        <BrowserRouter>
            <Route path='/login' exact component={SignIn} />
            <Route exact path='/' render={()=>{ return (<Redirect to='/dashboard/notes'/>)}}/>
            <Route exact path='/dashboard' render={()=>{ return (<Redirect to='/dashboard/notes'/>)}}/>
            <Route path='/register' component={SignUp} />
            <Route path='/forgetpassword' exact component={ForgetPassword} />
            <Route path='/resetpassword' component={ResetPassword} />
            <PrivateRoute path='/dashboard' component={DashBoard} />
            <PrivateRoute path='/dashboard/notes' component={Notes} />
            <PrivateRoute path='/dashboard/trash' component={Trash} />
            <PrivateRoute path='/dashboard/archive' component={Archive} />
        </BrowserRouter>
    );
}
