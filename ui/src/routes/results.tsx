import React, { useState, useEffect } from "react";
import { Outlet, Link, useSearchParams } from "react-router-dom";
import { Layout, Pagination, List, Typography, Row, Col, Empty } from "antd";

import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import { getApiRoot } from "../api/api_root";
import SUGGESTION_BOX from "../components/SUGGESTION_BOX";
import LOADING_ICON from "../components/LOADING_ICON";

const { Content } = Layout;
const { Title } = Typography;

const PAGE_SIZE = 5;

function Results() {
  const [searchTerm] = useSearchParams();
  const searchValue = searchTerm.get("search");
  const [lectures, setLectures] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
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

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="search">
          <div className="container">
            <div className="container-content">
              <Row justify="space-between">
                <Col span={8}>
                  <Title>
                    Search results: {searchValue ? `"${searchValue}"` : null}{" "}
                  </Title>
                </Col>

                <Col span={8} offset={8}>
                  <Title level={3}>({total} results)</Title>
                </Col>
              </Row>

              <Row justify="space-between" gutter={[12, 12]}>
                {loading ? (
                  <LOADING_ICON />
                ) : !lectures.length ? (
                  <Col span={24}>
                    <Empty className="empty" description="No results found" />{" "}
                    <Title level={4}>Not what you are looking for?</Title>
                    <SUGGESTION_BOX />
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
                            <Col flex="auto">
                              <div className="list-thumbnail">
                                <img
                                  alt="thumbnail"
                                  src={lecture.thumbnail_picture}
                                />
                              </div>
                            </Col>

                            <Col flex="auto">
                              <Title level={2}>{lecture.title}</Title>
                              <p>{lecture.speaker}</p>
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
                <Col span={8} offset={8}>
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
