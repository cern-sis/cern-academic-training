import { Outlet, Link, useParams } from "react-router-dom";
import "../App.css";
import { Layout, Card } from "antd";
import "antd/dist/antd.css";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import { getApiRoot } from "../api/api_root";
import { getLectures } from "../data";
import React from "react";

const { Content } = Layout;

function Lectures() {
  const lectures = getLectures();
  // let apiInstance = getApiRoot();

  // const [lectures, setLectures] = React.useState<any>();

  // React.useEffect(() => {
  //   apiInstance.get(`/search/lectures/`).then((response) => {
  //     setLectures(response.data);
  //     console.log(response.data);
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.headers);
  //     console.log(response.config);
  //   });
  // }, []);

  // if (!lectures) return null;

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="lecture">
          {lectures.map((lecture: any) => {
            return (
              <nav>
                <Link to={`/${lecture.lecture_id}`} key={lecture.lecture_id}>
                  <Card
                    hoverable
                    className="video-card"
                    cover={
                      <img alt="thumbnail" src={lecture.thumbnail_picture} />
                    }
                  >
                    <div className="video-content">
                      <h1>{lecture.title}</h1>
                      <p>{lecture.speaker}</p>
                    </div>
                  </Card>
                </Link>
              </nav>
            );
          })}
          <Outlet />
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lectures;
