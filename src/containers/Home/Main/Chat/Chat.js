import React, { Component } from 'react';
import './Chat.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import firebase from 'firebase';

class Chat extends Component {

    constructor(props){
        super(props);
        this.clearInput = React.createRef();
        this.scrollEnd = React.createRef();
        this.messInput = React.createRef();
    }

    state = {
        text: '',
        chat: [],
        name: localStorage.getItem('userName'),
        profImg: null,
        play: false,
        buttColor: '#9a9da5'
    };

    componentDidMount() {
        let userKey = localStorage.getItem('userKey');
        let userRef = firebase.database().ref('userId/' + userKey);
        userRef.on('value', snapshot => {
            let val = snapshot.val().profPic;
            this.setState({profImg: val});
        });
        firebase.database().ref('/Chat').on('value',snapshot => {
            let allChat = snapshot.val();
            let chatArr = [];
            for (let key in allChat) {
                let obj = allChat[key];
                obj.key = key;
                chatArr.push(obj);
            }
            this.setState({chat: chatArr});
        })
        // if (this.scrollEnd.current.scrollTop !== this.scrollEnd.current.scrollHeight) {
        //     this.scrollEnd.current.scrollTo({
        //         top: this.scrollEnd.current.scrollHeight,
        //     });
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.chat.length < this.state.chat.length && prevState.chat.length !== 0) {
                if (this.state.chat[this.state.chat.length-1].name === this.state.name) {
                    let audio = new Audio('/Images/notif-send.mp3');
                    audio.play().then(() => {
                        this.scrollEnd.current.scrollTo({
                            top: this.scrollEnd.current.scrollHeight,
                        });
                    });
                } else {
                    let audio = new Audio('/Images/notif-get.mp3');
                    audio.play().then(() => {
                        this.scrollEnd.current.scrollTo({
                            top: this.scrollEnd.current.scrollHeight,
                        });
                    });
                }

        }
    }

    onKeyPress = (e) => {
        if (e.which === 13) {
            this.sendMessage(e);
            this.clearInput.current.reset();
        }
    };

    sendMessage = (e) => {
        e.preventDefault();
        this.setState({buttColor: '#9a9da5'});
        let inpVal = this.messInput.current.value;
        if (inpVal !== '') {
            const chatArr = [];
            this.clearInput.current.reset();
            firebase.database().ref('Chat').push({
                name: this.state.name,
                message: inpVal,
                image: this.state.profImg
            }).then(() => {
                firebase.database().ref('/Chat').once('value').then(snapshot => {
                    let allChat = snapshot.val();
                    for (let key in allChat) {
                        let obj = allChat[key];
                        obj.key = key;
                        chatArr.push(obj);
                    }
                    this.setState({chat: chatArr});
                })
            })
        }
    };

    buttActive = (e) => {
        if (e.target.value !== '') {
            this.setState({buttColor: '#547dc3'})
        } else {
            this.setState({buttColor: '#9a9da5'})
        }
    };

    render() {

        return(
            <div className='chat'>
                <div className='chat_show' ref={this.scrollEnd}>
                    {this.state.chat.map(el => {
                        if (el.name === localStorage.getItem('userName')) {
                            return (
                                <div key={el.key} className='my_message'>
                                    <div style={{backgroundImage: `url(${el.image})`}} className='prof_img'></div>
                                    <div className='text'>
                                        {/*<span>{el.name}</span>*/}
                                        <span>{el.message}</span>
                                    </div>
                                </div>)
                        } else {
                            return (
                                <div key={el.key} className='messages'>
                                    <div style={{backgroundImage: `url(${el.image})`}} className='prof_img'></div>
                                    <div className='text'>
                                        {/*<span>{el.name}</span>*/}
                                        <span>{el.message}</span>
                                    </div>
                                </div>)
                        }

                    })}
                </div>
                <form ref={this.clearInput}>
                    <input type='text' placeholder='Write a message' onKeyPress={this.onKeyPress} ref={this.messInput} onChange={this.buttActive}/>
                    <button onClick={this.sendMessage.bind(this)}><FontAwesomeIcon icon={faPaperPlane} style={{color: this.state.buttColor}}/></button>
                </form>
            </div>
        );
    }
}

export default Chat;