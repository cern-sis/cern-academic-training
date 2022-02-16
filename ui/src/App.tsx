import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Card, Input, Carousel } from "antd";

import { getPhotos } from "./photos";
import AT_HEADER from "./components/AT_HEADER";
import CERN_FOOTER from "./components/CERN_FOOTER";
import CERN_TOOLBAR from "./components/CERN_TOOLBAR";
import { PlayCircleOutlined } from "@ant-design/icons";
import { getApiRoot } from "./api/api_root";

const { Content } = Layout;
const { TextArea } = Input;

const handleKeyPress = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
  console.log("handleKeyPress", ev);
};

function App() {
  const photos = getPhotos();
  const [lectures, setLectures] = useState([]);

  const fetchLectures = async () => {
    try {
      const results = await getApiRoot().get(`/search/lectures/`);
      setLectures(results.data.results);
    } catch (error) {
      setLectures([]);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <Fragment>
          <div className="carousel-container">
            <div className="photo-carousel" data-preload>
              <Carousel autoplay dots={false}>
                {photos.map((photo) => {
                  return (
                    <div key={photo.src} className="container-fluid">
                      <div className="content">
                        <img alt={photo.alt} src={photo.src} />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </Fragment>

        <Fragment>
          <div className="videolists">
            <div className="responsive">
              <div className="frame">
                <div id="atc-logo">
                  <img src="white-atc-logo.png" alt="Academic Training Logo" />
                </div>
                <h1>
                  <a href="/">ACADEMIC TRAINING </a>
                </h1>
              </div>
            </div>
            <div className="recent">
              <h2>MOST RECENT</h2>
              <div className="divider" />
            </div>
            .{" "}
            <Row justify="center" gutter={[16, 16]}>
              {lectures.map((lecture: any) => {
                return (
                  <Col key={lecture.lecture_id} span={6}>
                    <nav>
                      <Link
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`/lectures/${lecture.lecture_id}`}
                        key={lecture.lecture_id}
                      >
                        <Card
                          hoverable
                          className="video-card"
                          cover={
                            <img
                              alt="thumbnail"
                              src={lecture.thumbnail_picture}
                            />
                          }
                        >
                          <Card.Grid className="grid-style">
                            <div className="play-circle-icon">
                              <PlayCircleOutlined />
                            </div>
                            <div className="video-content">
                              <h2>{lecture.title}</h2>
                            </div>
                            <div className="video-content">
                              <p>{lecture.speaker}</p>
                            </div>
                          </Card.Grid>
                        </Card>
                      </Link>
                    </nav>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Fragment>

        <Fragment>
          <div className="suggestion-box">
            <h1>Submit a suggestion for future topics</h1>
            <div className="suggestion-box-window">
              <TextArea
                placeholder="What else would you see here?"
                className="custom"
                style={{
                  height: 150,
                  maxHeight: 150,
                  background: "transparent",
                  border: "none",
                  color: "white",
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
            <h2>Send</h2>
          </div>
        </Fragment>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default App;
