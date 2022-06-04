import React, { useState, useEffect } from "react";
import { Outlet, Link, useSearchParams } from "react-router-dom";
import { Layout, Pagination, List, Typography, Row, Col, Empty } from "antd";
import { FileFilled } from "@ant-design/icons";

import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import { getApiRoot } from "../api/api_root";
import LOADING_ICON from "../components/LOADING_ICON";

const { Content } = Layout;
const { Title } = Typography;

const PAGE_SIZE = 10;

function Results() {
  const [searchTerm] = useSearchParams();
  const searchValue = searchTerm.get("search");
  const [lectures, setLectures] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  const searchLectures = async () => {
    try {
      setLoading(true);
      const searchQuery = searchValue
        ? `?search=${searchValue}&page=${currentPage}&page_size=${pageSize}`
        : `?page=${currentPage}&page_size=${pageSize}`;
      const results = await getApiRoot().get(`/search/lectures/${searchQuery}`);
      setLoading(false);
      setLectures(results.data.results);
      setTotal(results.data.count);
    } catch (error) {
      setLectures([]);
    }
  };

  useEffect(() => {
    searchLectures();
  }, [searchValue, currentPage, pageSize]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChage = (current: number, size: number) => {
    setPageSize(size);
  };

  window.scrollTo(0, 0);

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="search">
          <div className="container">
            <div className="container-content">
              <Row justify="space-between">
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Title>
                    Search results: {searchValue ? `"${searchValue}"` : null}{" "}
                  </Title>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12}>
                  <Title level={5}>({total} results)</Title>
                </Col>
              </Row>

              <Row justify="space-between" gutter={[12, 1]}>
                {loading ? (
                  <LOADING_ICON />
                ) : !lectures.length ? (
                  <Col span={24} className="no-results">
                    <Empty className="empty" description="No results found" />{" "}
                    <Title level={4}>Not what you are looking for?</Title>
                    <div className="suggestion">
                      <Typography.Link
                        href="mailto:atc-contact@cern.ch"
                        target="_blank"
                      >
                        <Title className="hover-underline-animation">
                          Submit a suggestion for future topics
                        </Title>
                      </Typography.Link>
                    </div>
                  </Col>
                ) : (
                  lectures.map((lecture: any) => {
                    return (
                      <List key={lecture.lecture_id}>
                        <Link
                          to={`/lectures/${lecture.lecture_id}/`}
                          key={lecture.lecture_id}
                        >
                          <div className="video-content">
                            <Col>
                              {lecture.thumbnail_picture && (
                                <div className="list-thumbnail">
                                  <img
                                    alt="thumbnail"
                                    src={lecture.thumbnail_picture}
                                  />
                                </div>
                              )}
                              {!lecture.thumbnail_picture && (
                                <div className="list-thumbnail">
                                  <div className="blank-thumbnail">
                                    <FileFilled
                                      style={{
                                        fontSize: "350%",
                                        opacity: "0.6",
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </Col>

                            <Col className="list-content">
                              <Title level={4}>{lecture.speaker}</Title>
                              <Title level={2}>{lecture.title}</Title>
                              <Title level={3}>{lecture.date}</Title>
                            </Col>
                          </div>
                        </Link>
                      </List>
                    );
                  })
                )}
                <Outlet />
              </Row>

              <Row justify="end">
                <Col>
                  <Pagination
                    current={currentPage}
                    showSizeChanger
                    pageSize={pageSize}
                    onChange={onChange}
                    total={total}
                    onShowSizeChange={onPageSizeChage}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Results;
