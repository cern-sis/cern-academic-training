import { Link, useSearchParams } from "react-router-dom";
import {
  useState,
  useRef,
  useEffect,
} from "react-dom/node_modules/@types/react";
import { Layout, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./AT_HEADER.css";

const { Header } = Layout;

// const inputRef = useRef();

// useEffect(() => {
//   inputRef.current.focus();
// }, []);

// const [query, setQuery] = useState();

function AT_HEADER() {
  const [searchTerm, setSearchTerm] = useSearchParams("");

  const value = searchTerm.get("queue") || "";

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let queue = (ev.target as HTMLInputElement).value;
    if (queue) {
      setSearchTerm({ queue });
    } else {
      setSearchTerm({});
    }
  };

  //TODO - the pressDOwnKey works, but the function of search isn't binded yet
  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      console.log("onKeyDown", ev);
      setSearchTerm(value);
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
              value={value}
              onChange={handleChange}
              onPressEnter={onKeyDown}
            />
          </li>

          <li className="search-icon">
            <Link to={`/search/?${searchTerm}`}>
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
