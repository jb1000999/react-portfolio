import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationContainer from './navigation-container/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from './portfolio/portfolio-detail';
import Auth from './pages/auth';
import NoMatch from './pages/no-match';

export default class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind (this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind (this);
  }

  handleSuccessfulLogin () {
    this.setState ({
      loggedInStatus: 'LOGGED_IN',
    });
  }

  handleUnSuccessfulLogin () {
    this.setState ({
      loggedInStatus: 'NOT_LOGGED_IN',
    });
  }

  checkLoginStatus () {
    return axios
      .get ('https://api.devcamp.space/logged_in', {
        withCredentials: true,
      })
      .then (response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        // If loggedIn and status LOGGED_IN => return data
        // If loggedIn status NOT_LOGGED_IN => update state
        // If not loggedIn and LOGGED_IN => update state

        if (loggedIn && loggedInStatus === 'LOGGED_IN') {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState ({
            loggedInStatus: 'LOGGED_IN',
          });
        } else if (!loggedIn && loggedInStatus === 'LOGGED_IN') {
          this.setState ({
            loggedInStatus: 'NOT_LOGGED_IN',
          });
        }
      })
      .catch (error => {
        console.log ('Error', error);
      });
  }

  componentDidMount () {
    this.checkLoginStatus ();
  }

  authorizedPages () {
    return [<Route path="/blog" component={Blog} />];
  }

  render () {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer loggedInStatus={this.state.loggedInStatus} />

            <h2>{this.state.loggedInStatus}</h2>

            <Switch>
              <Route exact path="/" component={Home} />

              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />

              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              {this.state.loggedInStatus === 'LOGGED_IN'
                ? this.authorizedPages ()
                : null}
              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
