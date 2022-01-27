import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./CERN_FOOTER.css";

const { Footer } = Layout;

function CERN_FOOTER() {
  return (
    <Footer id="cern-footer">
      <div className="footer">
        <div className="row">
          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 footer-first-col">
            <div className="region-footercolumn1">
              <nav
                role="navigation"
                aria-labelledby="block-cernclean-footer-menu"
                id="block-cernclean-footer"
              >
                <h2
                  className="visually-hidden"
                  id="block-cernclean-footer-menu"
                >
                  Footer menu
                </h2>

                <ul className="menu nav">
                  <li>
                    <a href="https://home.cern">CERN</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 footer-second-col">
          <div className="row">
            <div className="col-sm-5 col-md-4 col-md-offset-0 col-lg-4 col-lg-offset-0">
              <div className="region-footercolumn2">
                <nav
                  role="navigation"
                  aria-labelledby="block-generalinfo-2-menu"
                  id="block-generalinfo-2"
                >
                  <h2 id="block-generalinfo-2-menu">General info</h2>

                  <ul className="menu nav">
                    <li>
                      <a href="https://careers.cern/">Careers</a>
                    </li>
                    <li>
                      <a href="https://visits.web.cern.ch/">Visits</a>
                    </li>
                    <li>
                      <a href="https://home.cern/data-privacy-protection-policy">
                        Privacy policy
                      </a>
                    </li>
                    <li>
                      <a href="https://copyright.web.cern.ch/">
                        Copyright and terms of use{" "}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-sm-6 col-sm-offset-1 col-md-4 col-md-offset-0 col-lg-4">
              <div className="mb-4">
                <div className="region region-footercolumn3">
                  <nav
                    role="navigation"
                    aria-labelledby="block-cernandyou-2-menu"
                    id="block-cernandyou-2"
                  >
                    <h2 id="block-cernandyou-2-menu">Cern and You</h2>

                    <ul className="menu nav">
                      <li>
                        <a href="http://cds.cern.ch">CERN Document Server</a>
                      </li>
                      <li>
                        <a href="https://printservice.web.cern.ch/printservice/Services/CernPrintshop.aspx">
                          CERN Printshop
                        </a>
                      </li>
                      <li>
                        <a href="https://writing-guidelines.web.cern.ch/">
                          Writing Guidelines
                        </a>
                      </li>
                      <li>
                        <a href="https://communications.web.cern.ch/strategy">
                          Communications Strategy
                        </a>
                      </li>
                      <li>
                        <a href="https://hr-dep.web.cern.ch/content/code-of-conduct">
                          Code of Conduct
                        </a>
                      </li>
                      <li>
                        <a href="https://wikis.ec.europa.eu/display/WEBGUIDE/02.+Content+accessibility+checklist">
                          Europa Web Guide content accessibility checklist
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-0 col-lg-4 col-lg-offset-0">
              <div className="mb-4">
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 logo">
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
      </div>
      <div className="copy-wrapper light">
        <a href="https://copyright.web.cern.ch/">Copyright</a>
        &nbsp;&copy; 2022 CERN
      </div>
    </Footer>
  );
}

export default CERN_FOOTER;