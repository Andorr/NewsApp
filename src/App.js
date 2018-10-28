import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {base} from './theme';
import URLS from './URLS';

// Project Components
import Landing from './containers/Landing';
import Detail from './containers/Detail';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
          <MuiThemeProvider theme={base}>
            <Switch>
              <Route exact path={URLS.landing} component={Landing} />
              <Route exact path={URLS.detail.concat('/:id')} component={Detail} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App;
