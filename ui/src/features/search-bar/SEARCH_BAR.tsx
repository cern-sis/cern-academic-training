import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Button, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../header/AT_HEADER.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSearchTerm } from "./search_slice";

function SEARCH_BAR() {
  let navigate = useNavigate();
  const searchValue = useAppSelector((state) => state.search.searchTerm);
  const dispatch = useAppDispatch();
  const [searchQuery] = useSearchParams();

  const onKeyDown = (ev: any) => {
    const searchValue = ev.target.value;
    if (searchValue)
      dispatch(setSearchTerm(searchValue))
    navigate("/search");
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
