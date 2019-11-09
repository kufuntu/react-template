import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Hello from './components/hello/Hello';
import Test from './components/test/Test';

export const Router = () => (
  <Switch>
    <Route path="/test">
      <Test />
    </Route>
    <Route path="/">
      <Hello />
    </Route>
  </Switch>
);
