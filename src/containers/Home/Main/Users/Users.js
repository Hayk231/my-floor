import React, {Component} from 'react';
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
            <div>
                {
                    this.state.usersData.map(el => {
                        return (
                            <div key={el.id}>
                                <span>{el.name}</span>
                                <span>{el.id}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Users;