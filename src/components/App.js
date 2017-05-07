import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../containers/Home'
import Sub from '../containers/Sub'
import Lost from '../components/Lost'
import { store } from '../state';
import './index.css';


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/404" component={Lost}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/*" component={Sub}></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
