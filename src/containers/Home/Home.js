import React , { Component } from 'react';
import './Home.scss';
import { connect } from "react-redux";
import firebase from 'firebase';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Spinner from '../../components/Spinner/Spinner';

class Home extends Component {

    constructor(props){
        super(props);
        this.imageInput = React.createRef();
    }
    state = {
        fileUrl: null,
        profImg: null,
        show: false,
        buttText: false,
        imgLink: false,
        setName: '',
        spinner: null,
        open: 0
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
        if (this.state.setName) {
            localStorage.setItem('userName', this.state.setName);
        }
        const file = this.imageInput.current.files[0];
        if (file) {
            this.setState({spinner: true});
            const storageRef = firebase.storage().ref('/ProfilePictures');
            const mainImage = storageRef.child(file.name);
            mainImage.put(file).then(() => {
                storageRef.child(file.name).getDownloadURL().then((url) => {
                    this.setState({fileUrl: url});
                    this.popImage(url);
                })
            });
        }
        this.setState({show: false, buttText: false});
    };

    popImage = (imgUrl) => {
        let userKey = localStorage.getItem('userKey');
        let userRef = firebase.database().ref('userId/' + userKey);
        userRef.update({profPic: imgUrl})
            .then(res => {
                setTimeout(() => {
                    this.setState({spinner: false});
                },1500);
            });
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
        this.setState({open: 1})
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

        let name = localStorage.getItem('userName');

        let changeComp = null;
        if (this.state.spinner) {
            changeComp = <Spinner/>
        }
        return (
            <div className='Profile'>
                <div className='prof_head'>
                    <div className='prof_cont'>
                        <span>Logo</span>
                        <div className='prof_edit' onClick={this.openDiv}>
                            <span>{name}</span>
                            <div style={{backgroundImage: `url(${this.state.profImg})`}} className='prof_pic'>
                                <div className='pic_hov' onClick={this.uploadShow}>
                                    <FontAwesomeIcon icon={faImages} />
                                </div>
                            </div>
                            <FontAwesomeIcon icon={faChevronDown}/>
                            <div className='open_div' style={{transform: `scaleY(${this.state.open})`}}></div>
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
                            <button onClick={this.uploadImage}>Change</button>
                        </div>
                        <div>
                            <input type='text' defaultValue={name} onChange={this.setName}/>
                        </div>
                    </div>
                </div>
                {changeComp}
            </div>
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