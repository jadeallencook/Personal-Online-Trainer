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
      created: false
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
      if (user) {
        firebase.database().ref(`users/${user.uid}/gender`).once('value', snapshot => {
          if (snapshot.val()) {
            this.setState({
              user: user,
              created: snapshot.val()
            });
          }
        });
      } else {
        this.setState({
          user: null,
          created: false
        });
      }
    });
  }
  
  render() {
    return (
      <div className="App">
        <TopNavbarComponent />
        { 
          (this.state.user && this.state.created) ? 
          <UserDashboardView AuthUID={this.state.user.uid} Profile={this.state.created} /> : 
          <SignInView /> 
        }
        <FooterComponent />
      </div>
    );
  }
}

export default App;
