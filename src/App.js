import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Categories from './components/Categories';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import Parse from 'parse/dist/parse.min.js';
import Login from './components/Login';
// Your Parse initialization configuration goes here

Parse.initialize(process.env.REACT_APP_PARSE_APPLICATION_ID, process.env.REACT_APP_PARSE_JAVASCRIPT_KEY);
Parse.serverURL = process.env.REACT_APP_PARSE_HOST_URL;




export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header></Header>
        <Router>
            <Routes>
              {/* <Route path="/" exact element={}></Route> */}
              <Route path="/register" element={<UserRegistration/>}></Route>
              <Route path="/categories" element={<Categories/>}></Route>
              <Route path="/login" exact element={<Login/>}></Route>
            </Routes>
          </Router>
         
            
            
        
      </div>

    )
  }
}
