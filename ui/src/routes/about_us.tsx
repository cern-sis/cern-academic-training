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

import "../App.css";
import { getMembers } from "../photos/members/members";
import { getPhotos } from "../photos/carousel/photos";
import { getReveal } from "../events/reveal";

import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";

const { Content } = Layout;
const { Title } = Typography;

function AboutUs() {
  const members = getMembers();
  const photos = getPhotos();

  window.scrollTo(0, 0);

  getReveal();

  const style = { display: "flex", alignItems: "center", padding: "10px" };

  return (
    <Layout className="layout">
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
              {members.slice(0, 1).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Urs_Wiedemann.jpg")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(1, 2).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={12}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Maria_Dimou.png")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(2, 3).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={12}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Marika_Flygar.jpg")
                                  .default
                              }
                            />
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
              {members.slice(3, 4).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/AndreDavid.JPG")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(4, 5).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/MassimoGiovanozzi.png")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(5, 6).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Maria-Arsuaga-Rios.png")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(6, 7).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Bertrand_Nicquevert.jpeg")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(7, 8).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Valeria_Perez_Reale.png")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(8, 9).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={8}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Antonio_Perillo_Marcone.jpeg")
                                  .default
                              }
                            />
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
              {members.slice(9, 10).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={24}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Evangelia_Dimovasili.jpeg")
                                  .default
                              }
                            />
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
              {members.slice(10, 11).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={24}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Lynda-Meichtry.jpg")
                                  .default
                              }
                            />
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
              {members.slice(11, 12).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={6}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Maria_Fiascaris.jpeg")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(12, 13).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={6}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Martijn_Mulders.jpg")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(13, 14).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={6}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Sebastian_Lopienski.jpeg")
                                  .default
                              }
                            />
                            <Title level={2}>{member.name}</Title>
                            <p>{member.position}</p>
                          </div>
                        </Card.Grid>
                      </Card>
                    </Col>
                  </Space>
                );
              })}
              {members.slice(14, 15).map((member: any) => {
                return (
                  <Space>
                    <Col key={member.key} span={6}>
                      <Card hoverable className="member-card">
                        <Card.Grid className="grid-style">
                          <div className="member-content">
                            <Title level={3}>{member.department}</Title>
                            <Avatar
                              size={120}
                              src={
                                require("../photos/members/profiles/Frank_Tecker.jpg")
                                  .default
                              }
                            />
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
