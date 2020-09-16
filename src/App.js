import React from 'react';
import './App.css';
import DefaultRoute from "./route/RouterSwitch";
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <DefaultRoute/>
            </div>
        </Provider>
    );
}
