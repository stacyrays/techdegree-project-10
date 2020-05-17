import React from "react";
import { Redirect } from "react-router-dom";

export default ({ context }) => {
  try {
    setTimeout(() => {
      context.actions.signOut();
    }, 1000);
  } catch (error) {
    this.props.history.push("/error");
  }

  return <Redirect to="/" />;
};
