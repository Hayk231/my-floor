import React, { Component } from 'react';
import './Chat.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

class Chat extends Component {
    state = {
        text: '',
        chat: [],
        name: localStorage.getItem('userName')
    };

    tapText = (e) => {
        this.setState({text: e.target.value})
    };

    sendMessage = () => {
        const chatArr = this.state.chat;
        chatArr.push(this.state.text);
        this.setState({chat: chatArr});
    };

    render() {

        return(
            <div className='chat'>
                <div className='chat_show'>
                    {this.state.chat.map(el => {
                        return (
                            <div>
                                <p key={`${el}12`}>{this.state.name}</p>
                                <p key={el}>{el}</p>
                            </div>)
                    })}
                </div>
                <input type='text' placeholder='Write a message' onChange={this.tapText}/>
                <button onClick={this.sendMessage}><FontAwesomeIcon icon={faPaperPlane}/></button>
            </div>
        );
    }
}

export default Chat;