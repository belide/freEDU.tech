import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './components/App';

const config = {
  apiKey: "AIzaSyDl0fP54bPd7r3jAhM86g6oRBJkBWKQY4g",
  authDomain: "freedu-c737e.firebaseapp.com",
  databaseURL: "https://freedu-c737e.firebaseio.com",
  projectId: "freedu-c737e",
  storageBucket: "freedu-c737e.appspot.com",
  messagingSenderId: "22418958348"
};

firebase.initializeApp(config);

const root = document.getElementById('root');

ReactDOM.render(
  <App />,
  root
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(
      <NextApp />,
      root
    )
  })
}
