import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {base} from './theme';
import URLS from './URLS';
import store from './store/store';

// Action and Websocket import
import ws from './api/ws';
import * as NewsActions from './store/actions/NewsActions';

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

  componentDidMount() {
    // On news recieved from websocket...
    ws.onmessage = (event: Object) => {
      const data: Object = JSON.parse(event.data);
      console.log(data);

      // ...store it
      store.dispatch(NewsActions.setNewsItem(data));
    };

    // Send userId to websocket-server
    if(AuthService.isAuthorized()) {
      AuthService.fetchUserInfo();
    }
  }

  componentWillUnmount() {
    ws.close();
  }
  
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
