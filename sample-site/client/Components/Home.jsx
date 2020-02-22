import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav.jsx'
import About from './About.jsx';
import Store from './Store.jsx';
import AccessBar from './AccessBar.jsx';
import MainContainer from './MainContainer.jsx';
// import Review from './Review.jsx'
import wrapper from './Wrapper.jsx'


class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showAccessBar: false,
  //   }
  //   this.handleKeydown = this.handleKeydown.bind(this);
  // }

  // handleKeydown(event) {
  //   if (event.key === 'Tab') {
  //     if (this.state.showAccessBar === false) {
  //       this.setState({ showAccessBar: true })
  //     }
  //     if (this.state.showAccessBar === true) {
  //       this.setState({ showAccessBar: false })
  //     }
  //   }
    
  // }
  render() {
    // const showAccessBar = this.state.showAccessBar;
    // let accessBar = null;

    const config = {
      'sidebar': 'sidebar',
      'main content': 'main-content',
      'photo sidebar': 'photo-sb',
      'footer': 'footer'
    }

    // still need to set focus to dropdown when accessBar is true
    // set focus to navbar when accessBar is false
    // if (showAccessBar) {
    //   accessBar = <AccessBar config={config} onClick={ this.handleKeydown }/>;
    // } else {
    //   accessBar = null;
    // }

    return (
      <div onKeyDown={ this.handleKeydown }>
        <Router>
        <AccessBar config={config}/>
          <Nav />
          <Switch >
            <Route exact path="/" component={MainContainer}/>
            <Route exact path="/about" component={wrapper(About)}/>
            <Route exact path ='/store' component={wrapper(Store)}/>
          </Switch>
          {/* 
          <Route exact path ='/review' component={Review}/> */}
        </Router>
        </div>
    );
  }
}

export default Home;