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
    const { owner, errors } = this.state;
    const { firstName, id } = owner;

    console.log("This is owner variable firstname of state " + firstName);

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    console.log(authUser.id + " " + id);

    return (
      <React.Fragment>
        {/*If Auth user id matches ownder id then display the delete button */}
        {authUser.id === id ? (
          <div className="bounds course--detail">
            <h1>Delete Course</h1>
            <p>Are you sure you want to delete?</p>
            <div>
              <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Delete Course"
                elements={() => <React.Fragment></React.Fragment>}
              />
            </div>
          </div>
        ) : (
          <span> You are not the owner so you can't make an update</span>
          //<Redirect to="/" /> //***THIS WON'T WORK FOR SOME REASON
        )}
      </React.Fragment>
    );
  }

  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { emailAddress, password } = authUser;

    const { title, description, estimatedTime, materialsNeeded } = this;

    // Course gets state data
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id: this.state.course.id,
    };

    context.data
      .deleteCourse(course, emailAddress, password)
      .then((response) => {
        if (response !== null) {
          //If response has something in it, push the error into state
          this.setState({ errors: response });
        } else {
          //Go to courses main page
          this.props.history.push(`/`);
        }
      })
      .catch((err) => {
        //Error catch all
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push(`/courses/${this.state.course.id}`);
  };
}
