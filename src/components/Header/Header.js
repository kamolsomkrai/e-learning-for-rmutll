import React, { Component } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <nav class="stroke">
    <ul>
      <li><Link className="link" to="/">หน้าหลัก</Link></li>
      <li><Link className="link" to="/Mainpage">แหล่งความรู้</Link></li>
      <li><Link className="link" to="/image">ประมวลผลกิจกรรม</Link></li>
    </ul>
  </nav>
        {/* <div>
          <Link className="link" to="/">
            <span className="navtext">หน้าหลัก</span>
          </Link>
        </div>
        |
        <div>
          <Link className="link" to="/Mainpage">
            <span className="navtext">แหล่งความรู้</span>
          </Link>
        </div>
        |
        <div>
          <Link className="link" to="/image">
            <span className="navtext">ประมวลผลกิจกรรม</span>
          </Link>
        </div> */}

      </div>
    );
  }
}
