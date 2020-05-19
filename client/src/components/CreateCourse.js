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
    const authUser = context.authenticatedUser[0];
    const { emailAddress, password } = authUser;

    console.log(context.authenticatedUser[0]);
    console.log(`The authUser is ${emailAddress}`);
    console.log(`The authUser is ${password}`);

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
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
                  <p>By Joe Smith</p>
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
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

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
    const authUser = context.authenticatedUser[0];
    const { emailAddress, password } = authUser;
    console.log(authUser);

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    } = this.state;

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
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
