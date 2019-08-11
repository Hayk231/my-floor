import React, {Component} from 'react';
import './Users.scss';
import firebase from "firebase";

class Users extends Component {

    state = {
        usersData: []
    };

    componentDidMount() {
        let userRef = firebase.database().ref('userId/');
        userRef.on('value', snapshot => {
            let val = snapshot.val();
            let allUsers = [];
            for (let key in val) {
                allUsers.push(val[key])
            }
            this.setState({usersData: allUsers})
        });
    }

    render() {
        return (
            <div className='users_par'>
                {
                    this.state.usersData.map(el => {
                        return (
                            <div key={el.id} className='user'>
                                <div className='users_pic'>
                                    <div style={{backgroundImage: `url(${el.profPic})`}}> </div>
                                </div>
                                <span>{el.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Users;