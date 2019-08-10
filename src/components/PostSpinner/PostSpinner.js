import React, {Component} from 'react';
import './PostSpinner.scss';

class PostSpinner extends Component {
    render() {
        return (
            <div id="parent">
                <div id="loader">
                    <div id="shadow"></div>
                    <div id="box"></div>
                </div>
                <div id='text'>Posting</div>
            </div>
        );
    }
}

export default PostSpinner;