import React, { Component } from "react";
//import { Link } from "react-router-dom";

export default class CourseDetail extends Component {
  state = {
    course: {},
    //owner: {},
  };
  async componentDidMount() {
    try {
      const { context } = this.props;
      const course = await context.data.getCourse(this.props.match.params.id);

      if (course) {
        this.setState({ course });
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
    const { course } = this.state;
    const { title, description, estimatedTime, materialsNeeded } = course;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <a className="button" href="update-course.html">
                  Update Course
                </a>
                <a className="button" onClick={this.deleteCourse}>
                  Delete Course
                </a>
              </span>
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
              <p>By Joe Smith</p>
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
    );
  }
}
