import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global';

if(typeof(module.hot) !== 'undefined') {
    module.hot.accept();
}

ReactDOM.hydrate(<App />, document.getElementById('root'));