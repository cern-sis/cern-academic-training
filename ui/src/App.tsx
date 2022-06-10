import { PlayCircleOutlined } from "@ant-design/icons";
import { Card, Carousel, Col, Divider, Layout, Row, Typography } from "antd";
import React, { Fragment } from "react";
import { Link as LinkRouter } from "react-router-dom";
import "./App.css";
import {
  AT_HEADER,
  CERN_FOOTER,
  CERN_TOOLBAR,
  LOADING_ICON,
  SUGGESTION_BOX,
} from "./features";
import { getPhotos } from "./photos/carousel/photos";
import { useSearchLecturesQuery } from "./services/lectures.service";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  const photos = getPhotos();
  const { data, error, isLoading } = useSearchLecturesQuery({
    searchTerm: undefined,
    currentPage: undefined,
    pageSize: 12,
  });

  const content = error ? (
    <Card>Oh no, there was an error</Card>
  ) : isLoading ? (
    <LOADING_ICON />
  ) : (
    data?.map((lecture: any) => {
      return (
        <Col key={lecture.lecture_id} xs={24} sm={24} md={12} lg={8} xl={6}>
          <nav>
            <LinkRouter
              to={`/lectures/${lecture.lecture_id}`}
              key={lecture.lecture_id}
            >
              <Card
                hoverable
                className="video-card"
                cover={<img alt="thumbnail" src={lecture.thumbnail_picture} />}
              >
                <div className="play">
                  <PlayCircleOutlined />
                </div>

                <div className="duration">
                  <Title level={5}>{lecture.imprint.split(" - ")[1]}</Title>
                </div>

                <Card.Grid className="card-content" hoverable={false}>
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
  );

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
              {content}
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
