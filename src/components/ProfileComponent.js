import React, { Component } from 'react';
import './ProfileComponent.css';
import * as user from '../models/user.model';
import * as models from '../models/profile.model';
import rjsBind from '../services/rjsBind.service';
import datestamp from '../services/datestamp.service';
import _assign from 'lodash/assign';
import * as firebase from 'firebase/app';
import 'firebase/database';

class ProfileComponent extends Component {

  constructor() {
    super();
    this.state = {
      user: JSON.parse(JSON.stringify(user.default)),
      workout: JSON.parse(JSON.stringify(models.default.workout)),
      weight: '',
      height: '',
      calories: {
        limit: ''
      },
      meal: {
        title: '',
        calories: ''
      },
      burned: {
        title: '',
        calories: ''
      },
      water: {
        goal: '',
        drink: ''
      }
    };
  }

  // workout
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

  addWorkout() {
    this.setState({
      workout: {
        calories: parseInt(this.state.workout.calories)
      }
    });
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/workouts/`)
      .push(this.state.workout)
      .then(this.setState({
        workout: JSON.parse(JSON.stringify(models.default.workout))
      }));
  }

  removeWorkout(uid) {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/workouts/${uid}`)
      .remove()
      .then(this.setState({ workout: JSON.parse(JSON.stringify(models.default.workout)) }));
  }

  // weight 
  removeWeight(uid) {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/history/weight/${uid}`)
      .remove()
      .then(this.setState({ weight: '' }));
  }

  addWeight() {
    this.setState({
      weight: parseInt(this.state.weight)
    });
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/weight`)
      .set(parseInt(this.state.weight))
      .then(() => {
        firebase.database()
          .ref(`users/${firebase.auth().currentUser.uid}/history/weight/${datestamp()}`)
          .set(parseInt(this.state.weight))
          .then(() =>{
            this.setState({
              weight: ''
            });
          });
      });
  }

  // height
  updateHeight() {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/height`)
      .set(parseInt(this.state.height))
      .then(this.setState({ height: '' }));
  }
  
  // calories 

  addMeal() {
    this.setState({
      meal: {
        calories: parseInt(this.state.meal.calories)
      }
    });
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/history/meals/${datestamp()}`)
      .push(this.state.meal)
      .then(this.setState({ meal: { calories: '', title: ''}}));
  }

  removeMeal(uid) {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/history/meals/${datestamp()}/${uid}`)
      .remove();
  }

  setCaloriesLimit() {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/goals/calories`)
      .set(parseInt(this.state.calories.limit))
      .then(this.setState({ calories: { limit: '' } }));
  }

  // burned 

  addBurned() {
    this.setState({
      burned: {
        calories: parseInt(this.state.burned.calories)
      }
    });
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/history/workouts/${datestamp()}`)
      .push(this.state.burned)
      .then(this.setState({ burned: { calories: '', title: ''}}));
  }

  removeBurned(uid) {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/history/workouts/${datestamp()}/${uid}`)
      .remove();
  }

  // water

  addWater() {
    let time = new Date();
    time = `${time.getHours()}:${time.getMinutes()}`;
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/history/water/${datestamp()}/${time}`)
      .set(this.state.water.drink)
      .then(this.setState({ water: { drink: '' }}));
  }

  removeDrink(time) {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/history/water/${datestamp()}/${time}`)
      .remove();
  }

  setWaterGoal() {
    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/goals/water`)
      .set(parseInt(this.state.water.goal))
      .then(this.setState({ water: { goal: '' }}));
  }
  
  // firebase sync
  componentDidMount() {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).on('value', snapshot => {
      this.setState({
        user: { 
          goals: {},
          ..._assign({}, this.state.user, snapshot.val()) 
        }
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
                    (this.state.user.workouts) ?
                    Object.keys(this.state.user.workouts).reverse().map(key => {
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
                                    else return null;
                                })
                              }
                              { (this.state.user.workouts[key].repeats.reduce((a, b) => a + b, 0) === 0) ? 'Never' : null }
                              </td>
                              <td><button type="button" className="btn btn-danger option-btn" onClick={() => {
                                this.removeWorkout(key);
                              }}>Remove</button></td>
                            </tr>
                          </tbody>
                        );
                      }) : null
                  }
                </table>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">NEW WORKOUT</h5>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" data-path="workout-title" value={this.state.workout.title} onChange={event => rjsBind.bind(this, event)()} placeholder="Workout" />
                <div className="day-picker">
                  <div data-val="0" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats && this.state.workout.repeats[0]) ? 'selected' : null}>Mon</div>
                  <div data-val="1" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats && this.state.workout.repeats[1]) ? 'selected' : null}>Tue</div>
                  <div data-val="2" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats && this.state.workout.repeats[2]) ? 'selected' : null}>Wed</div>
                  <div data-val="3" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats && this.state.workout.repeats[3]) ? 'selected' : null}>Thu</div>
                  <div data-val="4" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats && this.state.workout.repeats[4]) ? 'selected' : null}>Fri</div>
                  <div data-val="5" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats && this.state.workout.repeats[5]) ? 'selected' : null}>Sat</div>
                  <div data-val="6" onClick={this.toggleAvailbleDay.bind(this)} className={(this.state.workout.repeats && this.state.workout.repeats[6]) ? 'selected' : null}>Sun</div>
                </div>
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" data-path="workout-calories" value={this.state.workout.calories} onChange={event => rjsBind.bind(this, event)()} placeholder="Calories" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width" onClick={this.addWorkout.bind(this)} disabled={!this.state.workout.title || !this.state.workout.calories}>Add Workout</button></div>
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
                <p>Log your weight to see your progress over time.</p>
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" data-path="weight" value={this.state.weight} onChange={event => rjsBind.bind(this, event)()}  placeholder="Pounds" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width" onClick={this.addWeight.bind(this)} disabled={!this.state.weight}>Weigh In</button></div>
                </div>
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">DATE</th>
                      <th scope="col">WEIGHT</th>
                      <th scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  {
                    (this.state.user.history.weight) ?
                    Object.keys(this.state.user.history.weight).reverse().map(key => {
                      return (
                        <tbody key={key}>
                          <tr>
                            <th scope="row">{(key === datestamp()) ? 'Today' : key}</th>
                            <td>{this.state.user.history.weight[key]} lbs</td>
                            <td><button type="button" className="btn btn-danger option-btn" onClick={() => this.removeWeight(key)}>Remove</button></td>
                          </tr>
                        </tbody>
                      );
                    }) : null
                  }
                </table>
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
                <p>Your height is set to: <b>{this.state.user.height} inches</b></p>
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="height" data-path="height" value={this.state.height} onChange={event => rjsBind.bind(this, event)()} placeholder="Inches" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width" onClick={this.updateHeight.bind(this)} disabled={!this.state.height}>Save Height</button></div>
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
                <p>This is how many calories you have left for the day. Your current daily intake limit is set to <b>{this.state.user.goals.calories}</b>.</p>
                <div className="row">
                  <div className="col-8"><input type="text" className="form-control" id="meal" data-path="meal-title" value={this.state.meal.title} onChange={event => rjsBind.bind(this, event)()} placeholder="Meal" /></div>
                  <div className="col-4"><input type="number" className="form-control" id="meal-calories" data-path="meal-calories" value={this.state.meal.calories} onChange={event => rjsBind.bind(this, event)()} placeholder="Calories" /></div>
                  <div className="col-12"><br /><button type="button" className="btn btn-dark full-width" disabled={!this.state.meal.title || !this.state.meal.calories} onClick={this.addMeal.bind(this)}>ADD MEAL</button></div>
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
                  {
                    (this.state.user.history.meals && this.state.user.history.meals[datestamp()]) ?
                      Object.keys(this.state.user.history.meals[datestamp()]).reverse().map(key => {
                        const meal = this.state.user.history.meals[datestamp()][key];
                        return (
                          <tbody key={key}>
                            <tr>
                              <th scope="row">{meal.title}</th>
                              <td>{meal.calories}</td>
                              <td><button type="button" className="btn btn-danger option-btn" onClick={() => this.removeMeal(key)}>Remove</button></td>
                            </tr>
                          </tbody>
                        )
                      })
                    : (
                      <tbody>
                        <tr>
                          <th scope="row" colSpan="3">
                            <center>You haven't eaten anything today!</center>
                          </th>
                        </tr>
                      </tbody>
                    )
                  }
                </table>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">DAILY INTAKE LIMIT</h5>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="calories-goal" data-path="calories-limit" value={this.state.calories.limit} onChange={event => rjsBind.bind(this, event)()} placeholder="Calories" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width" disabled={!this.state.calories.limit} onClick={this.setCaloriesLimit.bind(this)}>SET LIMIT</button></div>
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
                  <div className="col-8"><input type="text" className="form-control" id="burned-workout"  data-path="burned-title" value={this.state.burned.title} onChange={event => rjsBind.bind(this, event)()} placeholder="Workout" /></div>
                  <div className="col-4"><input type="number" className="form-control" id="burned-calories" data-path="burned-calories" value={this.state.burned.calories} onChange={event => rjsBind.bind(this, event)()} placeholder="Calories" /></div>
                  <div className="col-12"><br /><button type="button" className="btn btn-dark full-width" disabled={!this.state.burned.calories || !this.state.burned.title} onClick={this.addBurned.bind(this)}>ADD WORKOUT</button></div>
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
                  {
                    (this.state.user.history.workouts && this.state.user.history.workouts[datestamp()]) ?
                      Object.keys(this.state.user.history.workouts[datestamp()]).reverse().map(key => {
                        const workout = this.state.user.history.workouts[datestamp()][key];
                        return (
                          <tr key={key}>
                            <th scope="row">{workout.title}</th>
                            <td>{workout.calories}</td>
                            <td><button type="button" className="btn btn-danger option-btn" onClick={() => this.removeBurned.bind(this)(key)}>Remove</button></td>
                          </tr>
                        )
                      })
                    : (
                      <tr>
                        <th scope="row" colSpan="3">
                          <center>You haven't worked out today!</center>
                        </th>
                      </tr>
                    )
                  }
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
                <p>This is how much water you've consumed today. You're current daily water consumtion goal is <b>{(this.state.user.goals.water) ? this.state.user.goals.water : 8}</b> ounce(s).</p>
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="water-drink" data-path="water-drink" value={this.state.water.drink} onChange={event => rjsBind.bind(this, event)()} placeholder="Ounce(s)" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width" disabled={!this.state.water.drink} onClick={this.addWater.bind(this)}>ADD DRINK</button></div>
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
                    {
                      (this.state.user.history.water && this.state.user.history.water[datestamp()]) ?
                        Object.keys(this.state.user.history.water[datestamp()]).reverse().map(time => {
                          const drink = this.state.user.history.water[datestamp()][time];
                          let timestamp = time.split(':');
                          const hours = Number(timestamp[0]);
                          const minutes = Number(timestamp[1]);
                          timestamp = '';
                          if (hours > 0 && hours <= 12) timestamp = '' + hours;
                          else if (hours > 12) timestamp = '' + (hours - 12);
                          else if (hours === 0) timestamp = '';
                          timestamp += (minutes < 10) ? ':0' + minutes : ':' + minutes;
                          timestamp += (hours >= 12) ? ' PM' : ' AM'
                          return (
                            <tr key={time}>
                              <th scope="row">{drink}</th>
                              <td>{timestamp}</td>
                              <td><button type="button" className="btn btn-danger option-btn" onClick={() => this.removeDrink(time)}>Remove</button></td>
                            </tr>
                          )
                        })
                      : (
                        <tr>
                          <th scope="row" colSpan="3">
                            <center>You haven't worked out today!</center>
                          </th>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="tasks-modal">DAILY GOAL</h5>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6"><input type="number" className="form-control" id="water-goal" data-path="water-goal" value={this.state.water.goal || ''} onChange={event => rjsBind.bind(this, event)()} placeholder="Ounce(s)" /></div>
                  <div className="col-6"><button type="button" className="btn btn-dark full-width" onClick={this.setWaterGoal.bind(this)} disabled={!this.state.water.goal}>SET GOAL</button></div>
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
              <button type="button" className="btn btn-dark animated flipInX delay-1" data-toggle="modal" data-target="#weight-modal">{ this.state.user.weight }</button>
            </div><div className="col-4 stat-container">
              <label className="animated fadeInDown delay-1">BMI</label>
              <button type="button" className="btn btn-success animated flipInX delay-1" data-toggle="modal" data-target="#bmi-modal">
              { 
                (this.state.user.weight && this.state.user.height) ? 
                Math.round((this.state.user.weight * 703) / (this.state.user.height * this.state.user.height)) :
                'ERROR'
              }
              </button>
            </div>
            <div className="stat-spacer col-12"></div>
            <div className="col-4 stat-container">
              <label className="animated fadeInDown delay-2">CALORIES</label>
              { 
                (this.state.user.goals.calories && this.state.user.history.meals && this.state.user.history.meals[datestamp()]) ?
                function() {
                  let sum = 0;
                  const meals = this.state.user.history.meals[datestamp()];
                  Object.keys(meals).map(key => {
                    let calories = parseInt(meals[key].calories);
                    sum += calories;
                    return null;
                  });
                  sum = this.state.user.goals.calories - sum;
                  if (sum <= (user.goals.calories * .40)) return (<button type="button" className="btn btn-danger animated flipInX delay-2" data-toggle="modal" data-target="#calories-modal">{sum}</button>);
                  else return (<button type="button" className="btn btn-success animated flipInX delay-2" data-toggle="modal" data-target="#calories-modal">{sum}</button>);
                }.bind(this)() :
                <button type="button" className="btn btn-success animated flipInX delay-2" data-toggle="modal" data-target="#calories-modal">{this.state.user.goals.calories}</button>
              }
            </div><div className="col-4 stat-container">
              <label className="animated fadeInDown delay-2">BURNED</label>
              <button type="button" className="btn btn-dark animated flipInX delay-2" data-toggle="modal" data-target="#burned-modal">
                { 
                  (this.state.user.history.workouts && this.state.user.history.workouts[datestamp()]) ? 
                  function() {
                    const workouts = this.state.user.history.workouts[datestamp()];
                    let sum = 0;
                    Object.keys(workouts).map(key => {
                      let calories = parseInt(workouts[key].calories);
                      sum += calories;
                      return null;
                    });
                    return sum;
                  }.bind(this)() : 
                  0 
                }
              </button>
            </div><div className="col-4 stat-container">
              <label className="animated fadeInDown delay-2">WATER</label>
              {
                (this.state.user.history.water && this.state.user.history.water[datestamp()]) ? 
                function () {
                  if (!this.state.user.goals.water) this.setState({ user: { goals: { water: 8 }}});
                  const drinks = this.state.user.history.water[datestamp()];
                  const goal = this.state.user.goals.water;
                  let sum = 0;
                  Object.keys(drinks).map(key => {
                    sum += parseInt(drinks[key]);
                    return null;
                  });
                  if (sum <= (goal * .5)) {
                    return <button type="button" className="btn btn-danger animated flipInX delay-2" data-toggle="modal" data-target="#water-modal">{sum}</button>
                  } else {
                    return <button type="button" className="btn btn-success animated flipInX delay-2" data-toggle="modal" data-target="#water-modal">{sum}</button>
                  }
                }.bind(this)() :
                <button type="button" className="btn btn-danger animated flipInX delay-2" data-toggle="modal" data-target="#water-modal">0</button> 
              }
            </div><div className="col-12">
              <span className="section-footer">Update your info by <b>clicking</b> the button...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
