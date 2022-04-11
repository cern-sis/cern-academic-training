import React, { useState, useEffect } from "react";

import {
  Link as LinkRouter,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Layout,
  Input,
  Button,
  Typography,
  Menu,
  Row,
  Col,
  Drawer,
} from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

import "./AT_HEADER.css";

const { Header } = Layout;
const { Title } = Typography;

function AT_HEADER() {
  let navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const searchValue = searchQuery.get("search") || "";
  let [searchTerm, setSearchTerm] = useState(searchValue);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [state, setState] = useState({ collapsed: true });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [current, setCurrent] = React.useState("icon");

  const onKeyDown = (ev: any) => {
    const searchValue = ev.target.value;
    if (searchValue) {
      setSearchTerm(ev.target.value);
      navigate(`/search?search=${ev.target.value}&page=1`);
    } else {
      navigate("/search");
    }
  };

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const toggleCollapsed = (e: any) => {
    setToggleMenu(!toggleMenu);
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

  const menu = (
    <Menu
      onClick={handleClick}
      mode="horizontal"
      className="menu"
      overflowedIndicator={false}
    >
      <Menu.Item className="about-us" key="about-us">
        <LinkRouter to={`/about-us`}>
          <Title level={2} className="about-us-link">
            About Us
          </Title>
        </LinkRouter>
      </Menu.Item>

      <Menu.Item className="search-icon" key="icon">
        <LinkRouter to={`/search/?search=${searchTerm}&page=1`}>
          <Button
            className="search-button"
            type="primary"
            style={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          >
            <SearchOutlined style={{ color: "white", fontSize: "200%" }} />
          </Button>
        </LinkRouter>
      </Menu.Item>
      <Menu.Item className="search-box" key="input">
        <Input
          className="search-input"
          bordered={false}
          placeholder="Search..."
          onPressEnter={onKeyDown}
          defaultValue={searchValue || ""}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <Header id="atc-header">
      <div className="header">
        <Row className="row" justify="space-between" gutter={12}>
          <Col
            className="header-title"
            key="header-title"
            xs={24}
            sm={24}
            md={12}
            lg={12}
          >
            <Title>
              <Typography.Link href="/">ACADEMIC TRAINING</Typography.Link>
            </Title>
          </Col>

          <Col
            className="header-menu"
            key="header-menu"
            xs={24}
            sm={24}
            md={12}
            lg={12}
          >
            {(toggleMenu || screenWidth >= 1200) && <div>{menu}</div>}

            {(toggleMenu || screenWidth < 1200) && (
              <Drawer
                placement="right"
                width="100%"
                className="drawer"
                onClose={toggleCollapsed}
                visible={!state.collapsed}
                closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
              >
                {menu}
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
