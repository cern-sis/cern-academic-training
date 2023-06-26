import React, { Fragment } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Carousel,
  Avatar,
  Space,
  Typography,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";

import "../App.css";
import { getMemebers } from "../photos/members/members";
import { getPhotos } from "../photos/carousel/photos";
import { getReveal } from "../events/reveal";

import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import { HOME_PAGE_METATAG_CONTENT } from "../common/constants";

const { Content } = Layout;
const { Title } = Typography;

// MEMBERS.keys().map((section: any) => {
//   console.log("section", MEMBERS[section], section);
// });
console.log("s", getMemebers());
// getMemebers().map(({ key, value }: any) => console.log(key, value));
const MEMBERS = getMemebers();

const photos = getPhotos();
function AboutUs() {
  window.scrollTo(0, 0);

  getReveal();

  const style = { display: "flex", alignItems: "center", padding: "10px" };

  return (
    <Layout className="layout">
      <Helmet>
        <meta name="description" content={HOME_PAGE_METATAG_CONTENT} />
        <title>About | CERN Academic Training</title>
      </Helmet>
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="about-us-content">
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
                    src="../academicTrainingLogo.png"
                    alt="Academic Training Logo"
                  />
                </div>
                <Title>
                  <Typography.Link href="/about-us" style={{ color: "#fff" }}>
                    ABOUT US
                  </Typography.Link>
                </Title>
              </div>
            </div>
            <div className="atc-title reveal">
              <Title level={2}>ACADEMIC TRAINING COMMITTEE</Title>
              <Divider className="divider" />
            </div>
            <div className="our-mission reveal">
              <Title level={4}>
                The CERN Academic Training lectures cover physics and technology
                research results, as well as leading-edge news from other
                disciplines. Past lectures often present a great historical
                value. The lectures are open to all members of CERN personnel
                (staff, fellows, associates, students, users, project associates
                and apprentices) free of charge. Each lecture is recorded and
                published on the web along with the visual support material. The
                complete catalogue of the Academic Training Programme lectures
                is archived since 1968.
              </Title>
            </div>{" "}
            <div className="atc-title reveal">
              <Title level={2}>Members</Title>
              <Divider className="divider" />
            </div>
            <Row
              className="reveal"
              style={style}
              justify="center"
              gutter={[16, 52]}
            >
              {MEMBERS["core"].map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar size={120} src={member.profile.default} />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
            </Row>{" "}
            <div className="atc-title reveal">
              <Title level={3}>Departments</Title>
              <Divider className="divider" />
            </div>
            <Row
              className="reveal"
              style={style}
              justify="center"
              gutter={[16, 52]}
            >
              {MEMBERS["departments"].map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar size={120} src={member.profile.default} />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
            </Row>{" "}
            <div className="atc-title reveal">
              <Title level={3}>Users</Title>
              <Divider className="divider" />
            </div>
            <Row className="reveal" style={style} justify="center" gutter={16}>
              {MEMBERS["users"].map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={24}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar size={120} icon={<UserOutlined />} />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
            </Row>{" "}
            <div className="atc-title reveal">
              <Title level={3}>Staff Association</Title>
              <Divider className="divider" />
            </div>
            <Row className="reveal" style={style} justify="center" gutter={16}>
              {MEMBERS["staff association"].map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={24}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar size={120} src={member.profile.default} />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
            </Row>{" "}
            <div className="atc-title reveal">
              <Title level={3}>Observers</Title>
              <Divider className="divider" />
            </div>
            <Row
              className="reveal"
              style={style}
              justify="center"
              gutter={[16, 52]}
            >
              {MEMBERS["observers"].map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={6}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar size={120} src={member.profile.default} />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
            </Row>
          </div>
        </Fragment>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default AboutUs;
