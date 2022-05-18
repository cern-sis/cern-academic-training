import React, { useState, useEffect } from "react";

import { Layout, Button, Typography, Row, Col, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import "./AT_HEADER.css";
import SEARCH_BAR from "./SEARCH_BAR";
import MENU from "./MENU";

const { Header } = Layout;
const { Title } = Typography;

function AT_HEADER() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [state, setState] = useState({ collapsed: true });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [header, setHeader] = useState(false);

  const toggleCollapsed = (e: any) => {
    setState((state) => {
      return {
        collapsed: !state.collapsed,
      };
    });
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <Header id="atc-header">
      <div className={header ? "header active" : "header"}>
        <Row justify="space-around">
          <Col
            xs={{ span: 22, order: 1 }}
            lg={{ span: 7, order: 1 }}
            className="header-title"
            key="header-title"
          >
            <Title>
              <Typography.Link href="/">ACADEMIC TRAINING</Typography.Link>
            </Title>
          </Col>

          <Col
            xs={{ span: 24, order: 3 }}
            lg={{ span: 10, order: 2 }}
            className="header-search"
            key="header-search"
          >
            <SEARCH_BAR />
          </Col>

          <Col
            xs={{ span: 2, order: 2 }}
            lg={{ span: 7, order: 3 }}
            className="header-menu"
            key="header-menu"
          >
            {(toggleMenu || screenWidth > 992) && <MENU />}

            {(toggleMenu || screenWidth <= 992) && (
              <Drawer
                placement="right"
                width="300px"
                className="drawer"
                onClose={toggleCollapsed}
                visible={!state.collapsed}
                destroyOnClose={true}
                closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
              >
                <MENU />
              </Drawer>
            )}

            <Button
              type="primary"
              className="menu-mobile"
              onClick={toggleCollapsed}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "200%",
              }}
            >
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
      </div>
    </Header>
  );
}

export default AT_HEADER;
