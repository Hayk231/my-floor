import React, {Component} from 'react';
import './Post.scss';

class Post extends Component {

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
            </div>
        );
    }
}

export default Post;