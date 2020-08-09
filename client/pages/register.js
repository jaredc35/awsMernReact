import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import Layout from "../components/Layout";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";
import { isAuth } from "../helpers/auth";

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

  useEffect(() => {
    isAuth() && Router.push("/");
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setState({ ...state, buttonText: "Registering" });
    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password
      });
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        buttonText: "Submitted",
        success: response.data.message
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Register",
        error: error.response.data.error
      });
    }
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
          required
        ></input>
      </div>
      <div className="form-group">
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Email"
          required
        ></input>
      </div>
      <div className="form-group">
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Password"
          required
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
      <div className="col-md-8 offset-md-2">
        <h1>Register</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <br />
        {registerForm()}
      </div>
    </Layout>
  );
};

export default Register;
