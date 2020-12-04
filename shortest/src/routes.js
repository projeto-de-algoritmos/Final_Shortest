import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function Routes() {
  return (
    <Switch>
      <Route path="/Final_Shortest/" exact component={Home} />
    </Switch>
  );
}
