import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Button, Menu, Tooltip } from "antd";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import "./AT_HEADER.css";

function SEARCH_BAR() {
  let navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const searchValue = searchQuery.get("search") || "";


  var helpText = `

    You can search by title, speaker, abstract, sponsor and keywords.

    The default search operator is AND.

    For an OR search, use | between words, ex. particle | physics

    For exact match, use double quotes, like this: "dark matter"
    `;

  const onKeyDown = (ev: any) => {
    const searchValue = ev.target.value;
    if (searchValue) {
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
      <Menu.Item className="help-tooltip" key="help">
        <Tooltip
          color="#0033a0"
          key="#0033a0"
          placement="bottomRight"
          title={
            <span style={{ whiteSpace: "pre-line" }}>
              <strong>How to search:</strong>
              {helpText}
            </span>
          }
          arrowPointAtCenter
        >
          <QuestionCircleOutlined />
        </Tooltip>
      </Menu.Item>
    </Menu>
  );
}

export default SEARCH_BAR;
