// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import SearchPage from './containers/SearchPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchPage} />
  </Route>
);
