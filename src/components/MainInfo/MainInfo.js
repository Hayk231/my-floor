import React, {Component} from 'react';
import './MainInfo.scss';

class MainInfo extends Component {

    render() {
        return (
            <div className='main_info' onClick={this.props.toggleModal}>
                <div className='show_info'>
                    <div className='cover_img'></div>
                    <div style={{backgroundImage: `url(${this.props.img})`}} className='profImg'></div>
                    <p>{this.props.name}</p>
                </div>
            </div>
        );
    }
}

export default MainInfo;