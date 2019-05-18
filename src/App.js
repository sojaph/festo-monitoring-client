import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/navigation';
import TacticalDashboard from './components/tactical';
import Home from './components/home';
import CanvasJSReact from './canvasjs.react';
import './App.css';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
  render() {
    return (
        <Router>
          <div>
          <Navigation />
          <div className="App container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/tactical" component = {TacticalDashboard}/>
            </Switch>
          </div>
          </div>
        </Router>
    );
  }
}

export default App;

