import React from "react";

export default ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>{authUser.firstName} you're authenticated!</h1>
        <p>Your username is {authUser.emailAddress}.</p>
        <a className="button button-primary" href="/">
          Go to Courses
        </a>
      </div>
    </div>
  );
};
