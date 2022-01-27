import { Outlet, Link, useSearchParams, useParams } from "react-router-dom";
import React from "react";
import "../App.css";
import { Layout, Pagination, List } from "antd";
import "antd/dist/antd.css";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import { getLectures } from "../data";
import { getApiRoot } from "../api/api_root";

const { Content } = Layout;

function Results() {
  const [searchTerm, setSearchTerm] = useSearchParams("");

  const lectures = getLectures();
  // let apiInstance = getApiRoot();

  // const [lectures, setLectures] = React.useState<any>();

  // React.useEffect(() => {
  //   apiInstance.get(`/search/lectures`).then((response) => {
  //     setLectures(response.data);
  //     console.log(response.data);
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.headers);
  //     console.log(response.config);
  //   });
  // }, []);

  // if (!lectures) return null;

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
                .filter((value: any) => {
                  let queue = searchTerm.get("queue");
                  if (!queue) return true;
                  let target =
                    value.title.toLowerCase() ||
                    value.speaker.toLowerCase() ||
                    value.speaker_details.toLowerCase() ||
                    value.abstract.toLowerCase() ||
                    value.date.toLowerCase() ||
                    value.lectureId.toString();
                  return target.startsWith(queue.toLowerCase());
                })
                .map((lecture: any) => {
                  return (
                    <List>
                      <nav>
                        <Link
                          style={{ display: "block", margin: "1rem 0" }}
                          to={`/lectures/${lecture.lecture_id}`}
                          key={lecture.lecture_id}
                        >
                          <div className="video-content">
                            <div className="list-thumbnail">
                              <img
                                alt="thumbnail"
                                src={lecture.thumbnail_picture}
                              />
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
