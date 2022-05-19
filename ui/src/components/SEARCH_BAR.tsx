import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Button, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./AT_HEADER.css";

function SEARCH_BAR() {
  let navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const searchValue = searchQuery.get("search") || "";
  let [searchTerm, setSearchTerm] = useState(searchValue);

  const onKeyDown = (ev: any) => {
    const searchValue = ev.target.value;
    if (searchValue) {
      setSearchTerm(ev.target.value);
      navigate(`/search/?search=${ev.target.value}&page=1`);
    } else {
      navigate("/search");
    }
  };

  return (
    <Menu className="search">
      <Menu.Item className="search-box" key="input">
        <Input
          className="search-input"
          bordered={false}
          placeholder="Search a lecture..."
          onPressEnter={onKeyDown}
          defaultValue={searchValue || ""}
        />
      </Menu.Item>
      <Menu.Item className="search-icon" key="icon">
        <Button
          className="search-button"
          type="primary"
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
          defaultValue={searchValue || ""}
          onClick={onKeyDown}
        >
          <SearchOutlined style={{ color: "white", fontSize: "200%" }} />
        </Button>
      </Menu.Item>
    </Menu>
  );
}

export default SEARCH_BAR;
