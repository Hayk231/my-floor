import React, { Component } from 'react';
import './Login.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Spinner from '../../../../components/Spinner/Spinner';

class Login extends Component {
    state = {
        info: {
            email: null,
            password: null
        },
        showed: false,
        saved: false,
        spinner: false
    };

    userNameHandler = event => {
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
        let userInfo = {...this.state.info};
        this.setState({spinner: true});
        e.preventDefault();
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB4ECbdtpZynP-2ecCvekTNErhj98-KTWg', {
            email: userInfo.email,
            password: userInfo.password,
            returnSecureToken: true
        })
            .then(response => {
                let userId = response.data.localId;
                firebase.database().ref('/userId').on('value',snapshot => {
                    let val = snapshot.val();
                    for (let key in val) {
                        if (val[key].id === userId) {
                            this.props.namePopHandler(val[key].name);
                            this.props.saveHandler(this.state.saved);
                            this.localAddHandler(this.state.saved, val[key].name, key);
                            this.setState({spinner: false});
                            this.props.history.push('/home');
                        }
                    }
                });
                localStorage.setItem('logged', 'true');
            })
    };

    showHandler = () => {
        if (this.state.showed) {
            this.setState({showed : false});
        } else {
            this.setState({showed : true});
        }
    };

    remHandler = event => {
        this.setState({saved: event.target.checked});
    };

    localAddHandler = (saved, name, key) => {
        localStorage.setItem('rememberMe', saved);
        localStorage.setItem('userName', name);
        localStorage.setItem('userKey', key);
    };

    render() {
        console.log(this.props.usName)
        let show = 'password';
        let opacity = '0.5';
        if (this.state.showed) {
            show = 'text';
            opacity = '1';
        }

        let comp = (
            <form onSubmit={this.submitHandler} className='login' autoComplete='new-password' >
                <div className="Left"><p>Sign In</p></div>
                <div className='inpField'>
                    <div><input type='text' placeholder='Username' onChange={this.userNameHandler} autoComplete='new-password'/></div>
                    <div className='pass'>
                        <input type={show} placeholder='Password' onChange={this.passwordHandler} autoComplete='new-password'/>
                        <FontAwesomeIcon icon={faEye} className='logSvg' onClick={this.showHandler} style={{opacity: opacity}}/>
                    </div>
                    <div>
                        <input type="checkbox" id="check" name="check" onChange={this.remHandler}/>
                        <label htmlFor="check">
                            Remember Me <span></span>
                        </label>
                    </div>
                    <button>Sign In</button>
                </div>
            </form>
        );
        if (this.state.spinner) {
            comp = <Spinner/>;
        }

        return (
            <div className='Parent'>
                {comp}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usName: state.userName,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        namePopHandler: (name) => dispatch({type: 'NAME_POP', resName: name}),
        saveHandler: (checked) => dispatch({type: 'NAME_SAVE', checked: checked})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
