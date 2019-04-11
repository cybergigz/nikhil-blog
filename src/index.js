import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/css/bootstrap.css";
import "./assets/css/animate.css";
import "./assets/fonts/ionicons/css/ionicons.min.css";
import "./assets/fonts/fontawesome/css/font-awesome.min.css";
import "./assets/fonts/flaticon/font/flaticon.css";
import "./assets/css/style.css"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
