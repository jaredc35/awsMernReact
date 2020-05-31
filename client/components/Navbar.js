import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link href="/">
          <a className="text-light nav-link">Home</a>
        </Link>
      </li>
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
    </ul>
  );
};

export default Navbar;
