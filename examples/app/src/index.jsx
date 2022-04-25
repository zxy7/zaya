import React from 'react';
import ReactDOM from 'react-dom';
const Hello = () => {
    const [text, setText] = React.useState('Hello Zaya!');
    return (<span
        onClick={() => {
            setText('Hi!')
        }}> {text} </span>);
};
const root = ReactDOM.createRoot(document.getElementById('zaya'));
root.render(React.createElement(Hello));
