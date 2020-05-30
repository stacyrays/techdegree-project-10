import config from "./config";

export default class Data {
  //! first method
  //* API endpoint = 'path'
  api(
    path,
    method = "GET",
    body = null,
    requireAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    //! if body is provided, sends "method", "headers" and "stringified body".
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    // Check if authentication is required
    if (requireAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      // push authentication to header
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const res = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (res.status === 200) {
      return res.json().then((data) => {
        return data;
      });
    } else if (res.status === 400 || res.status === 401) {
      return res.json().then((data) => {
        console.log(
          `[GET][Data][getUser] ${res.status} - Errors: `,
          data.errors
        );
        return data.errors;
      });
    } else {
      throw new Error("[GET][Data][getUser] Unknown Error");
    }
  }
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  async getCourses() {
    const response = await this.api("/courses", "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      //console.log("RESPONSE IS NULL ");
      return null;
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 404) {
      throw new Error();
    } else {
      throw new Error();
    }
  }

  async createCourse(course, emailAddress, password) {
    const response = await this.api(`/courses`, "POST", course, true, {
      emailAddress,
      password,
    });
    //console.log("create course is triggered");
    if (response.status === 201) {
      return null;
    } else if (response.status === 400) {
      return response.json().then((data) => {
        console.log("POST on createCourse 400 response");
        return data.errors;
      });
    } else {
      throw new Error("Error not specified");
    }
  }

  async updateCourse(course, emailAddress, password) {
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      {
        emailAddress,
        password,
      }
    );
    if (response.status === 204) {
      return null;
    } else if (response.status === 403) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteCourse(course, emailAddress, password) {
    const response = await this.api(
      `/courses/${course.id}`,
      "DELETE",
      course,
      true,
      {
        emailAddress,
        password,
      }
    );
    if (response.status === 204) {
      return null;
    } else if (response.status === 403) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
