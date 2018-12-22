import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './SignInView.css';

class SignInView extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      weight: '',
      height: '',
      gender: 'm',
      password: '',
      error: '',
      signin: false
    }
  }

  validateUserSignup(event) {
    const key = event.target.getAttribute('name');
    const value = event.target.value;
    if (key === 'email') {
      this.setState({
        email: value
      });
    } else if (key === 'password') {
      this.setState({
        password: value
      });
    } else if (key === 'weight') {
      this.setState({
        weight: value
      });
    } else if (key === 'height') {
      this.setState({
        height: value
      });
    }
  }

  displayError(message) {
    this.setState({
      error: message
    });
    var timeout = setInterval(() => {
      this.setState({
        error: ''
      });
      clearInterval(timeout);
    }, 3000)
  }

  createAccount() {
    this.setState({
      gender: document.querySelector('input[name="gender"]:checked').getAttribute('value')
    });
    if (this.state.email.indexOf('@') === -1) {
      this.displayError('Check your email address.');
    } else if (this.state.weight < 50) {
      this.displayError('Weight is set incorrectly.');
    } else if (this.state.height < 48) {
      this.displayError('Height is set incorrectly.');
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        this.signin(true);
      }).catch(error => {
        this.displayError(error.message);
      })
    }
  }

  signinToggle() {
    this.setState({
      signin: (this.state.signin) ? false : true
    });
  }

  signin(create) {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((session) => {
      if (create) {
        firebase.database().ref(`users/personal/${session.user.uid}/`).set({
          weight: this.state.weight,
          height: this.state.height,
          gender: this.state.gender
        });
      }
      this.setState({
        password: ''
      });
    }).catch((error) => {
      this.displayError(error.message);
    })
  }

  render() {
    return (
      <div className="signin-wrapper container">
        {!this.state.signin ?
          <div className="row">
            <div className="col-12">
              <h2 className="signin-header">LET'S GET FIT,</h2>
              <p className="signin-subheader">Find the perfect fitness couch...</p>
            </div>
            <div className="col-12">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-12">
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mb-3">
                <input type="number" className="form-control" placeholder="Weight (lbs)" name="weight" value={this.state.weight} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mb-3">
                <input type="number" className="form-control" placeholder="Height (inches)" name="height" value={this.state.height} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-6 gender-selection">
              <label className="radio-inline"><input type="radio" name="gender" value="m" onChange={this.validateUserSignup.bind(this)} defaultChecked />Male</label>
            </div>
            <div className="col-6 gender-selection">
              <label className="radio-inline"><input type="radio" name="gender" value="f" onChange={this.validateUserSignup.bind(this)} />Female</label>
            </div>
          </div>
          :
          <div className="row">
            <div className="col-12">
              <h2 className="signin-header">LET'S GET FIT,</h2>
              <p className="signin-subheader">Find the perfect fitness couch...</p>
            </div>
            <div className="col-12">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-12">
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
          </div>}
        {this.state.error ?
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
          :
          null
        }
        <div className="col-12">
          {!this.state.signin ? <button type="submit" className="create-account-btn btn btn-dark" onClick={this.createAccount.bind(this)}>Create Account</button> : null}
          {this.state.signin ? <button type="submit" className="create-account-btn btn btn-dark" onClick={this.signinToggle.bind(this)}>Create Account</button> : null}
        </div>
        <div className="col-12">
          {!this.state.signin ? <button type="submit" className="signin-btn btn btn-secondary" onClick={this.signinToggle.bind(this)}>Sign In</button> : null}
          {this.state.signin ? <button type="submit" className="signin-btn btn btn-secondary" onClick={this.signin.bind(this)}>Sign In</button> : null}
        </div>
      </div>
    );
  }
}

export default SignInView;
