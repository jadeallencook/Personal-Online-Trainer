import React, { Component } from 'react';
import './UserDashboardView.css';
import ProfileComponent from '../components/ProfileComponent';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import datestamp from '../services/datestamp.service';
import validate from '../services/validate.service';
var zipcodes = require('zipcodes');

class UserDashboardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workouts: {},
      completed: {}
    }
  }

  componentDidMount() {
    firebase.database().ref(`users/${this.props.AuthUID}/workouts`).on('value', snapshot => {
      const keys = (snapshot.val()) ? Object.keys(snapshot.val()) : [];
      let today = [];
      const day = (new Date().getDay()) ? new Date().getDay() - 1 : 6;
      keys.forEach(key => {
        if (!today[key]) {
          const workout = snapshot.val()[key];
          if (workout.repeats[day]) today[key] = workout;
          else if (workout.repeats.reduce((a, b) => a + b, 0) === 0) today[key] = workout;
        }
      });
      this.setState({
        workouts: today
      });
    });
    firebase.database().ref(`users/${this.props.AuthUID}/history/workouts/${datestamp()}`).on('value', snapshot => {
      this.setState({
        completed: snapshot.val()
      });
    });
  }

  completeWorkout(uid) {
    const workout = this.state.workouts[uid];
    firebase.database()
      .ref(`users/${this.props.AuthUID}/history/workouts/${datestamp()}/${uid}`)
      .set(workout)
      .then(() => {
        if (workout.repeats.reduce((a, b) => a + b, 0) === 0) {
          firebase.database()
            .ref(`users/${this.props.AuthUID}/workouts/${uid}`)
            .remove();
        }
      });
  }

  undoWorkout(uid) {
    const workout = this.state.completed[uid];
    firebase.database()
      .ref(`users/${this.props.AuthUID}/history/workouts/${datestamp()}/${uid}`)
      .remove()
      .then(() => {
        if (workout.repeats.reduce((a, b) => a + b, 0) === 0) {
          firebase.database()
            .ref(`users/${this.props.AuthUID}/workouts/${uid}`)
            .set(workout);
        }
      })
  }

  render() {

    return (
      <div className="UserDashboardView">

        <ProfileComponent AuthUID={this.props.AuthUID}></ProfileComponent>
        
        <div className="container animated flipInX full-width-placement" style={{
          backgroundImage: 'url(http://www.muscleandstrength.com/store/media/products/products/c/c4banner1.jpg)'
        }}></div>

        <div className="container animated fadeIn">
          <div className="row stat-wrapper">
            <div className="col-12">
              <h2 className="section-title animated slideInDown">TODAY'S WORKOUTS</h2>
            </div>
            {
              (
                validate(this.state.workouts) && 
                Object.keys(this.state.workouts).length
              ) ?
              Object.keys(this.state.workouts).map(key => {
                const workout = this.state.workouts[key];
                if (!this.state.completed || Object.keys(this.state.completed).indexOf(key) === -1) {
                  return (
                    <div className="col-12 animated flipInX delay-2 todo-list-item-wrapper" key={key}>
                      <div className="alert alert-secondary todo-list-item" role="alert">
                        {workout.title}
                        <button type="button" className="btn btn-dark" onClick={() => this.completeWorkout.bind(this)(key)}>COMPLETE</button>
                      </div>
                    </div>
                  )
                }
              }) : 
                <div className="col-12 animated flipInX delay-2 todo-list-item-wrapper">
                  <span className="section-footer">You don't have any workouts setup yet!</span>
                  <br /><br />
                </div>
            }
            {
              (this.state.completed) ?
              Object.keys(this.state.completed).map(key => {
                const workout = this.state.completed[key];
                return (
                  <div className="col-12 animated flipInX delay-2 todo-list-item-wrapper" key={key}>
                    <div className="alert alert-success todo-list-item" role="alert">
                      {workout.title}
                      <button type="button" className="btn btn-secondary" onClick={() => this.undoWorkout.bind(this)(key)}>UNDO</button>
                    </div>
                  </div>
                )
              }) : null
            }
          </div>
        </div>

        <div className="container animated fadeIn">
          <div className="row stat-wrapper">
            <div className="col-12">
              <h2 className="section-title animated slideInDown">FITNESS TRAINERS</h2>
            </div>
            <div className="col-3 animated zoomIn coach-image-wrapper">
              <div className="fitness-profile-photo" style={{
                backgroundImage: `url('https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-0/p206x206/41109575_10100200014368183_1284167012158799872_n.jpg?_nc_cat=101&_nc_ht=scontent-sjc3-1.xx&oh=b48d78a07553b06919047e95dcab9b1d&oe=5C98E191')`
              }}></div>
              <h4>Roland</h4>
              <span>{zipcodes.lookup(48708).city}</span>
            </div>
            <div className="col-3 animated zoomIn coach-image-wrapper">
              <div className="fitness-profile-photo" style={{
                backgroundImage: `url('https://i.pinimg.com/originals/a4/cd/ba/a4cdbaf1252efdfd69aeb2ce96b8f5ae.jpg')`
              }}></div>
              <h4>Tyson</h4>
              <span>{zipcodes.lookup(90210).city}</span>
            </div>
            <div className="col-3 animated zoomIn coach-image-wrapper">
              <div className="fitness-profile-photo" style={{
                backgroundImage: `url('https://i.pinimg.com/originals/d4/40/1d/d4401da383efc7ac495bb75cc26e796f.jpg')`
              }}></div>
              <h4>Erick</h4>
              <span>{zipcodes.lookup(84111).city}</span>
            </div>
            <div className="col-3 animated zoomIn coach-image-wrapper">
              <div className="fitness-profile-photo" style={{
                backgroundImage: `url('https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/31206367_1746628798729853_2711752882230657024_o.jpg?_nc_cat=104&_nc_ht=scontent-sjc3-1.xx&oh=1616319655991e1c0d366db29e471d6e&oe=5CD0CDF4')`
              }}></div>
              <h4>Mitch</h4>
              <span>{zipcodes.lookup(48763).city}</span>
            </div>
            <div className="col-12 view-all-trainers">
              <span className="animated fadeIn delay-2">VIEW ALL TRAINERS</span>
            </div>
          </div>
        </div>

        <div className="container animated flipInX full-width-placement" style={{
          backgroundImage: 'url(http://2.bp.blogspot.com/-DRnhjG17sRw/UR0RBP2DCSI/AAAAAAAAAT0/LAfVHqUhHAc/s1600/banner_products_mutantmayhem.jpg)'
        }}></div>

      </div>
    );
  }
}

export default UserDashboardView;
