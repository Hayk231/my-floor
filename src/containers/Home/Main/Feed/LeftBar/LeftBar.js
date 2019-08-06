import React, {Component} from 'react';
import './LeftBar.scss';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

class LeftBar extends Component {
    render() {
        return (
            <div className='feed_left'>
                <Link to={'/home/profile/'}><FontAwesomeIcon icon={faHome}/> My profile</Link>
                <Link to={'/home/feed/'}><FontAwesomeIcon icon={faNewspaper}/> News</Link>
                <Link to={'/home/chat/'}><FontAwesomeIcon icon={faComments}/> Chat</Link>
                <Link to={'/home/settings/'}><FontAwesomeIcon icon={faWrench}/> Settings</Link>
                <Link to={'/home/users/'}><FontAwesomeIcon icon={faUsers}/> Users</Link>
            </div>
        );
    }
}

export default LeftBar;