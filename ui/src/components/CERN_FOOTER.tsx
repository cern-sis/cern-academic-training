import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Typography, Menu } from "antd";
import "./CERN_FOOTER.css";

const { Footer } = Layout;
const { Title } = Typography;

function CERN_FOOTER() {
  return (
    <Footer id="cern-footer">
      <div className="footer">
        <Row className="row" justify="space-between" gutter={12}>
          <Col
            className="footer-second-col"
            key="footer-second-col"
            xs={24}
            sm={24}
            md={8}
            lg={6}
          >
            <div className="mb-4">
              <div className="region-footercolumn2">
                <nav
                  role="navigation"
                  aria-labelledby="block-generalinfo-2-menu"
                  id="block-generalinfo-2"
                >
                  <Title level={2} id="block-generalinfo-2-menu">
                    General info
                  </Title>
                  <Menu className="menu nav">
                    <Menu.Item key='policy'>
                      <Typography.Link href="https://home.cern/data-privacy-protection-policy">
                        Privacy policy
                      </Typography.Link>
                    </Menu.Item>
                    <Menu.Item key="copyright">
                      <Typography.Link href="https://copyright.web.cern.ch/">
                        Copyright and terms of use{" "}
                      </Typography.Link>
                    </Menu.Item>
                  </Menu>
                </nav>
              </div>
            </div>
          </Col>

          <Col
            className="footer-third-col"
            key="footer-third-col"
            xs={24}
            sm={24}
            md={8}
            lg={6}
          >
            <div className="mb-4">
              <div className="region region-footercolumn3">
                <nav
                  role="navigation"
                  aria-labelledby="block-cernandyou-2-menu"
                  id="block-cernandyou-2"
                >
                  <Title level={2} id="block-cernandyou-2-menu">
                    Academic Training Committee
                  </Title>

                  <Menu className="menu nav">
                    <Menu.Item key="about-us">
                      <Link to={`/about-us/`}>About</Link>
                    </Menu.Item>

                    <Menu.Item key="server">
                      <Typography.Link href="https://cds.cern.ch/collection/Academic%20Training%20Lectures?ln=en">
                        CERN Document Server
                      </Typography.Link>
                    </Menu.Item>

                    <Menu.Item key="events">
                      <Typography.Link href="https://indico.cern.ch/category/72/">
                        Events
                      </Typography.Link>
                    </Menu.Item>
                  </Menu>
                </nav>
              </div>
            </div>
          </Col>

          <Col
            className="footer-fourth-col"
            key="footer-fourth-col"
            xs={24}
            sm={24}
            md={8}
            lg={6}
          >
            <div className="mb-4">
              <div className="region region-footercolumn4">
                <nav
                  role="navigation"
                  aria-labelledby="block-contactinfo-menu"
                  id="block-contactinfo"
                >
                  <Title level={2} id="block-contactinfo-menu">
                    Contact info
                  </Title>
                  <Menu className="menu nav">
                    <Menu.Item key="email">
                      <Typography.Link
                        href="mailto:atc-contact@cern.ch"
                        target="_blank"
                      >
                        atc-contact@cern.ch
                      </Typography.Link>
                    </Menu.Item>
                  </Menu>
                </nav>
              </div>
            </div>
          </Col>

          <Col className="logo" key="logo" xs={24} sm={24} md={24} lg={6}>
            <Typography.Link
              href="https://home.cern/"
              title="CERN"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://visit.cern/themes/custom/cernclean/logo.svg"
                alt="CERN"
              />
            </Typography.Link>
          </Col>
        </Row>
      </div>

      <div className="copy-wrapper light">
        <Typography.Link href="https://copyright.web.cern.ch/">
          Copyright
        </Typography.Link>
        &nbsp;&copy; 2022 CERN
      </div>
    </Footer>
  );
}

export default CERN_FOOTER;
