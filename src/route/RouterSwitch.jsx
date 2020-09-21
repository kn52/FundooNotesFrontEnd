import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import React from "react";
import SignIn from '../component/SignIn';
import SignUp from '../component/SignUp';
import DashBoard from '../component/DashBoard';
import ForgetPassword from '../component/ForgetPassword';
import ResetPassword from '../component/ResetPassword';
import EditLabel from '../component/EditLabel';
import PrivateRoute from './PrivateRoute';
import Notes from '../component/Notes';
import Trash from '../component/Trash';

export default function DefaultRoute () {
    return (
        <BrowserRouter>
                <Route path='/login' exact component={SignIn} />
                <Route exact path={['/','/dashboard']} render={()=>{ return (<Redirect to='/dashboard/notes'/>)}}/>
                <Route path='/register' component={SignUp} />
                <Route path='/forgetpassword' exact component={ForgetPassword} />
                <Route path='/resetpassword' component={ResetPassword} />
                <Route path='/edit' component={EditLabel} />
				<PrivateRoute path='/dashboard' component={DashBoard} />
                <PrivateRoute path='/dashboard/notes' component={Notes} />
                <PrivateRoute path='/dashboard/trash' component={Trash} />
        </BrowserRouter>
    );
}
