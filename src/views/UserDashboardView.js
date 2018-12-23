import React, { Component } from 'react';
import './UserDashboardView.css';
import ProfileComponent from '../components/ProfileComponent';
var zipcodes = require('zipcodes');

class UserDashboardView extends Component {
  render() {
    return (
      <div className="UserDashboardView">

        <ProfileComponent></ProfileComponent>
        
        <div className="container animated flipInX full-width-placement" style={{
          backgroundImage: 'url(http://www.muscleandstrength.com/store/media/products/products/c/c4banner1.jpg)'
        }}></div>

        <div className="container animated fadeIn">
          <div className="row stat-wrapper">
            <div className="col-12">
              <h2 className="section-title animated slideInDown">TODAY'S WORKOUTS</h2>
            </div>
            <div className="col-12 animated flipInX delay-2 todo-list-item-wrapper">
              <div className="alert alert-secondary todo-list-item" role="alert">
                100 Pushups
                <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModal">COMPLETE</button>
              </div>
            </div>
            <div className="col-12 animated flipInX delay-2 todo-list-item-wrapper">
              <div className="alert alert-success todo-list-item" role="alert">
                Run 1 Mile
                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal">UNDO</button>
              </div>
            </div>
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
