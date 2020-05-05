import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import withContext from "./Context";

import Header from "./components/Header";
import Courses from "./components/Courses";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        {/* <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} /> */}
      </Switch>
    </div>
  </Router>
);
