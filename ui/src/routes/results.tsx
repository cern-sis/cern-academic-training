import React, { useState, useEffect } from "react";
import { Outlet, Link, useSearchParams } from "react-router-dom";
import { Layout, Pagination, List } from "antd";

import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import { getApiRoot } from "../api/api_root";

const { Content } = Layout;

const PAGE_SIZE = 5;

function Results() {
  const [searchTerm] = useSearchParams();
  const searchValue = searchTerm.get("search");
  const [lectures, setLectures] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchLectures = async () => {
    try {
      const searchQuery = searchValue
        ? `?search=${searchValue}&page=${currentPage}`
        : `?page=${currentPage}`;
      const results = await getApiRoot().get(`/search/lectures/${searchQuery}`);
      setLectures(results.data.results);
      setTotal(results.data.count);
    } catch (error) {
      setLectures([]);
    }
  };

  useEffect(() => {
    searchLectures();
  }, [searchValue, currentPage]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="search">
          <div className="container">
            <div className="container-content">
              <h1>
                Search results: {searchValue ? `"${searchValue}"` : null}{" "}
              </h1>
              {lectures.map((lecture: any) => {
                return (
                  <List key={lecture.lecture_id}>
                    <Link
                      style={{ display: "block", margin: "1rem 0" }}
                      to={`/lectures/${lecture.lecture_id}/`}
                      key={lecture.lecture_id}
                    >
                      <div className="video-content">
                        <div className="list-thumbnail">
                          <img
                            alt="thumbnail"
                            src={lecture.thumbnail_picture}
                          />
                        </div>
                        <div>
                          <h2>{lecture.title}</h2>
                          <p>{lecture.speaker}</p>
                        </div>
                      </div>
                    </Link>
                  </List>
                );
              })}
              <Outlet />
            </div>

            <Pagination
              className="pagination"
              current={currentPage}
              pageSize={PAGE_SIZE}
              onChange={onChange}
              total={total}
            />
          </div>
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Results;
