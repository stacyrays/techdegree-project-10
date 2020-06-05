import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    const { context } = this.props;
    const authUser = context.authenicateUser;
    //If there is not an auth user display the page and form
    if (!authUser) {
      return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li className="emailAddressDOM">Must provide a username.</li>
                  <li className="passwordDOM">Must provide a password.</li>
                </ul>
              </div>
            </div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign In"
              elements={() => (
                <React.Fragment>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    value={emailAddress}
                    onChange={this.change}
                    placeholder="User Name"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.change}
                    placeholder="Password"
                  />
                </React.Fragment>
              )}
            />
            <p>
              Don't have a user account? <Link to="/signup">Click here</Link> to
              sign up!
            </p>
          </div>
        </div>
      );
    } else {
      //If there is already an auth user, then redirect to courses main page
      return <Redirect to={"/"} />;
    }
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    //* sign-in this.props.context to "context"
    const { context } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/" },
    };
    const { emailAddress, password } = this.state;

    //Create variables for HTML elements that display errors
    const errorHeader = document.getElementsByClassName(
      "validation--errors--label"
    )[0];
    const errorsContainer = document.getElementsByClassName(
      "validation-errors"
    )[0];
    const errorList = errorsContainer.getElementsByTagName("UL")[0];

    const emailAddressDOM = document.getElementsByClassName(
      "emailAddressDOM"
    )[0];

    const passwordDOM = document.getElementsByClassName("passwordDOM")[0];

    errorHeader.setAttribute("style", "display:none");
    errorList.setAttribute("style", "display:none");
    emailAddressDOM.setAttribute("style", "display:none");
    passwordDOM.setAttribute("style", "display:none");

    if (emailAddress === "") {
      console.log("provide email address");
      errorList.setAttribute("style", "display:block");
      emailAddressDOM.setAttribute("style", "display:block");
    }
    if (password === "") {
      console.log("provide a password");
      errorList.setAttribute("style", "display:block");
      passwordDOM.setAttribute("style", "display:block");
    }

    if (emailAddress === "" || password === "") {
      return null;
    } else {
      context.actions
        .signIn(emailAddress, password)
        .then((user) => {
          if (user === null) {
            this.props.history.push("/signin");
            //Add the error to state
            this.setState(() => {
              return { errors: ["Sign-in was unsuccessful"] };
            });
          } else {
            //Go back to previous page after successful sign in
            this.props.history.push(from);
          }
        })
        .catch((error) => {
          //Catch all error
          this.props.history.push("/error");
        });
    }
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
