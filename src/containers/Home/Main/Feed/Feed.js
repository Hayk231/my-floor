import React, { Component } from 'react';
import './Feed.scss';
import Center from "./Center/Center";
import LeftBar from "./LeftBar/LeftBar";
import RightBar from "./RightBar/RightBar";

class Feed extends Component {

    render() {
        return(
            <div className='feed_cont'>
                <LeftBar/>
                <Center/>
                <RightBar/>
            </div>
        );
    }
}

export default Feed;