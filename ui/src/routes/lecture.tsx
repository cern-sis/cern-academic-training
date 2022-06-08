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

function filenameFromUrl(url: string) {
  try {
    return url.substring(url.lastIndexOf("/") + 1);
  } catch (error) {
    return url;
  }
}

function Lecture() {
  const [lecture, setLecture] = useState<any>({});
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

  useEffect(() => {
    fetchLecture();
  }, [lectureId]);

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
            {lecture.type && lecture.type.includes("video") && (
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
                {lecture.date && lecture.date !== "" && (
                  <Title level={4} id="date">
                    {lecture.date}
                  </Title>
                )}
                {lecture.event_details && lecture.event_details !== "" && (
                  <a href={lecture.event_details} id="event">
                    Event details (Indico)
                  </a>
                )}
                {lecture.sponsor && lecture.sponsor !== "" && (
                  <Title level={4} id="sponsor">
                    Sponsored by <strong>{lecture.sponsor}</strong>
                  </Title>
                )}
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: lecture.abstract,
                }}
              />
              <Outlet />

              {lecture.files && lecture.files.length > 0 && (
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
                    dataSource={lecture.files || []}
                    split={false}
                    renderItem={(item: string, index) => {
                      return (
                        <List.Item key={index}>
                          {index + 1}.{" "}
                          <a
                            title={item}
                            rel="noreferrer"
                            target="_blank"
                            href={item}
                          >
                            {filenameFromUrl(item)}
                          </a>
                        </List.Item>
                      );
                    }}
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
