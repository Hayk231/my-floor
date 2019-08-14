import React, {Component, Fragment} from 'react';
import './Center.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';
import firebase from "firebase";
import Post from "./Post/Post";
import moment from "moment";
import PostSpinner from "../../../../../components/PostSpinner/PostSpinner";

class Center extends Component {

    state = {
        data: null,
        content: '',
        allPosts: null,
        imgLink: '',
        fileUrl: null,
        spinner: false
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
                    allPosts[key].id = key;
                    postArr.unshift(allPosts[key]);
                }
                this.setState({allPosts: postArr})
            })
        })
    }

    enterPost = (e) => {
        if (e.keyCode === 13) {
            this.postAddHandler();
        }
    };

    postAddHandler = () => {
        this.setState({spinner: true});
        const file = this.state.imgLink;
        this.setState({imgLink: ''});
        if (file) {
            const storageRef = firebase.storage().ref('/PostImages');
            const mainImage = storageRef.child(file.name);
            mainImage.put(file).then(() => {
                storageRef.child(file.name).getDownloadURL().then((url) => {
                    this.setState({fileUrl: url});
                    this.popPost(url)
                })
            });
        } else {
            this.popPost('')
        }

    };

    popPost = (url) => {
        let time = moment().format('MMMM Do, h:mm a');
        if (this.inputTitle !== '') {
            firebase.database().ref('Posts').push({
                name: this.state.data.name,
                content: this.inputTitle.value,
                image: this.state.data.profPic,
                postImg: url,
                time: time,
                key: localStorage.getItem('userKey')
            }).then(() => {
                firebase.database().ref('/Posts').once('value').then(snapshot => {
                    this.setState({spinner: false});
                    let allPosts = snapshot.val();
                    let postArr = [];
                    for (let key in allPosts) {
                        allPosts[key].id = key;
                        postArr.unshift(allPosts[key]);
                    }
                    this.setState({allPosts: postArr});
                    this.inputTitle.value = "";
                })
            })
        }

    };

    addImage = (e) => {
        if (e.target.value) {
            this.setState({imgLink: e.target.files[0]})
        }
    };

    render() {
        let posts = null;
        let display = 'none';
        let imgUrl = '';
        if (this.state.imgLink) {
            display = 'block';
            imgUrl = URL.createObjectURL(this.state.imgLink)
        }
        let spinner = null;
        if (this.state.spinner) {
            spinner = <PostSpinner/>
        }

        if (this.state.data && this.state.allPosts) {
            posts = (
                <div className='feed_center'>
                    <div className='add_post'>
                        <div className='post_head'>Create Post</div>
                        <div className='post_info'>
                            <div className='add_post_user'>
                                <div style={{backgroundImage: `url("${this.state.data.profPic}")`}}> </div>
                            </div>
                            <div className='add_post_cont'>
                                <input type='text' placeholder="What's New" ref={el => this.inputTitle = el}
                                       onKeyDown={this.enterPost}/>
                            </div>
                            <div style={{backgroundImage: `url(${imgUrl})`, display: display}} className='post_img'></div>
                        </div>
                        <div className='post_tools'>
                            <div>
                                <label>
                                    <input type='file' style={{display: 'none'}} onChange={this.addImage} accept="image/*"/>
                                    <FontAwesomeIcon icon={faCamera}/>
                                </label>
                                <FontAwesomeIcon icon={faFilm}/>
                                <FontAwesomeIcon icon={faLaughBeam}/>
                            </div>
                            <button onClick={this.postAddHandler}>Post</button>
                        </div>
                    </div>
                    <div className='center_cont'>
                        {spinner}
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