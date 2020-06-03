import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    console.log(authUser);
    console.log(`The email is ${authUser.emailAddress}`);
    console.log(`The password is ${authUser.password}`);

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li className="provide-title"></li>
                <li className="provide-desc"></li>
              </ul>
            </div>
          </div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={this.change}
                      placeholder="Title"
                      className="input-title course--title--input"
                    />
                    <p>
                      Author: {authUser.firstName} {authUser.lastName}
                    </p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.change}
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={estimatedTime}
                            onChange={this.change}
                            placeholder="Estimated Time"
                            className="course--time--input"
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>{" "}
                        <div>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            type="text"
                            value={materialsNeeded}
                            onChange={this.change}
                            placeholder="Materials Needed"
                            className="course--materials--input"
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
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
    const authUser = context.authenticatedUser;
    const { emailAddress, password } = authUser;

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    const { from } = this.props.location.state || {
      from: { pathname: "/" },
    };
    const errorHeader = document.getElementsByClassName(
      "validation--errors--label"
    )[0];
    const errors = document.getElementsByClassName("validation-errors")[0];
    const errorList = errors.getElementsByTagName("UL")[0];
    const errorTitle = document.getElementsByClassName("provide-title")[0];
    const errorDesc = document.getElementsByClassName("provide-desc")[0];

    context.data
      .createCourse(course, emailAddress, password)
      .then((response) => {
        if (response !== null) {
          this.setState({ errors: response });
          if (title.length === 0) {
            errorHeader.setAttribute("style", "display:block");
            errorList.setAttribute("style", "display:block");
            errorTitle.innerHTML = this.state.errors[0];
            errorTitle.setAttribute("style", "display:block");
          } else if (title.length > 0) {
            errorHeader.setAttribute("style", "display:none");
            errorList.setAttribute("style", "display:none");
            errorTitle.setAttribute("style", "display:none");
          }
          if (description.length === 0) {
            errorHeader.setAttribute("style", "display:block");
            errorList.setAttribute("style", "display:block");
            errorDesc.innerHTML = this.state.errors[1];
            errorDesc.setAttribute("style", "display:block");
          } else if (description.length > 0) {
            errorHeader.setAttribute("style", "display:none");
            errorList.setAttribute("style", "display:none");
            errorDesc.setAttribute("style", "display:none");
          }
        } else {
          console.log(`The course ${title} is created`);
          this.props.history.push(from);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
