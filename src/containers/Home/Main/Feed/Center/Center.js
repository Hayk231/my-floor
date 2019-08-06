import React, {Component, Fragment} from 'react';
import './Center.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';
import firebase from "firebase";
import Post from "./Post/Post";

class Center extends Component {

    state = {
        data: null
    };

    componentDidMount() {
        let userKey = localStorage.getItem('userKey');
        let userRef = firebase.database().ref('userId/' + userKey);
        userRef.once('value').then(snap => {
            let val = snap.val();
            this.setState({data: val});
        })
    }

    render() {
        let posts = null;

        if (this.state.data) {
            posts = (
                <div className='feed_center'>
                    <div className='add_post'>
                        <div className='post_head'>Create Post</div>
                        <div className='post_info'>
                            <div>
                                <div style={{backgroundImage: `url("${this.state.data.profPic}")`}}> </div>
                            </div>
                            <div>
                                <input type='text' placeholder="What's New"/>
                            </div>
                        </div>
                        <div className='post_tools'>
                            <div>
                                <FontAwesomeIcon icon={faCamera}/>
                                <FontAwesomeIcon icon={faFilm}/>
                                <FontAwesomeIcon icon={faLaughBeam}/>
                            </div>
                            <button>Post</button>
                        </div>
                    </div>
                    <div className='center_cont'>
                        <Post data={this.state.data}/>
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