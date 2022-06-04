import { Outlet, Link } from "react-router-dom";
import "../App.css";
import { Layout, Card } from "antd";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import { getApiRoot } from "../api/api_root";
import React from "react";

const { Content } = Layout;

function Lectures() {
  let apiInstance = getApiRoot();

  const [lectures, setLectures] = React.useState<any>();

  window.scrollTo(0, 0);

  React.useEffect(() => {
    apiInstance.get(`/search/lectures/`).then((response) => {
      if (response.data.error) {
        console.log(response.data.message);
      } else {
        console.log(response.data.results);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);

        let array = [response.data.results];

        for (var i = 0; i < array.length; i++) {
          try {
            setLectures(array[i]);
            console.log("It works");
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  });

  if (!lectures) return null;
  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="lecture">
          {lectures.map((lecture: any) => {
            return (
              <nav>
                <Link to={`/${lecture.lecture_id}`}>
                  <Card
                    hoverable
                    className="video-card"
                    cover={<img alt="thumbnail" src={lecture.thumbnail} />}
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
