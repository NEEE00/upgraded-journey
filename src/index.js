import React from 'react';
import ReactDOM from 'react-dom';
import './01-bass/login' //导入
import App from './01-bass/login'
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import App03 from "./01-bass/03";
import Base from "./01-bass/base";
import Card from "./01-bass/card";
import User from "./01-bass/user";
import Order from "./01-bass/order";

//import './02-首页/01-homepage'
//import App from'./02-首页/01-homepage'
// const root = ReactDOM.createRoot(
//     document.getElementById("root")
// );


//
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Base/>}>
                <Route path="card" element={<Card/>}/>
                <Route path="user" element={<User/>}/>
                <Route path="order" element={<Order/>}/>
            </Route>
            <Route path="/login" element={<App/>}/>
            <Route path="/03" element={<App03/>}/>
        </Routes>
    </BrowserRouter>
    , document.getElementById("root"));

// ReactDOM.render(<App></App>,document.getElementById("root"))

/* 也可以写成单标签
ReactDOM.render(<App/>,document.getElementById("root")) */

/* import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  );
//ReactDOM.render("11111",document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); */


