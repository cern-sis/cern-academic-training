import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

import { List, Row, Layout, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import LOADING_ICON from "../components/LOADING_ICON";
import ErrorMessage from "../components/ErrorMessage";
import { getApiRoot } from "../api/api_root";
import { Lecture as LectureModel } from "../models/lectures";
const { Content } = Layout;
const { Title } = Typography;

function filenameFromUrl(url: string) {
  try {
    return url.substring(url.lastIndexOf("/") + 1);
  } catch (error) {
    return url;
  }
}

function LectureItem({ lecture }: { lecture: LectureModel }) {
  const isVideo = lecture.type && lecture.type.includes("video");
  const isSlide = lecture.type && lecture.type.includes("slide");
  const lectureId = lecture.lecture_id;

  useEffect(() => {
    document.title = `${lecture.title} | CERN Academic Training`;
  }, [lecture]);

  let year = null;
  let indicoId = null;

  if (isSlide && lecture.date) {
    year = lecture.date.slice(0, 4);
  }

  if (isSlide && lecture.event_details) {
    indicoId = lecture.event_details.split("/")[4];
  }

  const displaySlidePlayer = year && indicoId;
  const displayVideo = isVideo && !displaySlidePlayer;

  const get_trimmed_abstract = () => {
    const trimmed_abstract = lecture.abstract
      .replace(/(<([^>]+)>)/gi, "")
      .substring(0, 161);
    if (trimmed_abstract.slice(-1) === " ") {
      return trimmed_abstract.substring(0, 160);
    } else {
      return trimmed_abstract.substring(0, trimmed_abstract.lastIndexOf(" "));
    }
  };

  const get_description = () => {
    if (lecture.abstract.length > 160) {
      return get_trimmed_abstract();
    } else {
      return lecture.abstract;
    }
  };

  const meta_tag_description = lecture.abstract ? get_description() : "";

  return (
    <>
      <Helmet>
        <title>{lecture.title}</title>
        <meta name="description" content={meta_tag_description} />
      </Helmet>
      {displayVideo && (
        <div className="video-window">
          <iframe
            title={lecture.title}
            src={`https://cds.cern.ch/video/${lectureId}?showTitle=true`}
            allowFullScreen
          />
        </div>
      )}
      {displaySlidePlayer && (
        <div className="video-window">
          <iframe
            title={lecture.title}
            src={`https://mediastream.cern.ch/MediaArchive/Video/Public2/weblecture-player/index.html?year=${year}&lecture=${indicoId}`}
            allowFullScreen
            scrolling="no"
            frameBorder="0"
          />
        </div>
      )}
      <div className="lecture-details">
        <Title level={3}>
          {lecture.speaker && lecture.speaker.join(" · ")}
        </Title>
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
    </>
  );
}

function Lecture() {
  const [lecture, setLecture] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let { lectureId } = useParams();

  const fetchLecture = async () => {
    try {
      setLoading(true);
      const results = await getApiRoot().get(`/lectures/${lectureId}/`);
      setLecture(results.data);
      setLoading(false);
      setLoading(false);
    } catch (error) {
      setLecture({});
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchLecture();
    // eslint-disable-next-line
  }, [lectureId]);

  useEffect(() => {
    document.title = `Lecture | CERN Academic Training`;
  }, [lectureId, error]);

  window.scrollTo(0, 0);

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content className="atc-content lecture-page">
        <div className="video-box">
          <Row justify="space-between" gutter={[12, 1]}>
            {loading && <LOADING_ICON />}
          </Row>
          {lecture && <LectureItem lecture={lecture} />}
          {error && <ErrorMessage />}
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lecture;
