import React, { Component } from "react";
import { Link } from "react-router-dom";

class Courses extends Component {
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
    return <div className="bounds">{courses}</div>;
  }
}

export default Courses;
