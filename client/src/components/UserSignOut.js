import React from "react";
import { Redirect } from "react-router-dom";

export default ({ context }) => {
  try {
    context.actions.signOut();
  } catch (error) {
    //Catch any errors
    this.props.history.push("/error");
  }
  //Go to Courses main page when done
  return <Redirect to="/" />;
};
