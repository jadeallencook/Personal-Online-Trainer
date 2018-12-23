import React, { Component } from 'react';
import './ProfileComponent.css';
import * as user from '../models/user.model';
import * as models from '../models/profile.model';
import rjsBind from '../services/rjsBind.service';
import guid from '../services/guid.service';
import * as firebase from 'firebase/app';
import 'firebase/database';

class ProfileComponent extends Component {

  constructor() {
    super();
    this.state = {
      user: JSON.parse(JSON.stringify(user.default)),
      workout: JSON.parse(JSON.stringify(models.default.workout)),
    };
  }

  toggleAvailbleDay(event) {
    const num = parseInt(event.target.getAttribute('data-val'));
    let array = this.state.workout.repeats;
    array[num] = (this.state.workout.repeats[num]) ? 0 : 1;
    this.setState({
      workout: {
        ...this.state.workout,
        repeats: array
      }
    });
  }

  resetWorkout() {
    this.setState({
      workout: JSON.parse(JSON.stringify(models.default.workout))
    });
  }

  addWorkout() {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/workouts/`)
      .push(this.state.workout)
      .then(this.resetWorkout.bind(this));
  }

  removeWorkout(uid) {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/workouts/${uid}`)
      .remove()
      .then(this.resetWorkout.bind(this));
  }

  updateWorkoutForm(event) {
    const key = event.target.getAttribute('data-key');
    let object = {};
    object[key] = event.target.value;
    this.setState(object)
  }

  componentDidMount() {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).on('value', snapshot => {
      this.setState({
        user: {...user.default, ...snapshot.val() }
      });
    });
  }

  render() {

    return (
      <div className="ProfileComponent">

        <div className="modal fade" id="tasks-modal" tabIndex="-1" role="dialog" aria-labelledby="tasks-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">YOUR WORKOUTS</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>You can assign yourself workouts or connect with a fitness trainer to assign them for you.</p>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">WORKOUT</th>
                      <th scope="col">REPEATS</th>
                      <th scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  {
                    Object.keys(this.state.user.workouts).map(key => {
                        return (
                          <tbody key={key}>
                            <tr>
                              <th scope="row">{ this.state.user.workouts[key].title }</th>
                              <td>
                              { (this.state.user.workouts[key].repeats.reduce((a, b) => a + b, 0) === 7) ? 
                                'Everyday' : 
                                this.state.user.workouts[key].repeats.map((val, i) => {
                                    if (i === 0 && val) return 'M ';
                                    else if (i === 1 && val) return 'T ';
                                    else if (i === 2 && val) return 'W ';
                                    else if (i === 3 && val) return 'R ';
                                    else if (i === 4 && val) return 'F ';
                                    else if (i === 5 && val) return 'S ';
                                    else if (i === 6 && val) return 'U ';
                                })
                              }
                              {
                                (this.state.user.workouts[key].repeats.reduce((a, b) => a + b, 0) === 0) ? 'Never' : null
                              }
                              </td>
                              <td><button type="button" className="btn btn-danger option-btn" onClick={() => {
                                this.removeWorkout(key);
                              }}>Remove</button></td>
                            </tr>
                          </tbody>
                        );
                      })
                  }
                </table>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">NEW WORKOUT</h5>
              </div>
              <div className="modal-body">
                <input type="email" className="form-control" data-path="workout-title" value={this.state.workout.title} onChange={event => rjsBind.bind(this, event)()} placeholder="Workout" />
                <div className="day-picker">
                  <div data-val="0" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats[0]) ? 'selected' : null}>Mon</div>
                  <div data-val="1" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats[1]) ? 'selected' : null}>Tue</div>
                  <div data-val="2" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats[2]) ? 'selected' : null}>Wed</div>
                  <div data-val="3" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats[3]) ? 'selected' : null}>Thu</div>
                  <div data-val="4" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats[4]) ? 'selected' : null}>Fri</div>
                  <div data-val="5" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats[5]) ? 'selected' : null}>Sat</div>
                  <div data-val="6" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats[6]) ? 'selected' : null}>Sun</div>
                </div>
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" data-path="workout-calories" value={this.state.workout.calories} onChange={event => rjsBind.bind(this, event)()} placeholder="Calories" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width" onClick={this.addWorkout.bind(this)}>Add Workout</button></div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="weight-modal" tabIndex="-1" role="dialog" aria-labelledby="weight-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="weight-modal">YOUR WEIGHT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Log your weight to see you progress over time, here's your three most recent weigh ins.</p>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">DATE</th>
                      <th scope="col">WEIGHT</th>
                      <th scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">12/12/18</th>
                      <td>161 lbs</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th scope="row">12/15/18</th>
                      <td>156 lbs</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th scope="row">12/21/18</th>
                      <td>154 lbs</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">Log Weight</h5>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="exampleInputEmail1" placeholder="Pounds" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width">Weigh In</button></div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="bmi-modal" tabIndex="-1" role="dialog" aria-labelledby="bmi-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="bmi-modal">YOUR BMI</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>BMI is calculated by using your current weight and height, try keeping it between 20 and 30.</p>
                <p>Your height is set to: <b>71 inches</b></p>
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="height" placeholder="Inches" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width">Save Height</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="calories-modal" tabIndex="-1" role="dialog" aria-labelledby="calories-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="calories-modal">YOUR CALORIES</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>This is how many calories you have left for the day. Your current daily intake limit is set to <b>1525</b>.</p>
                <div className="row">
                  <div className="col-8"><input type="text" className="form-control" id="exampleInputEmail1" placeholder="Meal" /></div>
                  <div className="col-4"><input type="number" className="form-control" id="exampleInputEmail1" placeholder="Calories" /></div>
                  <div className="col-12"><br /><button type="button" className="btn btn-dark full-width">ADD MEAL</button></div>
                </div>
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">MEAL</th>
                      <th scope="col">CALORIES</th>
                      <th scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Smoothie</th>
                      <td>125</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th scope="row">Sandwich</th>
                      <td>200</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">DAILY INTAKE LIMIT</h5>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="exampleInputEmail1" placeholder="Calories" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width">SET LIMIT</button></div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="burned-modal" tabIndex="-1" role="dialog" aria-labelledby="burned-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="burned-modal">BURNED CALORIES</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>This is how many calories you've burned today.</p>
                <div className="row">
                  <div className="col-8"><input type="text" className="form-control" id="exampleInputEmail1" placeholder="Workout" /></div>
                  <div className="col-4"><input type="number" className="form-control" id="exampleInputEmail1" placeholder="Calories" /></div>
                  <div className="col-12"><br /><button type="button" className="btn btn-dark full-width">ADD WORKOUT</button></div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">WORKOUT</th>
                      <th scope="col">CALORIES</th>
                      <th scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Run 1 Mile</th>
                      <td>150</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="water-modal" tabIndex="-1" role="dialog" aria-labelledby="water-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="water-modal">WATER CONSUMPTION</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>This is how much water you've consumed today. You're current daily water consumtion goal is <b>8</b> ounce(s).</p>
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="exampleInputEmail1" placeholder="Ounce(s)" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width">ADD DRINK</button></div>
                </div>
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Ounce(s)</th>
                      <th scope="col">Time</th>
                      <th scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>1:32PM</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                    <tr>
                      <th scope="row">1</th>
                      <td>10:26AM</td>
                      <td><button type="button" className="btn btn-danger option-btn">Remove</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">DAILY GOAL</h5>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="exampleInputEmail1" placeholder="Ounce(s)" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width">SET GOAL</button></div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="container animated fadeIn">
          <div className="row stat-wrapper">
            <div className="col-12">
              <h2 className="section-title animated slideInDown">YOUR PROFILE</h2>
            </div>
            <div className="col-4 stat-container">
              <label className="animated fadeInDown delay-1">WORKOUTS</label>
              <button type="button" className="btn btn-dark animated flipInX delay-1" data-toggle="modal" data-target="#tasks-modal">{ Object.keys(this.state.user.workouts).length }</button>
            </div><div className="col-4 stat-container">
              <label className="animated fadeInDown delay-1">WEIGHT</label>
              <button type="button" className="btn btn-dark animated flipInX delay-1" data-toggle="modal" data-target="#weight-modal">{ this.state.user.weight.current }</button>
            </div><div className="col-4 stat-container">
              <label className="animated fadeInDown delay-1">BMI</label>
              <button type="button" className="btn btn-success animated flipInX delay-1" data-toggle="modal" data-target="#bmi-modal">
              { 
                (this.state.user.weight.current && this.state.user.height) ? 
                Math.round((this.state.user.weight.current * 703) / (this.state.user.height * this.state.user.height)) :
                'ERROR'
              }
              </button>
            </div>
            <div className="stat-spacer col-12"></div>
            <div className="col-4 stat-container">
              <label className="animated fadeInDown delay-2">CALORIES</label>
              <button type="button" className="btn btn-success animated flipInX delay-2" data-toggle="modal" data-target="#calories-modal">{ this.state.user.calories.today }</button>
            </div><div className="col-4 stat-container">
              <label className="animated fadeInDown delay-2">BURNED</label>
              <button type="button" className="btn btn-dark animated flipInX delay-2" data-toggle="modal" data-target="#burned-modal">{ this.state.user.burned.today }</button>
            </div><div className="col-4 stat-container">
              <label className="animated fadeInDown delay-2">WATER</label>
              {
                (this.state.user.water.today < this.state.user.water.goal - (this.state.user.water.goal / 2)) ? 
                <button type="button" className="btn btn-danger animated flipInX delay-2" data-toggle="modal" data-target="#water-modal">{ this.state.user.water.today }</button> 
                : <button type="button" className="btn btn-success animated flipInX delay-2" data-toggle="modal" data-target="#water-modal">{ this.state.user.water.today }</button> 
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
