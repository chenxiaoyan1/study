import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import 'antd/dist/antd.css';

import App from './App';
import SetStateTest from "./setState";

function Title (){
    return (
    <p>111</p>
    )
}
const Title2 = React.memo(Title);
var h = (<App><Title2/><Title/></App>)
console.log(h)
ReactDOM.render(
    <App />,
    // <SetStateTest></SetStateTest>,
  document.getElementById('root')
);

