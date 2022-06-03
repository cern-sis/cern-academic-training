import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Card,
  Carousel,
  Typography,
  Divider,
  Spin,
} from "antd";

import { getPhotos } from "./photos/carousel/photos";
import AT_HEADER from "./components/AT_HEADER";
import CERN_FOOTER from "./components/CERN_FOOTER";
import CERN_TOOLBAR from "./components/CERN_TOOLBAR";
import { PlayCircleOutlined } from "@ant-design/icons";
import { getApiRoot } from "./api/api_root";
import SUGGESTION_BOX from "./components/SUGGESTION_BOX";
import LOADING_ICON from "./components/LOADING_ICON";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  const photos = getPhotos();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      const results = await getApiRoot().get(`/search/lectures/?page_size=12`);
      setLoading(false);
      setLectures(results.data.results);
    } catch (error) {
      setLectures([]);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  window.scrollTo(0, 0);

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
          <div className="content-lists">
            <div className="responsive">
              <div className="frame">
                <div id="atc-logo">
                  <img
                    src="academicTrainingLogo.png"
                    alt="Academic Training Logo"
                  />
                </div>
                <Title>
                  <Typography.Link href="/" style={{ color: "#fff" }}>
                    ACADEMIC TRAINING{" "}
                  </Typography.Link>
                </Title>
              </div>
            </div>
            <div className="recent">
              <Title level={2}>MOST RECENT</Title>
              <Divider className="divider" />
            </div>
            .{" "}
            <Row justify="center" gutter={[16, 42]}>
              {loading ? (
                <LOADING_ICON />
              ) : (
                lectures.map((lecture: any) => {
                  return (
                    <Col
                      key={lecture.lecture_id}
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={6}
                    >
                      <nav>
                        <LinkRouter
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
                            <div className="play">
                              <PlayCircleOutlined />
                            </div>

                            <div className="duration">
                              <Title level={5}>
                                {lecture.imprint.split(" - ")[1]}
                              </Title>
                            </div>

                            <Card.Grid
                              className="card-content"
                              hoverable={false}
                            >
                              <div className="video-content">
                                <Title level={4}>{lecture.speaker}</Title>
                              </div>
                              <div className="video-content">
                                <Title level={2}>{lecture.title}</Title>
                              </div>
                              <div className="video-content">
                                <Title level={3}>
                                  Posted on <strong>{lecture.date}</strong>
                                </Title>
                              </div>
                            </Card.Grid>
                          </Card>
                        </LinkRouter>
                      </nav>
                    </Col>
                  );
                })
              )}
            </Row>
          </div>
        </Fragment>

        <Fragment>
          <SUGGESTION_BOX />
        </Fragment>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default App;
