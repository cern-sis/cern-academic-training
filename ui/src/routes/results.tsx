import { FileFilled } from "@ant-design/icons";
import { Col, Empty, Layout, List, Pagination, Row, Typography, Card } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AT_HEADER, CERN_FOOTER, CERN_TOOLBAR, LOADING_ICON } from '../features';
import { useAppSelector } from "../hooks";
import { useSearchLecturesQuery } from "../services/lectures.service";

const { Content } = Layout;
const { Title } = Typography;

const PAGE_SIZE = 10;

function Results() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);

  const { data, error, isLoading } = useSearchLecturesQuery({searchTerm, currentPage, pageSize});

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChage = (current: number, size: number) => {
    setPageSize(size);
  };

  useEffect(() => {
    data?.length && setTotal(data?.length);
  }, [data]);

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
                    Search results: {searchTerm ? `"${searchTerm}"` : null}{" "}
                  </Title>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12}>
                  <Title level={5}>({total} results)</Title>
                </Col>
              </Row>

              <Row justify="space-between" gutter={[12, 1]}>
                {error ? (
                  <Card>Oh no, there was an error</Card>
                ) : isLoading ? (
                  <LOADING_ICON />
                ) : !data?.length ? (
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
                  data?.map((lecture: any) => {
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
