import React, { useState } from "react";

import {
  Link as LinkRouter,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Layout, Input, Button, Typography, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./AT_HEADER.css";

const { Header } = Layout;
const { Title } = Typography;

function AT_HEADER() {
  let navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const searchValue = searchQuery.get("search") || "";
  let [searchTerm, setSearchTerm] = useState(searchValue);
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

  return (
    <Header id="atc-header">
      <div className="header">
        <Title>
          <Typography.Link href="/">ACADEMIC TRAINING</Typography.Link>
        </Title>
        <Menu
          onClick={handleClick}
          mode="horizontal"
          defaultSelectedKeys={["icon"]}
        >
          <Menu.Item className="about-us" key="about-us">
            <LinkRouter to={`/about-us`}>
              <Title level={2}>About Us</Title>
            </LinkRouter>
          </Menu.Item>

          <Menu.Item className="search-icon" key="icon">
            <LinkRouter to={`/search/?search=${searchTerm}&page=1`}>
              <Button
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
      </div>
    </Header>
  );
}

export default AT_HEADER;
