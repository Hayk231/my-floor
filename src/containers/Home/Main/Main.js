import React, { Component } from 'react';
import './Main.scss';
import { Switch, Route } from 'react-router-dom'
import Settings from '../Main/Settings/Settings';
import Feed from '../Main/Feed/Feed';
import Profile from "./Profile/Profile";

class Main extends Component {
    render() {
        return (
            <div className='main'>
                <Switch>
                    <Route path='/home/profile' component={Profile}/>
                    <Route exact path='/home/feed' component={Feed}/>
                    <Route exact path='/home/settings' component={Settings}/>
                </Switch>
            </div>
        );
    }
}

export default Main;