import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/navigation';
import TacticalDashboard from './components/tactical';
import Home from './components/home';

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

