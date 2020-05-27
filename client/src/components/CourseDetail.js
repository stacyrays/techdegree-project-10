import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CourseDetail extends Component {
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
      console.log("This is the course " + course.owner.firstName);
      //console.log(context.data.title);

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
    const { title, description, estimatedTime, materialsNeeded } = course;
    const { firstName, lastName, id } = owner;

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    console.log(authUser.id + " " + id);
    // authUser.id === id ? console.log("yes it is") : console.log("no it isn't");

    return (
      <React.Fragment>
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {authUser.id === id ? (
                  <span>
                    <Link
                      className="button"
                      to={`/courses/${course.id}/update`}
                    >
                      Update Course
                    </Link>
                    <Link
                      className="button"
                      to={`/courses/${course.id}/delete`}
                    >
                      Delete Course
                    </Link>
                  </span>
                ) : (
                  <span></span>
                )}

                <a className="button button-secondary" href="/">
                  Return to List
                </a>
              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>
                  By: {firstName} {lastName}
                </p>
              </div>
              <div className="course--description">
                <p>{description}</p>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      <li>{materialsNeeded}</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
