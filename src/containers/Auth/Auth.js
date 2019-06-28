import React , { Component } from 'react';
import './Auth.scss';
import Register from './Form/Register/Register'
import Login from './Form/Login/Login';
import Greeting from './Greeeting/Greeting';
import { Route, Switch, Link} from "react-router-dom";

class Auth extends Component {

    render() {
        let className = null;
        let new_style = null;
        if (window.location.pathname === '/auth/login') {
            className = 'log_page';
            new_style = 'new_log';
        } else if (window.location.pathname === '/auth/register') {
            className = 'reg_page';
            new_style = 'new_reg'
        }

        return (
            <div className={`Home ${new_style}`}>
                <div className={`Header ${className}`} >
                    <Link to='/auth'><button className='home_butt'>Home</button></Link>
                    <div>
                        <Link to='/auth/login'><button>Sign In</button></Link>
                        <Link to='/auth/register'><button>Sign Up</button></Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path='/auth/login' component={Login}/>
                    <Route exact path='/auth/register' component={Register}/>
                    <Route exact path='/auth/' component={Greeting}/>
                </Switch>
            </div>
        );
    }
}

export default Auth;