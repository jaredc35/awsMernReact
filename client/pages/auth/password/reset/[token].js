import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  showSuccessMessage,
  showErrorMessage
} from "../../../../helpers/alerts";
import { API } from "../../../../config";
import Router, { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import Layout from "../../../../components/Layout";

const ResetPassword = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
    success: "",
    error: ""
  });
  const { name, token, newPassword, buttonText, success, error } = state;

  useEffect(() => {
    const decoded = jwt.decode(router.query.token); // comes from name of page
    if (decoded) {
      setState({ ...state, name: decoded.name, token: router.query.token });
    }
  }, [router]);

  const handleChange = e => {
    setState({
      ...state,
      newPassword: e.target.value,
      success: "",
      error: "",
      buttonText: "Reset Password"
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({ ...state, buttonText: "Sending" });
    try {
      const response = await axios.put(`${API}/reset-password`, {
        resetPasswordLink: token,
        newPassword
      });
      setState({
        ...state,
        newPassword: "",
        buttonText: "Done",
        success: response.data.message
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Reset Password",
        error: error.response.data.error
      });
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1> Hi {name}, ready to reset your password?</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                value={newPassword}
                placeholder="Type New Password"
                required
              />
            </div>
            <div>
              <button className="btn btn-outline-primary">{buttonText}</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);
