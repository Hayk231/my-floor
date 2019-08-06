import React, {Component, Fragment} from 'react';
import './Center.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';
import firebase from "firebase";
import Post from "./Post/Post";
import moment from "moment";

class Center extends Component {

    state = {
        data: null,
        content: '',
        allPosts: null
    };

    componentDidMount() {
        let userKey = localStorage.getItem('userKey');
        let userRef = firebase.database().ref('userId/' + userKey);
        userRef.once('value').then(snap => {
            let val = snap.val();
            this.setState({data: val});
        }).then(() => {
            firebase.database().ref('/Posts').once('value').then(snapshot => {
                let allPosts = snapshot.val();
                let postArr = [];
                for (let key in allPosts) {
                    postArr.unshift(allPosts[key]);
                }
                this.setState({allPosts: postArr})
            })
        })
    }

    postAddHandler = () => {
        let time = moment().format('MMMM Do, h:mm a');

        if (this.state.content !== '') {
            firebase.database().ref('Posts').push({
                name: this.state.data.name,
                content: this.state.content,
                image: this.state.data.profPic,
                time: time,
                key: localStorage.getItem('userKey')
            }).then(() => {
                firebase.database().ref('/Posts').once('value').then(snapshot => {
                    let allPosts = snapshot.val();
                    let postArr = [];
                    for (let key in allPosts) {
                        postArr.unshift(allPosts[key]);
                    }
                    this.setState({allPosts: postArr})
                })
            })
        }

    };

    getText = (e) => {
        this.setState({content: e.target.value})
    };

    render() {
        let posts = null;


        if (this.state.data && this.state.allPosts) {
            posts = (
                <div className='feed_center'>
                    <div className='add_post'>
                        <div className='post_head'>Create Post</div>
                        <div className='post_info'>
                            <div>
                                <div style={{backgroundImage: `url("${this.state.data.profPic}")`}}> </div>
                            </div>
                            <div>
                                <input type='text' placeholder="What's New" onChange={this.getText}/>
                            </div>
                        </div>
                        <div className='post_tools'>
                            <div>
                                <FontAwesomeIcon icon={faCamera}/>
                                <FontAwesomeIcon icon={faFilm}/>
                                <FontAwesomeIcon icon={faLaughBeam}/>
                            </div>
                            <button onClick={this.postAddHandler}>Post</button>
                        </div>
                    </div>
                    <div className='center_cont'>
                        {
                            this.state.allPosts.map((el, index) => {
                                return <Post data={el} key={index}/>
                            })
                        }
                    </div>
                </div>
            )
        }
        return (
            <Fragment>
                {posts}
            </Fragment>
        );
    }
}

export default Center;