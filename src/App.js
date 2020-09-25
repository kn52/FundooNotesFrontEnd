import React, { useEffect} from 'react';
import './App.css';
import './scss/DashBoard.scss';
import DefaultRoute from "./route/RouterSwitch";
import { Provider } from 'react-redux';
import store from './redux/store/store';

export default function App() {

    useEffect(()=>{
        console.log(process.env);
    })

    return (
        <Provider store={store}>
            <div className="App">
                <DefaultRoute/>
            </div>
        </Provider>
    );
}
