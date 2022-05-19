import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Typography, Menu } from "antd";
import "./AT_HEADER.css";

const { Title } = Typography;

function MENU() {
  const [current, setCurrent] = useState("icon");

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      mode="horizontal"
      className="menu"
      overflowedIndicator={false}
    >
      <Menu.Item className="about-us" key="about-us">
        <LinkRouter to={`/about-us`}>
          <Title level={2} className="about-us-link">
            About
          </Title>
        </LinkRouter>
      </Menu.Item>

      <Menu.Item className="events" key="events">
        <Typography.Link href="https://indico.cern.ch/category/72/">
          <Title level={2} className="events-link">
            Events
          </Title>
        </Typography.Link>
      </Menu.Item>

      <Menu.Item className="contact-us" key="contact-us">
        <Typography.Link href="mailto:atc-contact@cern.ch" target="_blank">
          <Title level={2} className="contact-us-link">
            Contact
          </Title>
        </Typography.Link>
      </Menu.Item>
    </Menu>
  );
}

export default MENU;
