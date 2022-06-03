import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

import { List, Layout, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import LOADING_ICON from "../components/LOADING_ICON";
import { getApiRoot } from "../api/api_root";

const { Content } = Layout;
const { Title } = Typography;

function Lecture() {
  const [lecture, setLecture] = useState<any>({});
  const [showVideo, setShowVideo] = useState(false);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  let { lectureId } = useParams();

  const fetchLecture = async () => {
    try {
      setLoading(true);
      const results = await getApiRoot().get(`/lectures/${lectureId}/`);
      setLoading(false);
      setLecture(results.data);
    } catch (error) {
      setLecture({});
    }
  };

  const renderContent = async () => {
    if ((lecture.type = ["video"])) {
      setShowVideo(true);
    } else if (lecture.files != null) {
      setShowList(true);
    } else {
      setShowVideo(false);
      setShowList(false);
    }
  };

  useEffect(() => {
    fetchLecture();
    renderContent();
  }, []);

  window.scrollTo(0, 0);

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content className="atc-content lecture-page">
        {loading ? (
          <LOADING_ICON />
        ) : (
          <div className="video-box">
            {showVideo && (
              <div className="video-window">
                <iframe
                  title={lecture.title}
                  src={`https://cds.cern.ch/video/${lectureId}?showTitle=true`}
                  allowFullScreen
                />
              </div>
            )}
            <div className="lecture-details">
              <Title level={3}>{lecture.speaker}</Title>
              <Title>{lecture.title}</Title>
              <div className="details">
                <Title level={4}>{lecture.date}</Title>
                <div id="bullet">•</div>
                <a href={lecture.event_details}>Event details (Indico)</a>
                <div id="bullet">•</div>
                <Title level={4}>
                  Sponsored by <strong>{lecture.sponsor}</strong>
                </Title>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: lecture.abstract,
                }}
              />
              <Outlet />

              {showList && (
                <div className="files">
                  <div className="download-title">
                    <DownloadOutlined
                      style={{
                        color: "#fff",
                        fontSize: "250%",
                      }}
                    />
                    <Title level={2}>Download files:</Title>
                  </div>

                  <List
                    itemLayout="horizontal"
                    dataSource={[lecture.files]}
                    split={false}
                    renderItem={(item, index) => (
                      <List.Item key={index}>
                        {index + 1}. <a href={item}>{item.split("/")[6]}</a>
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lecture;
