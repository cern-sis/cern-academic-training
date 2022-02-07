import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

import { Layout } from "antd";

import "../App.css";

import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import { getApiRoot } from "../api/api_root";

const { Content } = Layout;

function Lecture() {
  const [lecture, setLecture] = useState<any>({});
  let { lectureId } = useParams();

  const fetchLecture = async () => {
    try {
      const results = await getApiRoot().get(`/lectures/${lectureId}/`);
      setLecture(results.data);
    } catch (error) {
      setLecture({});
    }
  };

  useEffect(() => {
    fetchLecture();
  }, []);

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
