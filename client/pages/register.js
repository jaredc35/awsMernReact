import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    buttonText: "Register",
    success: ""
  });

  const { name, email, password, error, buttonText, success } = state;

  const handleChange = name => e => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register"
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/register`, {
        name,
        email,
        password
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          value={name}
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          placeholder="Name"
        ></input>
      </div>
      <div className="form-group">
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Email"
        ></input>
      </div>
      <div className="form-group">
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Password"
        ></input>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-outline-primary">
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1>Register</h1>
        <br />
        {registerForm()}
        <hr />
        {JSON.stringify(state)}
      </div>
    </Layout>
  );
};

export default Register;
