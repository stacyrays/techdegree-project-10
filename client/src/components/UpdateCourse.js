import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  state = {
    course: {},
    owner: {},
    errors: [],
  };
  async componentDidMount() {
    try {
      const { context } = this.props;
      const course = await context.data.getCourse(this.props.match.params.id);
      const owner = course.owner;

      console.log("This is the course " + owner.firstName);

      if (course) {
        this.setState({ course, owner });
      } else {
        console.log("there is an error 404");
        this.props.history.push("/notfound");
      }
    } catch (err) {
      console.log("there is an error 404");
      this.props.history.push("/error");
    }
  }
  render() {
    const { course, owner, errors } = this.state;
    const { firstName, lastName, id } = owner;

    console.log("This is owner variable firstname of state " + firstName);

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    console.log(authUser.id + " " + id);

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
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
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      ref={(input) => (this.title = input)}
                      defaultValue={course.title}
                      className="input-title course--title--input"
                    />
                    <p>
                      Author: {firstName} {lastName}
                    </p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        ref={(input) => (this.description = input)}
                        defaultValue={course.description}
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
                            ref={(input) => (this.estimatedTime = input)}
                            defaultValue={course.estimatedTime}
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
                            ref={(input) => (this.materialsNeeded = input)}
                            defaultValue={course.materialsNeeded}
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

  submit = () => {
    //evt.preventDefault();
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { emailAddress, password } = authUser;
    //const { errors } = this.state;

    const { title, description, estimatedTime, materialsNeeded } = this;

    // Updatecourse
    const course = {
      title: title.value,
      description: description.value,
      estimatedTime: estimatedTime.value,
      materialsNeeded: materialsNeeded.value,
      id: this.state.course.id,
    };

    const errorHeader = document.getElementsByClassName(
      "validation--errors--label"
    )[0];
    const errors = document.getElementsByClassName("validation-errors")[0];
    const errorList = errors.getElementsByTagName("UL")[0];
    const errorTitle = document.getElementsByClassName("provide-title")[0];
    const errorDesc = document.getElementsByClassName("provide-desc")[0];

    context.data
      .updateCourse(course, emailAddress, password)
      .then((response) => {
        if (response !== null) {
          this.setState({ errors: response });
          console.log("These are the errors " + this.state.errors);
          if (!title.length) {
            errorHeader.setAttribute("style", "display:block");
            errorList.setAttribute("style", "display:block");
            errorTitle.innerHTML = this.state.errors[0];
            errorTitle.setAttribute("style", "display:block");
          } else if (title.length > 0) {
            errorHeader.setAttribute("style", "display:none");
            errorList.setAttribute("style", "display:none");
            errorTitle.setAttribute("style", "display:none");
          }
          if (!description.length) {
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
          this.props.history.push(`/courses/${this.state.course.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push(`/courses/${this.state.course.id}`);
  };
}
