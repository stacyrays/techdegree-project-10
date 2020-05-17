import React, { Component } from "react";
import { Link } from "react-router-dom";
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

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Create Course</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={this.change}
                  placeholder="Title"
                />
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={this.change}
                  placeholder="Description"
                />
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={this.change}
                  placeholder="Estimated Time"
                />
                <input
                  id="materialsNeeded"
                  name="materialsNeeded"
                  type="text"
                  value={materialsNeeded}
                  onChange={this.change}
                  placeholder="Materials Needed"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
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

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    context.data
      .createCourse(course, emailAddress, password)
      .then((response) => {
        if (response !== null) {
          this.setState({ errors: response });
          console.log("resonse is null");
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
