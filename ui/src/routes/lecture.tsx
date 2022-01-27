import { useParams, Outlet } from "react-router-dom";
import "../App.css";
import { Layout } from "antd";
import "antd/dist/antd.css";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import { getApiRoot } from "../api/api_root";
import React from "react";

const { Content } = Layout;

function Lecture() {
  const [lecture, setLecture] = React.useState<any>();
  let { lectureId } = useParams();

  let apiInstance = getApiRoot();

  React.useEffect(() => {
    apiInstance.get(`/lectures/${lectureId}/`).then((response) => {
      setLecture(response.data);
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
  }, []);

  if (!lecture) return null;

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="video-box">
          <div className="video-window">
            <iframe
              title={lecture.title}
              src={`https://cds.cern.ch/video/${lectureId}?showTitle=true`}
              allow-fullscreen="true"
            ></iframe>
          </div>

          <div className="lecture-details">
            <h2 style={{ lineHeight: 1.5 }}>{lecture.title}</h2>
            <h3>{lecture.speaker}</h3>
            <h4>{lecture.date}</h4>
            <a href={lecture.event_details}>Event details (Indico)</a>
            <p>{lecture.abstract}</p>
            <Outlet />
          </div>
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lecture;
