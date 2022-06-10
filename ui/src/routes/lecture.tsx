import { DownloadOutlined } from "@ant-design/icons";
import { Layout, List, Typography, Card } from "antd";
import { Outlet, useParams } from "react-router-dom";
import { AT_HEADER, CERN_FOOTER, CERN_TOOLBAR, LOADING_ICON } from '../features';

import { useGetLectureByIdQuery } from "../services/lectures.service";

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
  let { lectureId } = useParams();
  const { data, error, isLoading } = useGetLectureByIdQuery(lectureId ?? "");
  const lecture = data;

  window.scrollTo(0, 0);

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content className="atc-content lecture-page">
        {error ? (
          <Card>Oh no, there was an error</Card>
        ) : isLoading ? (
          <LOADING_ICON />
        ) : data ? (
          <div className="video-box">
            {lecture?.type && lecture?.type.includes("video") && (
              <div className="video-window">
                <iframe
                  title={lecture.title}
                  src={`https://cds.cern.ch/video/${lectureId}?showTitle=true`}
                  allowFullScreen
                />
              </div>
            )}
            <div className="lecture-details">
              <Title level={3}>{lecture?.speaker}</Title>
              <Title>{lecture?.title}</Title>
              <div className="details">
                <Title level={4}>{lecture?.date}</Title>
                <div id="bullet">•</div>
                <a href={lecture?.event_details}>Event details (Indico)</a>
                <div id="bullet">•</div>
                <Title level={4}>
                  Sponsored by <strong>{lecture?.sponsor}</strong>
                </Title>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: lecture?.abstract ?? '',
                }}
              />
              <Outlet />

              {lecture?.files && lecture?.files.length > 0 && (
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
                    dataSource={lecture?.files || []}
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
        ) : null}
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lecture;
