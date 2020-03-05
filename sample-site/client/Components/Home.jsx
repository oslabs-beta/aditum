import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav.jsx'
import About from './About.jsx';
import Store from './Store.jsx';
import AccessBarWithRouter from './AccessBarWithRouter.jsx';
import MainContainer from './MainContainer.jsx';
import wrapper from './Wrapper.jsx'

class Home extends Component {

  render() {
    return (
      <div>
        <Router >
        <AccessBarWithRouter />
          <Nav />
          <Switch >
            <Route exact path="/" component={ MainContainer }/>
            <Route exact path="/about" component={ wrapper(About) }/>
            <Route exact path ='/store' component={ wrapper(Store) }/>
          </Switch>
        </Router>
        </div>
    );
  }
}

export default Home;