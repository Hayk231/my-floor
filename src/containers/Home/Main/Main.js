import React, { Component } from 'react';
import './Main.scss';
import { Switch, Route } from 'react-router-dom'
import Settings from '../Main/Settings/Settings';
import Feed from '../Main/Feed/Feed';
import Profile from "./Profile/Profile";
import Chat from "./Chat/Chat";
import Users from "./Users/Users";

class Main extends Component {
    render() {
        return (
            <div className='main'>
                <Switch>
                    <Route exact path='/home/profile' component={Profile}/>
                    <Route exact path='/home/feed' component={Feed}/>
                    <Route exact path='/home/settings' component={Settings}/>
                    <Route exact path='/home/chat' component={Chat}/>
                    <Route exact path='/home/users' component={Users}/>
                </Switch>
            </div>
        );
    }
}

export default Main;