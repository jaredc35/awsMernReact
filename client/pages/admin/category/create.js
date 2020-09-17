import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // server-side rendering is false
import "react-quill/dist/quill.bubble.css";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import Layout from "../../../components/Layout";
import Resizer from "react-image-file-resizer";
import withAdmin from "../../withAdmin";

const Create = ({ token }) => {
  const [state, setState] = useState({
    name: "",
    image: "",
    error: "",
    success: "",
    buttonText: "Create"
  });
  const [content, setContent] = useState();

  const [imageUploadButton, setImageUploadButton] = useState("Upload Image");

  const { name, error, success, image, buttonText } = state;

  const handleChange = name => e => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Create"
    });
  };

  const handleContent = e => {
    setContent(e);
    setState({ ...state, success: "", error: "" });
  };

  const handleImage = event => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    setImageUploadButton(event.target.files[0].name);
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        uri => {
          // console.log(uri);
          setState({
            ...state,
            image: uri,
            success: "",
            error: ""
          });
        },
        "base64"
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.table({ name, content, image });
    setState({ ...state, buttonText: "Creating" });
    try {
      const response = await axios.post(
        `${API}/category`,
        { name, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Category create response: ", response);
      setState({
        ...state,
        name: "",
        content: "",
        formData: process.Browser && new formData(),
        buttonText: "Created",
        success: `${response.data.name} uploaded successfully!`
      });
      setImageUploadButton("Upload Image");
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Create",
        error: error.response.data.error
      });
    }
  };

  const createCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Content</label>
        <ReactQuill
          className="pb-5 mb-3"
          style={{ border: "1px solid #666" }}
          onChange={handleContent}
          theme="bubble"
          value={content}
          placeholder="Write something..."
        />
      </div>
      <div className="form-group">
        <label className="btn btn-outline-secondary">
          {imageUploadButton}
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImage}
            required
            hidden
          />
        </label>
      </div>
      <div>
        <button className="btn btn-outline-primary">{buttonText}</button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Create category</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {createCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default withAdmin(Create);
