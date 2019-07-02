import React, {Component, Fragment} from 'react';
import './Home.scss';
import { connect } from "react-redux";
import firebase from 'firebase';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Spinner from '../../components/Spinner/Spinner';
import Main from "./Main/Main";
import {NavLink} from "react-router-dom";

class Home extends Component {

    constructor(props){
        super(props);
        this.imageInput = React.createRef();
        this.nameRef = React.createRef();
    }
    state = {
        fileUrl: null,
        profImg: null,
        show: false,
        buttText: false,
        imgLink: false,
        setName: '',
        spinner: null,
        open: 0,
        edit: false
    };

    componentDidMount() {
        let userKey = localStorage.getItem('userKey');
        let userRef = firebase.database().ref('userId/' + userKey);
        userRef.on('value', snapshot => {
            let val = snapshot.val().profPic;
            this.setState({profImg: val});
        });
    }

    uploadImage = () => {
        let name = this.state.setName ? this.state.setName : localStorage.getItem('userName');
        if (name) {
            localStorage.setItem('userName', name);
            this.popImage(null, name);
        }
        const file = this.imageInput.current.files[0];
        if (file) {
            this.setState({spinner: true});
            const storageRef = firebase.storage().ref('/ProfilePictures');
            const mainImage = storageRef.child(file.name);
            mainImage.put(file).then(() => {
                storageRef.child(file.name).getDownloadURL().then((url) => {
                    this.setState({fileUrl: url});
                    this.popImage(url, name);
                })
            });
        }
        this.setState({show: false, buttText: false});
    };

    popImage = (imgUrl, name) => {
        let userKey = localStorage.getItem('userKey');
        let userRef = firebase.database().ref('userId/' + userKey);
        if (imgUrl) {
            userRef.update({profPic: imgUrl, name: name})
                .then(res => {
                    setTimeout(() => {
                        this.setState({spinner: false});
                    },2000);
                });
        } else {
            userRef.update({name: name})
                .then(res => {});
        }

    };

    uploadShow = () => {
        this.setState({show: true});
    };
    uploadHide = (e) => {
        if (e.target.classList.contains('upload_cont')) {
            this.setState({show: false, buttText: false});
        }
    };

    fileChange = (e) => {
        if (e.target.value) {
            this.setState({buttText: true, imgLink: URL.createObjectURL(e.target.files[0])})
        }
    };

    setName = (e) => {
        this.setState({setName: e.target.value})
    };

    openDiv = () => {
        if (this.state.open === 0 ) {
            this.setState({open: 1})
        } else {
            this.setState({open: 0})
        }
    };

    editName = () => {
        this.setState({edit: true});
    };

    cancelHandler = () => {
        this.nameRef.current.reset();
        this.setState({show: false, buttText: false, edit: false, imgLink: this.state.profImg});
    };

    render() {
        let show = 'none';
        if (this.state.show) {
            show = 'flex';
        }
        let text = '';
        if (this.state.buttText) {
            text = 'Completed';
        } else {
            text = 'Choose Image';
        }
        let prev_image = this.state.profImg;
        if (this.state.imgLink) {
            prev_image = this.state.imgLink;
        }

        let name = localStorage.getItem('userName').split(' ')[0];

        let changeComp = null;
        if (this.state.spinner) {
            changeComp = <Spinner/>
        }
        let active = null;
        if (this.state.open === 1) {
            active = 'active';
        }
        let editable = true;
        let newClass = null;
        let showed_text = null;
        if (this.state.edit) {
            newClass = 'editable';
            editable = false;
            showed_text = 'showed_text';
        }

        return (
            <Fragment>
                <div className='Profile'>
                <div className='prof_head'>
                    <div className='prof_cont'>
                        <div className='logo'>
                            <FontAwesomeIcon icon={faUserAstronaut}/>
                            <FontAwesomeIcon icon={faMeteor}/>
                        </div>
                        <div className={`prof_edit ${active}`} onClick={this.openDiv}>
                            <span>{name}</span>
                            <div style={{backgroundImage: `url(${this.state.profImg})`}} className='prof_pic'></div>
                            <FontAwesomeIcon icon={faChevronDown}/>
                            <div className='open_div' style={{transform: `scaleY(${this.state.open})`}}>
                                <div>My Profile <FontAwesomeIcon icon={faUserCircle}/></div>
                                <div onClick={this.uploadShow}>Edit Profile <FontAwesomeIcon icon={faUserEdit}/></div>
                                <div>Settings <FontAwesomeIcon icon={faCogs}/></div>
                                <div>Log out <FontAwesomeIcon icon={faSignOutAlt}/></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='upload_cont' style={{display: show}} onClick={this.uploadHide}>
                    <div className='upload_div'>
                        <div style={{backgroundImage: `url(${prev_image})`}} className='upload_pic'></div>
                        <div className='choose_div'>
                            <label className='choose'>
                                    <input type='file' ref={this.imageInput} onChange={this.fileChange} accept="image/*"/>
                                <div>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                                    <span>{text}</span>
                                </div>
                            </label>
                            <div className='name'>
                                <form ref={this.nameRef}>
                                    <input className={newClass} type='text' defaultValue={name} onChange={this.setName} readOnly={editable}/>
                                </form>
                                <div className={`show_text ${showed_text}`} onClick={this.editName}>
                                    <FontAwesomeIcon icon={faPenFancy}/>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button onClick={this.uploadImage}>Change</button>
                                <button onClick={this.cancelHandler}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    {changeComp}
                </div>
                <Main/>

            </Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.userName,
        auth: state.auth
    };
};

export default connect(mapStateToProps)(Home);