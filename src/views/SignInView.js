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
      if (create === true && this.state.weight && this.state.height) {
        const newDate = new Date(),
              month = newDate.getUTCMonth() + 1,
              day = newDate.getUTCDate() - 1,
              year = newDate.getUTCFullYear(),
              dateKey = `${month}-${day}-${year}`;
        let weight = {};
        weight[dateKey] = parseInt(this.state.weight);
        weight.current = parseInt(this.state.weight);
        firebase.database().ref(`users/${session.user.uid}/`).set({
          weight: weight,
          height: parseInt(this.state.height),
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
              <h2 className="signin-header animated tada">LET'S GET FIT!</h2>
              <p className="signin-subheader animated fadeInUp delay-1">Find the perfect fitness coach...</p>
            </div>
            <div className="col-12">
              <div className="input-group mb-3">
                <input type="email" className="form-control animated flipInX delay-1" placeholder="Email" name="email" value={this.state.email} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-12">
              <div className="input-group mb-3">
                <input type="password" className="form-control animated flipInX delay-1" placeholder="Password" name="password" value={this.state.password} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mb-3">
                <input type="number" className="form-control animated flipInX delay-1" placeholder="Weight (lbs)" name="weight" value={this.state.weight} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mb-3">
                <input type="number" className="form-control animated flipInX delay-1" placeholder="Height (inches)" name="height" value={this.state.height} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-6 gender-selection animated flipInX delay-1">
              <label className="radio-inline"><input type="radio" name="gender" value="m" onChange={this.validateUserSignup.bind(this)} defaultChecked />Male</label>
            </div>
            <div className="col-6 gender-selection animated flipInX delay-1">
              <label className="radio-inline"><input type="radio" name="gender" value="f" onChange={this.validateUserSignup.bind(this)} />Female</label>
            </div>
          </div>
          :
          <div className="row">
            <div className="col-12">
              <h2 className="signin-header animated fadeIn">YOUR ACCOUNT</h2>
              <p className="signin-subheader animated fadeIn delay-2">We're going to crush it...</p>
            </div>
            <div className="col-12">
              <div className="input-group mb-3 animated flipInX delay-1">
                <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.validateUserSignup.bind(this)} />
              </div>
            </div>
            <div className="col-12">
              <div className="input-group mb-3 animated flipInX delay-1">
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
          {!this.state.signin ? <button type="submit" className="create-account-btn btn btn-dark animated flipInX delay-2" onClick={this.createAccount.bind(this)}>Create Account</button> : null}
          {this.state.signin ? <button type="submit" className="create-account-btn btn btn-dark animated flipInX delay-2" onClick={this.signinToggle.bind(this)}>Create Account</button> : null}
        </div>
        <div className="col-12">
          {!this.state.signin ? <button type="submit" className="signin-btn btn btn-secondary animated flipInX delay-1" onClick={this.signinToggle.bind(this)}>Sign In</button> : null}
          {this.state.signin ? <button type="submit" className="signin-btn btn btn-secondary animated flipInX delay-1" onClick={this.signin.bind(this)}>Sign In</button> : null}
        </div>
      </div>
    );
  }
}

export default SignInView;
