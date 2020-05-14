import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Courses extends Component {
  state = {
    courses: [],
  };
  componentDidMount() {
    const { context } = this.props;
    console.log(context);
    context.data
      .getCourses()
      .then((res) => this.setState({ courses: res }))
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  }
  render() {
    const courses = this.state.courses.map((course) => {
      return (
        <div key={course.id} className="grid-33">
          <Link
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      );
    });
    return (
      <div className="bounds">
        {courses}
        <div className="grid-33">
          <a className="course--module course--add--module" href="/create">
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </a>
        </div>
      </div>
    );
  }
}

//export default Courses;
