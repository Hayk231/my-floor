import React, { Component } from "react";
import axios from 'axios';
import "./Register.scss"
import Spinner from '../../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { faEye } from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import firebase from 'firebase';


class Register extends Component{
    state = {
        info: {
            name: null,
            email: null,
            password: null
        },
        registered: false,
        display: false,
        exist: false,
        showed: false

    };

    userNameHandler = event => {
        let newInfo = {...this.state.info};
        newInfo.name = event.target.value;
        this.setState({info: newInfo})
    };
    emailHandler = event => {
        let newInfo = {...this.state.info};
        newInfo.email = event.target.value;
        this.setState({info: newInfo})
    };
    passwordHandler = event => {
        let newInfo = {...this.state.info};
        newInfo.password = event.target.value;
        this.setState({info: newInfo})
    };
    submitHandler = (e) => {
        let userInfo = {
            ...this.state.info
        };
        this.setState({display: true});
        e.preventDefault();
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB4ECbdtpZynP-2ecCvekTNErhj98-KTWg', {
            email: userInfo.email,
            password: userInfo.password,
            returnSecureToken: true
        })
            .then((response) => {
                let newInfo = {...response.data};
                firebase.database().ref('userId').push({
                    id: newInfo.localId,
                    name: userInfo.name,
                    profPic: '/Images/avatar.png'
                }).then(res => {})
            })
            .then(() => {
                setTimeout(() => {
                    this.setState({registered: true});
                    this.setState({display: false});
                }, 1000);
            })
            .catch((error) => {
                this.setState({registered: false});
                alert(error);
            })
    };

    showHandler = () => {
        if (this.state.showed) {
            this.setState({showed: false});
        } else {
            this.setState({showed: true});
        }
    };

    render() {

        let spin = null;
        if (this.state.display) {
            spin = <Spinner/>;
        }

        let show = 'password';
        let opacity = '0.5';
        if (this.state.showed) {
            show = 'text';
            opacity = '1';
        }

        let conf = (
            <form onSubmit={this.submitHandler} className='signUp' autoComplete='new-password' >
                <div className="LeftReg"><p>Sign Up</p></div>
                <div className='regField'>
                    <div><input type='text' placeholder='Username' onChange={this.userNameHandler} autoComplete='new-password'/></div>
                    <div><input type='email' placeholder='Email' onChange={this.emailHandler} autoComplete='new-password'/></div>
                    <div className='pass'>
                        <input type={show} placeholder='Password' onChange={this.passwordHandler} autoComplete='new-password'/>
                        <FontAwesomeIcon icon={faEye} className='regSvg' onClick={this.showHandler} style={{opacity: opacity}}/>
                    </div>
                    <button className='regButt'>Sign Up</button>
                </div>
            </form>
        );
        if (this.state.registered) {
            conf = (
                <div className='Conf' style={{display: conf}}>
                    <p>You Registered Successfully</p>
                    <Link to='/auth/login'>Log In</Link>
                </div>
            );
        }

        return (
            <div className='Parent'>
                {spin}
                {conf}
            </div>

        );
    }
}

export default Register;