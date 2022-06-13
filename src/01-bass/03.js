import React from "react";
import '../App.css';
//import Column from "antd/lib/table/Column";
//App组件类必须继承React中的Component类
import {Tabs} from 'antd';

const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const App03 = () => {

    return (
        <div className="App" style={{margin: '200px'}}>
            Hello Word
        </div>
    );
};

export default App03
