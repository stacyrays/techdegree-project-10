import React, { Component } from "react";
import Form from "./Form";

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  render() {
    //Create variables to collect from form and give them to state
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li className="firstNameDOM">Must provide a first name.</li>
                <li className="lastNameDOM">Must provide a last name.</li>
                <li className="emailAddressDOM">
                  Must provide an email address.
                </li>
                <li className="passwordDOM">Must provide a password.</li>
              </ul>
            </div>
          </div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
                <span id="passwordMatch">Passwords not match, try again</span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password"
                />
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
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
    const { context } = this.props;

    //Create variables from state
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    //Create variables for HTML elements that display errors
    const errorHeader = document.getElementsByClassName(
      "validation--errors--label"
    )[0];
    const errorsContainer = document.getElementsByClassName(
      "validation-errors"
    )[0];
    const errorList = errorsContainer.getElementsByTagName("UL")[0];
    const firstNameDOM = document.getElementsByClassName("firstNameDOM")[0];
    const lastNameDOM = document.getElementsByClassName("lastNameDOM")[0];
    const emailAddressDOM = document.getElementsByClassName(
      "emailAddressDOM"
    )[0];

    const passwordDOM = document.getElementsByClassName("passwordDOM")[0];

    errorHeader.setAttribute("style", "display:none");
    errorList.setAttribute("style", "display:none");
    firstNameDOM.setAttribute("style", "display:none");
    lastNameDOM.setAttribute("style", "display:none");
    emailAddressDOM.setAttribute("style", "display:none");
    passwordDOM.setAttribute("style", "display:none");

    if (firstName === "") {
      console.log("provide a first name");
      errorList.setAttribute("style", "display:block");
      firstNameDOM.setAttribute("style", "display:block");
    }
    if (lastName === "") {
      console.log("provide a last name");
      errorList.setAttribute("style", "display:block");
      lastNameDOM.setAttribute("style", "display:block");
    }
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

    if (
      firstName === "" ||
      lastName === "" ||
      emailAddress === "" ||
      password === ""
    ) {
      //this.props.history.push("/error");
      return null;
    } else {
      if (password === confirmPassword) {
        // Create user
        const user = {
          firstName,
          lastName,
          emailAddress,
          password,
        };

        context.data
          .createUser(user)
          .then((errors) => {
            if (errors.length) {
              this.setState({ errors });
            } else {
              context.actions.signIn(emailAddress, password).then(() => {
                this.props.history.push("/authenticated");
              });
            }
          })
          .catch((err) => {
            //catch all error
            this.props.history.push("/error");
          });
      } else {
        const passwordMatch = document.getElementById("passwordMatch");
        passwordMatch.setAttribute("style", "display:block");
        console.log("do not match try again");
      }
    }
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
