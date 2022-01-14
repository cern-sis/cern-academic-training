import { Link, useSearchParams } from "react-router-dom";
import { Layout, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./AT_HEADER.css";

const { Header } = Layout;

const onSearch = (value: any) => console.log(value);

//TODO - doesn't work yet
const onPressEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
  if (ev.key === "Enter") {
    console.log("onPressEnter", ev);
  }
};

function AT_HEADER() {
  const [searchTerm, setSearchTerm] = useSearchParams("");

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
              value={searchTerm.get("queue") || ""}
              onChange={(event) => {
                let queue = event.target.value;
                if (queue) {
                  setSearchTerm({ queue });
                } else {
                  setSearchTerm({});
                }
              }}
              onPressEnter={onPressEnter}
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
