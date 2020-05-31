import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Head from "./Head";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Head />
      <Navbar />
      <div className="container pt-5 pb-5">{children}</div>
    </Fragment>
  );
};

export default Layout;
