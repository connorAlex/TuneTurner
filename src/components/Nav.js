import React from "react";
import "../styles/Nav.css";
import Checkout from "./Checkout";

const Nav = ({ name, queryData }) => {
  return (
    <div className="Nav">
      <div> Welcome, {name}. </div>
      <Checkout queryData={queryData} />
    </div>
  );
};

export default Nav;
