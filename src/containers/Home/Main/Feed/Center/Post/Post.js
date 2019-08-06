import React, {Component} from 'react';
import './Post.scss';

class Post extends Component {

    render() {
        return (
            <div className='post'>
                <div className='post_info'>
                    <div style={{backgroundImage: `url('${this.props.data.image}')`}}></div>
                    <div>
                        <span>{this.props.data.name}</span>
                        <span>{this.props.data.time}</span>
                    </div>
                </div>
                <div className='post_cont'>
                    <span>
                        {this.props.data.content}
                    </span>
                </div>
            </div>
        );
    }
}

export default Post;