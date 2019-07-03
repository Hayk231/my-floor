import React, { Component } from 'react';
import './Main.scss';
import { Switch, Route } from 'react-router-dom'
import Settings from '../Main/Settings/Settings';
import Feed from '../Main/Feed/Feed';
import Profile from "./Profile/Profile";
import {Link} from "react-router-dom";
import Chat from "./Chat/Chat";

class Main extends Component {
    render() {
        return (
            <div className='main'>
                <Link to={'/home/chat/'}>Chat</Link>
                <Switch>
                    <Route exact path='/home/profile' component={Profile}/>
                    <Route exact path='/home/feed' component={Feed}/>
                    <Route exact path='/home/settings' component={Settings}/>
                    <Route exact path='/home/chat' component={Chat}/>
                </Switch>
            </div>
        );
    }
}

export default Main;