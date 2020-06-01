// Grabs id dynamically
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import Layout from "../../../components/Layout";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import { API } from "../../../config";

import { withRouter } from "next/router";

const ActivateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: ""
  });
  const { name, token, buttonText, success, error } = state;

  useEffect(() => {
    let token = router.query.id; // Gets id
    if (token) {
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, [router]);

  const clickSubmit = async e => {
    e.preventDefault();
    setState({ ...state, buttonText: "Activating" });
    try {
      const response = await axios.post(`${API}/register/activate`, { token });
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Activated",
        success: response.data.message
      });
    } catch (err) {
      setState({
        ...state,
        buttonText: "Activate Account",
        error: err.response.data.error
      });
    }
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Hello {name}, Ready to activate your account?</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <button
            onClick={clickSubmit}
            className="btn btn-outline-dark btn-block"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);
