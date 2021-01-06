import React, { Fragment } from "react";
import Link from "next/link";
import { isAuth, logout } from "../helpers/auth";

const Navbar = () => {
  return (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link href="/">
          <a className="text-light nav-link">Home</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/user/link/create">
          <a className="text-light nav-link btn btn-success">Submit a Link</a>
        </Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link href="/login">
              <a className="text-light nav-link">Login</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/register">
              <a className="text-light nav-link">Register</a>
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <li className="nav-item ml-auto">
          <Link href="/admin">
            <a className="text-light nav-link">{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item ml-auto">
          <Link href="/user">
            <a className="text-light nav-link">{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <a onClick={logout} className="text-light nav-link">
            Logout
          </a>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
