import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './TopNavbarComponent.css';

class TopNavbarComponent extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">ONLINE FITNESS TRAINER</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {firebase.auth().currentUser ? 
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <span className="nav-link">Trainers</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">Profile</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">Settings</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => {
                  firebase.auth().signOut();
                }}>Log Out</span>
              </li>
            </ul>
          </div>
        : null
        }
      </nav>
    );
  }
}

export default TopNavbarComponent;
