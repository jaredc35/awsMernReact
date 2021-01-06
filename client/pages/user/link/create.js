import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { API } from "../../../config";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";

const Create = () => {
  const [state, setState] = useState({
    title: "",
    url: "",
    categories: [],
    loadedCategories: [],
    success: "",
    error: "",
    type: "",
    medium: ""
  });

  const {
    title,
    url,
    categories,
    loadedCategories,
    success,
    error,
    type,
    medium
  } = state;

  useEffect(() => {
    loadCategories();
  }, [success]);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/category`);
    setState({ ...state, loadedCategories: response.data });
  };

  const handleSubmit = async () => {
    // Post to server
  };

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      error: "",
      success: ""
    });
  };

  const handleToggle = c => () => {
    // return the first index or -1
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];
    if (clickedCategory === -1) {
      all.push(c); // add it to the categories
    } else {
      all.splice(clickedCategory, 1); // Removes the clicked category
    }
    setState({ ...state, categories: all, success: "", error: "" });
  };

  // Show category checkbox
  const showCategories = () => {
    return (
      loadedCategories &&
      loadedCategories.map((c, i) => (
        <li className="list-unstyled" key={c._id}>
          <input
            type="checkbox"
            onChange={handleToggle(c._id)}
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const submitLinkForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          className="form-control"
          type="text"
          name="title"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">URL</label>
        <input
          className="form-control"
          type="url"
          name="url"
          onChange={handleChange}
          value={url}
        />
      </div>
      <div className="form-group">
        <btn className="btn btn-outline-primary py-1" type="submit">
          Submit
        </btn>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1>Submit Link/URL</h1>
          <br />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label className="text-muted ml-4">Category</label>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
        </div>
        <div className="col-md-8">{submitLinkForm()}</div>
        {JSON.stringify(categories)}
        {JSON.stringify(url)}
      </div>
    </Layout>
  );
};

export default Create;
