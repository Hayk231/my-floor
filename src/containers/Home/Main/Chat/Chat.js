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
    }

    state = {
        text: '',
        chat: [],
        name: localStorage.getItem('userName'),
        profImg: null
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
                chatArr.push(allChat[key]);
            }
            this.setState({chat: chatArr});
        })
    }

    tapText = (e) => {
        this.setState({text: e.target.value})
    };
    
    onKeyPress = (e) => {
        if (e.which === 13) {
            this.sendMessage(e);
            this.clearInput.current.reset();
        }
    };

    sendMessage = (e) => {
        e.preventDefault();
        this.clearInput.current.reset();
        firebase.database().ref('Chat').push({
            name: this.state.name,
            message: this.state.text,
            image: this.state.profImg
        }).then(res => {
            firebase.database().ref('/Chat').on('value',snapshot => {
                let allChat = snapshot.val();
                let chatArr = [];
                for (let key in allChat) {
                    chatArr.push(allChat[key]);
                }
                this.setState({chat: chatArr});
                this.scrollEnd.current.scrollTop = this.scrollEnd.current.scrollHeight;
            })
        })
    };

    render() {

        return(
            <div className='chat'>
                <div className='chat_show' ref={this.scrollEnd}>
                    {this.state.chat.map(el => {
                        return (
                            <div key={'_' + Math.random().toString(36).substr(2, 9)} className='messages'>
                                <div style={{backgroundImage: `url(${el.image})`}} className='prof_img'></div>
                                <div className='text'>
                                    {/*<span>{el.name}</span>*/}
                                    <span>{el.message}</span>
                                </div>

                            </div>)
                    })}
                </div>
                <form ref={this.clearInput}>
                    <input type='text' placeholder='Write a message' onChange={this.tapText} onKeyPress={this.onKeyPress}/>
                    <button onClick={this.sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
                </form>
            </div>
        );
    }
}

export default Chat;