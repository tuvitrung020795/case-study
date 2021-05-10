import React from "react";
import { Route, Switch } from "react-router";
import PageOne from "../pages/page-one";
import PageTwo from "../pages/page-two";

export default function RouterSwitch() {
  return (
    <Switch>
      <Route exact path="/">
        <PageOne />
      </Route>
      <Route path="/2">
        <PageTwo />
      </Route>
    </Switch>
  );
}
