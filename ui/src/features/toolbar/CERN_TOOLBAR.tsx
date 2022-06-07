import React from "react";
import { Layout, Typography, Menu } from "antd";
import "./CERN_TOOLBAR.css";

const { Header } = Layout;
const { Title } = Typography;

function CERN_TOOLBAR() {
  const [current, setCurrent] = React.useState("icon");

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Header id="cern-toolbar" aria-label="CERN Toolbar">
      <Title>
        <Typography.Link href="//home.cern" title="CERN">
          CERN
          <span> Accelerating science</span>
        </Typography.Link>
      </Title>

      <Menu
        onClick={handleClick}
        mode="horizontal"
        defaultSelectedKeys={["footer"]}
      >
        <Menu.Item className="signin" key="signin">
          <div className="item-list item-list-length">
            <Menu className="toolbar-submenu">
              <Menu.Item className="directory" key="directory">
                <Typography.Link
                  href="//cern.ch/directory"
                  className="cern-directory"
                  title="Search CERN resources and browse the directory"
                >
                  Directory
                </Typography.Link>
              </Menu.Item>

              <Menu.Item
                className="signin cern-account-links"
                key="cern-account-links"
              >
                <Typography.Link
                  href="/user/login"
                  className="cern-account cern-signin cern-single-mobile-signin"
                >
                  Sign in
                </Typography.Link>
              </Menu.Item>
            </Menu>
          </div>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default CERN_TOOLBAR;
