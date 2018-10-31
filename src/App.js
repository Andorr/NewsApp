import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {base} from './theme';
import URLS from './URLS';

// Project Components
import Landing from './containers/Landing';
import Detail from './containers/Detail';
import LogIn from './containers/LogIn';
import Upload from './containers/Upload';
import Profile from './containers/Profile';

// Service imports
import AuthService from './store/services/AuthService';

// The user needs to have completed the necassary register intro to access these routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthorized() ? (
          <Component {...props} />
        ) : (
          <Redirect to={URLS.login} />
        )
      }
    />
  );
};

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
          <MuiThemeProvider theme={base}>
            <Switch>
              <Route exact path={URLS.landing} component={Landing} />
              <Route exact path={URLS.detail.concat('/:id')} component={Detail} />
              <Route exact path={URLS.login} component={LogIn} />
              <PrivateRoute exact path={URLS.upload} component={Upload} />
              <PrivateRoute exact path={URLS.profile} component={Profile} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App;
