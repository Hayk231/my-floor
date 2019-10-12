import React, {Component} from 'react';
import './Post.scss';
import firebase from "firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";

class Post extends Component {

    state = {
        buttColor: '#c2c5cd',
    };

    addComment = () => {
        firebase.database().ref('Posts/' + this.props.data.id + '/comments').push({
            name: 'ba vor asum ei'
        }).then(res => {
            alert()
        })
    };

    onKeyPress = (e) => {
        if (e.which === 13) {
            this.sendMessage(e);
            this.clearInput.current.reset();
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
        let image = null;
        if (this.props.data.postImg) {
            image = <div style={{backgroundImage: `url('${this.props.data.postImg}')`}}> </div>
        }

        return (
            <div className='post'>
                <div className='post_info'>
                    <div style={{backgroundImage: `url('${this.props.data.image}')`}}> </div>
                    <div>
                        <span>{this.props.data.name}</span>
                        <span>{this.props.data.time}</span>
                    </div>
                </div>
                <div className='post_cont'>
                    <span>
                        {this.props.data.content}
                    </span>
                    {image}
                </div>
                <div></div>
                <form ref={ref => this.clearInput = ref}>
                    <label className='img_send'>
                        <FontAwesomeIcon icon={faPhotoVideo}/>
                        <input type='file' onChange={this.saveImage}/>
                    </label>
                    <input type='text' placeholder='Write a message' onKeyPress={this.onKeyPress} ref={this.messInput} onChange={this.buttActive} onKeyDown={this.keyDownHandler}/>
                    <button onClick={this.sendMessage}><FontAwesomeIcon icon={faPaperPlane} style={{color: this.state.buttColor}}/></button>
                </form>
                <div className='comment_cont'>
                    <div className='comm_info'>
                        <div style={{backgroundImage: `url('${this.props.data.image}')`}}> </div>
                        <div>
                            {/*<span>{this.props.data.name}</span>*/}
                            <span>{this.props.data.content}</span>
                        </div>
                    </div>
                    {/*<div className='comm_cont'>*/}
                    {/*    /!*<span>{this.props.data.time}</span>*!/*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default Post;