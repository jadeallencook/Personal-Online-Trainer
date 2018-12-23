import React, { Component } from 'react';
import SignInView from './views/SignInView';
import UserDashboardView from './views/UserDashboardView';
import TopNavbarComponent from './components/TopNavbarComponent';
import FooterComponent from './components/FooterComponent';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';

import firebase from 'firebase/app';
import 'firebase/auth';

class App extends Component {
  constructor() {
    // set user state
    super();
    this.state = {
      user: null,
      authStateChecked: false
    }
    // configure and initialize firebase
    firebase.initializeApp({
      apiKey: "AIzaSyBHiDcWDmvpc8y5WqBsvDhVr8FkPwKDrig",
      authDomain: "personal-online-trainer.firebaseapp.com",
      databaseURL: "https://personal-online-trainer.firebaseio.com",
      projectId: "personal-online-trainer",
      storageBucket: "",
      messagingSenderId: "487563225286"
    });
    // update state on auth change
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
        authStateChecked: true
      });
    });
  }
  
  render() {
    return (
      <div className="App">
        <TopNavbarComponent />
        { (this.state.user) ? <UserDashboardView /> : null }
        { (!this.state.user && this.state.authStateChecked) ? <SignInView /> : null }
        }
        <FooterComponent />
      </div>
    );
  }
}

export default App;
