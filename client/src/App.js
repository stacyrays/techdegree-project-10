import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import Authenticated from "./components/Authenticated";
import UpdateCourse from "./components/UpdateCourse";
import DeleteCourse from "./components/DeleteCourse";

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <PrivateRoute
          exact
          path="/create"
          component={CreateCourseWithContext}
        />
        <PrivateRoute
          exact
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />
        <PrivateRoute
          exact
          path="/courses/:id/delete"
          component={DeleteCourseWithContext}
        />
        {/* <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} /> */}
      </Switch>
    </div>
  </Router>
);
