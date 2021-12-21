import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./CERN_FOOTER.css";

const { Footer } = Layout;

function CERN_FOOTER() {
  return (
    <Footer id="cern-footer">
      <ul className="menu nav">
        <li>
          <a href="/form/contact">Contact</a>
        </li>
        <li>
          <a
            href="https://home.cern/about"
            title="More information about the Laboratory"
          >
            About CERN
          </a>
        </li>
        <li>
          <a
            href="https://home.cern/fr/news?audience=23"
            title="Latest news from the Laboratory"
          >
            News
          </a>
        </li>
        <li>
          <a
            href="https://home.cern/fr/science"
            title="Learn more about physics, accelerators, experiments, engineering and computing"
          >
            Science
          </a>
        </li>
        <li>
          <a
            href="https://home.cern/resources"
            title="Dozens of documents, images, videos"
          >
            Resources
          </a>
        </li>
      </ul>

      <div className="logo">
        <a
          href="https://home.cern/"
          title="CERN"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://visit.cern/themes/custom/cernclean/logo.svg"
            alt="CERN"
          />
        </a>
      </div>

      <div className="copy-wrapper light">
        <a href="https://copyright.web.cern.ch/">Copyright</a>
        &nbsp;&copy; 2022 CERN
      </div>
    </Footer>
  );
}

export default CERN_FOOTER;
