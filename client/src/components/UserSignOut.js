import React from "react";
import { Redirect } from "react-router-dom";

export default ({ context }) => {
  try {
    //Wait out a second before signing out
    setTimeout(() => {
      context.actions.signOut();
    }, 1000);
  } catch (error) {
    //Catch all errors
    this.props.history.push("/error");
  }
  //Go to Courses main page when done
  return <Redirect to="/" />;
};
