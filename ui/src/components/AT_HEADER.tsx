import React, { useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./AT_HEADER.css";

const { Header } = Layout;

function AT_HEADER() {
  let navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const searchValue = searchQuery.get("search");
  let [searchTerm, setSearchTerm] = useState(searchValue);

  const onKeyDown = (ev: any) => {
    const searchValue = ev.target.value;
    if (searchValue) {
      setSearchTerm(ev.target.value);
      navigate(`/search?search=${ev.target.value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <Header id="atc-header">
      <div className="header">
        <h1>
          <a href="/">ACADEMIC TRAINING</a>
        </h1>

        <ul className="search-box">
          <li>
            <Input
              className="search-input"
              bordered={false}
              placeholder="Search..."
              onPressEnter={onKeyDown}
              defaultValue={searchValue || ""}
            />
          </li>

          <li className="search-icon">
            <Link to={`/search/?search=${searchTerm}`}>
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
            </Link>
          </li>
        </ul>
      </div>
    </Header>
  );
}

export default AT_HEADER;
