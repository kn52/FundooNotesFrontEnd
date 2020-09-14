import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const  PrivateRoute = (props) => {

    return  localStorage.getItem("userToken") === null ? (<Redirect  to="/login"  />)
            :(<Route  path={props.path}  exact={props.exact} component={props.component} />) ;
};

export  default  PrivateRoute;