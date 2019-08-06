import React, {Component} from 'react';
import './Post.scss';

class Post extends Component {
    render() {
        return (
            <div className='post'>
                <div className='post_info'>
                    <div style={{backgroundImage: `url('${this.props.data.profPic}')`}}></div>
                    <div>
                        <span>{this.props.data.name}</span>
                    </div>
                </div>
                <div className='post_cont'>
                    <span>
                        Lorem ipsum is derived from the
                        Latin "dolorem ipsum" roughly translated as "pain itself."
                    </span>
                </div>
            </div>
        );
    }
}

export default Post;