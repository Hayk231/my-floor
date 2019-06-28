import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import firebase from  'firebase';

const config = {
    apiKey: "AIzaSyB4ECbdtpZynP-2ecCvekTNErhj98-KTWg",
    authDomain: "https://auth-50.firebaseio.com",
    databaseURL: "https://auth-50.firebaseio.com/",
    storageBucket: "gs://auth-50.appspot.com/",
};

firebase.initializeApp(config);

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

serviceWorker.unregister();
