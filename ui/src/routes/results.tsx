import { Outlet, Link, useSearchParams } from "react-router-dom";
import { getLectures } from "../data";
import "../App.css";
import { Layout, Pagination, List, Input } from "antd";
import "antd/dist/antd.css";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";

const { Content } = Layout;

const { Search } = Input;
const onSearch = (value: any) => console.log(value);

function Results() {
  const lectures = getLectures();
  const [searchTerm, setSearchTerm] = useSearchParams("");

  const state = {
    current: 3,
  };

  const onChange = (page: any) => {
    console.log(page);
    setState({
      current: page,
    });
  };

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="search">
          <div className="container">
            <div className="container-content">
              <h1>Search results:</h1>
              {lectures
                .filter((value) => {
                  let filter = searchTerm.get("filter");
                  if (!filter) return true;
                  let title = value.title.toLowerCase();
                  return title.startsWith(filter.toLowerCase());
                })
                .map((lecture) => {
                  return (
                    <List>
                      <nav>
                        <Link
                          style={{ display: "block", margin: "1rem 0" }}
                          to={`/lectures/${lecture.key}`}
                          key={lecture.key}
                        >
                          <div className="video-content">
                            <div className="list-thumbnail">
                              <img alt="thumbnail" src={lecture.thumbnail} />
                            </div>
                            <h2>{lecture.title}</h2>
                            <p>{lecture.speaker}</p>
                          </div>
                        </Link>
                      </nav>
                    </List>
                  );
                })}
              <Outlet />
            </div>

            <Pagination
              className="pagination"
              current={state.current}
              onChange={onChange}
              total={5}
            />
          </div>
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Results;

function setState(arg0: { current: any }) {
  throw new Error("Function not implemented.");
}
