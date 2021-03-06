import React, { Component } from 'react';
import './Chat.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';
import MainInfo from "../../../../components/MainInfo/MainInfo";

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
        buttColor: '#9a9da5',
        open: false,
        img: '',
        typeShow: false,
        inpVal: null
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
        // let val = this.state.inpVal;
        // if (val) {
        //     this.setState({typeShow: true});
        //     if (val === '') {
        //         this.setState({typeShow: false});
        //     }
        // }

    }

    onKeyPress = (e) => {
        if (e.which === 13) {
            this.sendMessage(e);
            this.clearInput.current.reset();
        }
    };

    sendMessage = (e) => {
        e.preventDefault();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let today = new Date();
        let month = monthNames[today.getMonth()];
        let minute = today.getMinutes();
        if (minute < 10) {
            minute = '0' + minute;
        }
        let date = (month + ' - ' + today.getDate());
        let time = today.getHours() + ":" + minute;
        let dateTime = date + ' ' + time;
        this.setState({buttColor: '#9a9da5'});
        let inpVal = this.messInput.current.value;
        if (inpVal !== '') {
            const chatArr = [];
            this.clearInput.current.reset();
            firebase.database().ref('Chat').push({
                name: this.state.name,
                message: inpVal,
                image: this.state.profImg,
                time : dateTime,
                key: localStorage.getItem('userKey')
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

    openInfo = () => {
        this.setState({open: true})
    };

    handleToggleModal = (e) => {
        if (e.target.classList.contains('main_info')) {
            this.setState({
                open: !this.state.open
            })
        }
    };

    saveImage = (e) => {
        if (e.target.files[0]) {
            this.setState({img: URL.createObjectURL(e.target.files[0])})
        }
    };

    keyDownHandler = (e) => {
        let val = e.target.value;
        this.setState({inpVal: e.target.value});
        this.scrollEnd.current.scrollTo({
            top: this.scrollEnd.current.scrollHeight,
        });
        this.setState({typeShow: true});
        if (val === '') {
            this.setState({typeShow: false});
        }
    };

    cancelType = () => {
        this.setState({typeShow: false})
    };

    render() {
        let type = '0';
        if (this.state.typeShow) {
            type = '40px';
        }

        return(
            <div className='chat'>
                <div className='chat_show' ref={this.scrollEnd}>
                    {this.state.chat.map(el => {
                        if (el.name === localStorage.getItem('userName') && el.time) {
                            return (
                                <div key={el.key + 'div'}>
                                    <div key={el.key} className='my_message'>
                                        <div style={{backgroundImage: `url(${el.image})`}} className='prof_img' title={el.time}></div>
                                        <div className='text'>
                                            <span>{el.message}</span>
                                            {/*<div style={{backgroundImage: `url(${this.state.img})`}}></div>*/}
                                        </div>
                                    </div>
                                </div>
                                )
                        } else {
                            return (
                                <div key={el.key} className='messages'>
                                    {this.state.open ? <MainInfo toggleModal = {this.handleToggleModal} name={el.name} img={el.image} /> : null}
                                    <div style={{backgroundImage: `url(${el.image})`}} className='prof_img' title={el.time} onClick={this.openInfo}></div>
                                    <div className='text'>
                                        <span>{el.message}</span>
                                    </div>
                                </div>)
                        }
                    })}
                    <div style={{height: type}} className='type_div'>
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <form ref={this.clearInput}>
                    <label className='img_send'>
                        <FontAwesomeIcon icon={faPhotoVideo}/>
                        <input type='file' onChange={this.saveImage}/>
                    </label>
                    <input type='text' placeholder='Write a message' onKeyPress={this.onKeyPress} ref={this.messInput} onChange={this.buttActive} onKeyDown={this.keyDownHandler} onBlur={this.cancelType}/>
                    <button onClick={this.sendMessage.bind(this)}><FontAwesomeIcon icon={faPaperPlane} style={{color: this.state.buttColor}}/></button>
                </form>
            </div>
        );
    }
}

export default Chat;