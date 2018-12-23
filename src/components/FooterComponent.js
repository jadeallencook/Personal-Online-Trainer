import React, { Component } from 'react';
import './FooterComponent.css';

class FooterComponent extends Component {
  render() {
    return (
        <div className="col-12 footer animated fadeInUp">
          <b>Online Fitness Trainer</b> Copyright 2019<br />
          Developed by <b>Onflo</b> & <b>GetRoFit</b>
        </div>
    );
  }
}

export default FooterComponent;
