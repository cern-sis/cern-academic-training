import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout, Space, Input, Drawer, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./AT_HEADER.css";

const { Header } = Layout;

const { Search } = Input;
const onSearch = (value: any) => console.log(value);

function AT_HEADER() {
  const [searchTerm, setSearchTerm] = useSearchParams("");

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header id="atc-header">
      <h1>
        <a href="/">ACADEMIC TRAINING</a>
      </h1>

      <ul>
        <li className="search">
          <Button
            type="primary"
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={showDrawer}
          >
            <SearchOutlined
              className="search-icon"
              style={{ color: "white", fontSize: "260%" }}
            />
          </Button>
          <Drawer
            style={{ backgroundColor: "transparent" }}
            title="Search"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            <Space direction="vertical">
              <Search
                placeholder="Write here..."
                allowClear
                value={searchTerm.get("filter") || ""}
                onChange={(event) => {
                  let filter = event.target.value;
                  if (filter) {
                    setSearchTerm({ filter });
                  } else {
                    setSearchTerm({});
                  }
                }}
                onSearch={onSearch}
                enterButton={
                  <Link to={`/results/?${searchTerm}`}>
                    <SearchOutlined
                      className="search-icon"
                      style={{ color: "white", fontSize: "150%" }}
                    />
                  </Link>
                }
              />
            </Space>
          </Drawer>
        </li>
      </ul>
    </Header>
  );
}

export default AT_HEADER;
