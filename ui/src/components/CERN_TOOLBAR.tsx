import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./CERN_TOOLBAR.css";

const { Header } = Layout;

function CERN_TOOLBAR() {
  return (
    <Header id="cern-toolbar" aria-label="CERN Toolbar">
      <h1>
        <a href="//home.cern" title="CERN">
          CERN
          <span> Accelerating science</span>
        </a>
      </h1>

      <ul>
        <li className="signin">
          <a href="/user/login">Sign in</a>
        </li>
        <li className="directory">
          <a
            href="//cern.ch/directory"
            className="cern-directory"
            title="Search CERN resources and browse the directory"
          >
            Directory
          </a>
        </li>
      </ul>
    </Header>
  );
}

export default CERN_TOOLBAR;
