import React from "react";
import { NavLink} from "react-router-dom"
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">Google Books</a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ml-2 mr-3">
            <NavLink strict to="/search" className="normal"
            exact={true} activeClassName='active'>Search</NavLink>
          </li>
          <li className="nav-item">
            <NavLink strict to="/saved" className="normal"
            activeClassName='active'>Saved</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
