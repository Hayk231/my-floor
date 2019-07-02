import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Auth from "./containers/Auth/Auth";
import Home from './containers/Home/Home';

class App extends Component{

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe');
        if (window.location.pathname === '/') {
            if (rememberMe === 'true') {
                window.location.replace('/home');
            } else {
                window.location.replace('/auth');
            }
        }
    };

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/home' component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default App;
