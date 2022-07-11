/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { Outlet, Link, useSearchParams } from "react-router-dom";
import { Layout, Pagination, List, Typography, Row, Col, Empty } from "antd";
import { FileFilled } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';

import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import { getApiRoot } from "../api/api_root";
import LOADING_ICON from "../components/LOADING_ICON";
import { SORT_MENU } from "../components/SORT_MENU";
import { SortMethodType, Lectures, Lecture } from "../models/lectures";

const { Content } = Layout;
const { Title } = Typography;

const PAGE_SIZE = 10;

const ResultItem = ({ lecture }: { lecture: Lecture }) => (
  <List key={lecture.lecture_id}>
    <Link to={`/lectures/${lecture.lecture_id}/`} key={lecture.lecture_id}>
      <div className="video-content">
        <Col>
          {lecture.thumbnail_picture && (
            <div className="list-thumbnail">
              <img alt="thumbnail" src={lecture.thumbnail_picture} />
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

function Results() {
  const [searchTerm] = useSearchParams();
  const searchValue = searchTerm.get("search");
  const [results, setResults] = useState<Lectures>([]);
  const [lectures, setLectures] = useState<Lectures>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [sortMethod, setSortMethod] = useState<SortMethodType>('relevance');

  const searchLectures = useCallback(async () => {
    try {
      setLoading(true);
      const searchQuery = searchValue
      ? `?search=${searchValue}&page=${currentPage}&page_size=${pageSize}`
      : `?page=${currentPage}&page_size=${pageSize}`;
      const response = await getApiRoot().get(`/search/lectures/${searchQuery}`);
      setLoading(false);
      setLectures(response.data.results);
      setResults(response.data.results);
      setTotal(response.data.count);
    } catch (error) {
      setResults([]);
      setLectures([]);
    }
  }, [searchValue, currentPage, pageSize]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChage = (current: number, size: number) => {
    setPageSize(size);
  };

  const sortResults = (value: SortMethodType) => {
    switch (value) {
      case "relevance":
        setLectures(results);
        break;
        case "oldest":
          const oldest = results.slice();
          setLectures(
            oldest.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
            );
            break;
            case "newest":
              const newest = results.slice();
              setLectures(
                newest.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                );
                break;
              };
              setSortMethod(value);
            };

  useEffect(() => {
    searchLectures();
  }, [searchLectures]);

  useEffect(() => {
    if (results) { 
      sortResults(sortMethod);
    };
  }, [results, sortMethod])

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
                    {total} Search results:{" "}
                    {searchValue ? `"${searchValue}"` : null}{" "}
                  </Title>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12}>
                  <SORT_MENU sortMethod={sortMethod} handleChange={sortResults} />
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
                  lectures.map((lecture: any) => (
                    <ResultItem key={uuidv4()} lecture={lecture} />
                  ))
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
